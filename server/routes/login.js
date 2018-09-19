const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured')
                return res.sendStatus(401);
            }
            req.login(user, { session: false }, (error) => {
                if (error)
                    return res.sendStatus(401);
                const body = { username: user.username };
                const token = jwt.sign({ user: body }, 'top_secret');
                return res.json({ token });
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});

module.exports = router;