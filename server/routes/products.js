const express = require('express');
const router = express.Router();

const model = require('../models/index');
const processPayload = require('../utils/process-payload');

const entity = model.Product;
const association = model.Category;
const associationAlias = 'category';

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
    return res.json(updatedItem.get({ plain: true }));
  } catch (error) {
    next(error);
  }
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



module.exports = router;
