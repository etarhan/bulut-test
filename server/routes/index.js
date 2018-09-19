const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json("React admin demo API");
});

module.exports = router;
