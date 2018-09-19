const express = require('express');
const router = express.Router();

const model = require('../models/index');
const processPayload = require('../utils/process-payload');

const entity = model.Customer;
const association = model.Group;
const associationAlias = 'groups';

router.get('/:id?', async (req, res, next) => {
  try {
    const processedEntities = await processPayload(entity, association, associationAlias, req, res)
    res.send(processedEntities);
  } catch (error) {
    next(error);
  }
});

router.post('/', function (req, res, next) {
  entity.create({ ...req.body })
    .then((created) => {
      res.json(created);
    }).catch(next);
});

router.put('/:id', async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return res.sendStatus(400);

  const { id } = req.params;

  const groups = await model.Group.findAll({})
  const customer = await entity.find({ where: { id }, include: [{ model: association, as: associationAlias }] });
  const destroyed = await model.CustomerGroup.destroy({
    where: {
      customer_id: id
    }
  });
  const values = Promise.all(req.body.groups.map((groupName) => {
    return model.CustomerGroup.create({
      customer_id: customer.id,
      group_id: groups.find((group) => group.name === groupName).id
    })
  }));
  const [updated, updatedItem] = await entity.update({
    ...req.body
  }, {
      where: { id },
      returning: true,
      plain: true
    }
  );
  return res.json(updatedItem.get({ plain: true }));
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const destroyed = await entity.destroy({
      where: {
        id: id
      }
    });

    if (destroyed)
      return res.sendStatus(200)
    res.sendStatus(500);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
