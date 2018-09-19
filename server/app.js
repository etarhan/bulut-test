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


const app = express();

app.disable('etag');
app.use(cors({
    exposedHeaders: "Content-Range"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use('/commands', commandRouter);
app.use('/reviews', reviewRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);


module.exports = app;
