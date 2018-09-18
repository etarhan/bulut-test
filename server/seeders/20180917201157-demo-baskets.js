const generateBaskets = require('../data-generator/baskets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const baskets = [].concat.apply([], generateBaskets())
    return queryInterface.bulkInsert('basket', baskets, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('basket', null, {});
  }
};
