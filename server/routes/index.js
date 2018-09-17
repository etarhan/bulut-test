const express = require('express');
const router = express.Router();

const model = require('../models/index');

router.get('/', function(req, res, next) {
  res.send("hello world");
});

module.exports = router;
