const express = require('express');
const router = express.Router();

const model = require('../models/index');
const processPayload = require('../utils/process-payload');

const entity = model.Command;
const association = model.Basket;
const associationAlias = 'basket';

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
  const basket = await association.findAll({
    attributes: { include: ['id', 'command_id'] }, 
    where: { command_id: updatedItem.id }});
  const command = { ...updatedItem.get({ plain: true }), basket };
  return res.json(command);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
