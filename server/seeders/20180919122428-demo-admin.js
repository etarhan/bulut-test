const model = require('../models/index');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return bcrypt.hash('bulut', 10).then((hash) => {
        console.log(hash);
        return queryInterface.bulkInsert('admin', [{ username: 'bulut', password: hash }]);
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('admin', null, {});
  }
};
