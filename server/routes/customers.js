var express = require('express');
var router = express.Router();

const model = require('../models/index');

/* GET customers listing. */
router.get('/', function (req, res, next) {
  //filter={}&order=DESC&page=1&perPage=25&sort=last_seen
  model.Customer.findAll({
    include: [{
      model: model.Group,
      as: 'groups',
      attributes: ['name'],
    }],
    attributes: {
      exclude: ['created_at', 'updated_at']
    }
  }).then((customers) => {
    res.header("Content-Range", "customers 0-24/900");
    res.json(convertGroupsToString(customers.slice(0, 25)));
  })
});

function convertGroupsToString(customers) {
  return customers.map((customer) => {
    let plainCustomer = customer.get({ plain: true });
    plainCustomer.groups = plainCustomer.groups.map((group) => group.name);
    return plainCustomer;
  });
}

module.exports = router;
