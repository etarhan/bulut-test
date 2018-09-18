const generateReviews = require('../data-generator/reviews');
const models = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const db = {};
    return models.Customer.findAll({ include: [{ all: true }]})
      .then((customers) => {
        db.customers = customers.map((c) => c.get({ plain: true }));
        return models.Command.findAll({ include: [{ all: true }]});
      })
      .then((commands) => {
        db.commands = commands.map((c) => c.get({ plain: true }));
        return queryInterface.bulkInsert('review', generateReviews(db, { serializeDate: true }), {});
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('review', null, {});
  }
};