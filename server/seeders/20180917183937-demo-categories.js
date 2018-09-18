const generateCategories = require('../data-generator/categories');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', generateCategories(), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {});
  }
};
