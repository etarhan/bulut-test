const express = require('express');
const router = express.Router();

const model = require('../models/index');
const processPayload = require('../utils/process-payload');

const entity = model.Review;
const association = model.Command;
const associationAlias = 'command';

router.get('/:id?', async (req, res, next) => {
  try {
    const processedEntities = await processPayload(entity, association, associationAlias, req, res)
    res.send(processedEntities);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0)
    return res.sendStatus(400);

  const { id } = req.params;

  const [updated, updatedItem] = await entity.update({
    ...req.body
  }, {
      where: { id },
      returning: true,
      plain: true
    }
  );

  return res.json(updatedItem);
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
