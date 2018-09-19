const express = require('express');
const router = express.Router();

const model = require('../models/index');
const processPayload = require('../utils/process-payload');

router.get('/:id?', function (req, res) {
  processPayload(model.Product, model.Category, 'category', req, res)
    .then((processedEntities) => {
      res.json(processedEntities);
  });
});


module.exports = router;
