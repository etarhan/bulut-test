// const express = require('express');
// const router = express.Router();

// const model = require('../models/index');

// router.get('/', function (req, res, next) {
//   const params = parseQueryJson(req);
//   const { q, ...filterClauses } = params.filter;
//   const fields = model.Customer.rawAttributes;
//   const associations = model.Customer.associations;
//   const associationClauses = {};
//   const rangeClauses = {};

//   const key = Object.keys(associations).find((a) => a === params.sort[0]);
//   if (key) {
//     params.sort.unshift(key);
//     params.sort[1] = key === 'groups' ? 'name' : key;
//   }

//   Object.entries(filterClauses).forEach((fc) => {
//     const index = Object.keys(associations).indexOf(fc[0]);
//     if (index > -1) {
//       const key = fc[0] === 'groups' ? 'name' : f[0];
//       associationClauses[key] = fc[1];
//       delete filterClauses[fc[0]];
//     } else if (fc[0].indexOf("_gte") > -1 || fc[0].indexOf("_lte") > -1) {
//       const op = fc[0].indexOf("_gte") > -1 ? '$gt' : '$lt';
//       rangeClauses[fc[0].replace(/_gte|_lte/g, '')] = { [op]: fc[1] };
//       delete filterClauses[fc[0]];
//     }
//   });

//   let searchClauses = [];
//   searchClauses = q && Object.keys(fields)
//     .filter((prop) => fields[prop].type.toSql().indexOf('VARCHAR') > -1)
//     .map((prop) => ({ [prop]: { $like: '%' + q + '%' } }));

//   let whereClauses = { ...filterClauses };
//   whereClauses = q ? { ...whereClauses, ...{ $or: searchClauses } } : whereClauses;
//   whereClauses = !Object.is(rangeClauses, {}) ? { ...whereClauses, ...rangeClauses } : whereClauses;

//   model['Command'].findAll({
//     include: [{
//       model: model['Basket'],
//       as: 'basket',
//       where: associationClauses
//     }],
//     attributes: {
//       exclude: ['created_at', 'updated_at']
//     },
//     where: whereClauses,
//     order: [params.sort]
//   }).then((commands) => {
//     commands.forEach((c) => c.total_spent = parseFloat(c.total_spent).toFixed(2));
//     const orderRange = commands.slice(params.range[0], params.range[1])
//     res.header("Content-Range", `commands ${params.range[0]}-${params.range[0]}/900`);
//     res.json(commands);
//   })
// });

// function parseQueryJson(req) {
//   Object.entries(req.query).forEach((entry) => {
//     req.query[entry[0]] = JSON.parse(entry[1]);
//   });

//   return {
//     ...req.query
//   };
// }

// function convertGroupsToString(customers) {
//   return customers.map((customer) => {
//     let plainCustomer = customer.get({ plain: true });
//     plainCustomer.groups = plainCustomer.groups.map((group) => group.name);
//     return plainCustomer;
//   });
// }


// module.exports = router;
