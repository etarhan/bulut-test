const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customers');
const commandRouter = require('./routes/commands');
const reviewRouter = require('./routes/reviews');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const loginRouter = require('./routes/login');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const model = require('./models/index');
const bcrypt = require('bcrypt');
const app = express();

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const admin = await model.Admin.findOne({ where: { username } });
        if (!admin) {
            return done(null, false, { message: 'User not found' });
        }

        const validate = await bcrypt.compare(password, admin.password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, admin, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
}));

app.use(passport.initialize());

app.disable('etag');
app.use(cors({
    exposedHeaders: "Content-Range"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/customers', passport.authenticate('jwt', { session: false }), customerRouter);
app.use('/commands', commandRouter);
app.use('/reviews', reviewRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);


module.exports = app;
