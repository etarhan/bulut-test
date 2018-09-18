const generateGroups = require('../data-generator/groups');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('group', generateGroups(), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('group', null, {});
  }
};
