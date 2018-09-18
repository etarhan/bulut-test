const generateCommands = require('../data-generator/commands');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const db = {};
    return queryInterface.sequelize.query(`select * from product;`)
      .then((products) => {
        db.products = products[0];
        return queryInterface.sequelize.query(
          `select * from customer;`);
      })
      .then((customers) => {
        db.customers = customers[0];
        return queryInterface.sequelize.query(
          `select * from basket;`);
      })
      .then((baskets) => {
        db.baskets = baskets[0];
        return queryInterface.bulkInsert('command', generateCommands(db, { serializeDate: true }), {});
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('command', null, {});
  }
};
