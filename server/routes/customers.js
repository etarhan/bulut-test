var express = require('express');
var router = express.Router();

const model = require('../models/index');

/* GET customers listing. */
router.get('/', function(req, res, next) {

  model.Customer.findAll({
    include: [ { model: model.Group, as: 'groups', attributes: { include: ['name'], exclude: ['CustomerGroup']} } ]}).then((customers) => {
    res.json(convertGroupsToString(customers));
  })
});

function convertGroupsToString(customers) {
  return customers.map((customer) => {
    let plainCustomer = customer.get({plain: true});
    plainCustomer.groups = plainCustomer.groups.map((group) => group.name);
    return plainCustomer;
  });
}

module.exports = router;
