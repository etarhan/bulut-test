const generateCustomers = require('../data-generator/customers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customer', generateCustomers({}, { serializeDate: true }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customer', null, {});
  }
};
