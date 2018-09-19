'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('customer', 'id'), (select max(id) from customer))`)
      .then(() => queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('category', 'id'), 
      (select max(id) from category))`))
      .then(() => queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('group', 'id'), 
      (select max(id) from "group"))`))
      .then(() => queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('basket', 'id'), 
      (select max(id) from basket))`))
      .then(() => queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('product', 'id'), 
      (select max(id) from product))`))
      .then(() => queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('review', 'id'), 
      (select max(id) from review))`))
      .then(() => queryInterface.sequelize.query(`select setval(pg_get_serial_sequence('command', 'id'), 
      (select max(id) from command))`))
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.sequelize.bulkDelete('Person', null, {});
    */
  }
};
