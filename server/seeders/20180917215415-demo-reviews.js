const generateReviews = require('../data-generator/reviews');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const db = {};
    return queryInterface.sequelize.query(`select * from customer;`)
      .then((customers) => {
        db.customers = customers[0];
        return queryInterface.sequelize.query(
          `select * from command`);
      })
      .then((commands) => {
        db.commands = commands[0];
        return queryInterface.sequelize.query(
          `select * from basket`);
      })
      .then((baskets) => {
        db.commands.forEach((command) => {
          command.basket = baskets[0].filter((basket) => basket.command_id === command.id);
        });
        return queryInterface.bulkInsert('review', generateReviews(db, { serializeDate: true }), {});
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('review', null, {});
  }
};