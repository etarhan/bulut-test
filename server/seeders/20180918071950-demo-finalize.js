const generateFinalized = require('../data-generator/finalize');
const models = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const db = {};
    return models.Customer.findAll({ include: [{ all: true }] })
      .then((customers) => {
        db.customers = customers.map((c) => c.get({ plain: true }));
        return models.Command.findAll({ include: [{ all: true }] });
      })
      .then((commands) => {
        db.commands = commands.map((c) => c.get({ plain: true }));
        return models.Review.findAll({});
      })
      .then((reviews) => {
        db.reviews = reviews.map((c) => c.get({ plain: true }));
        generateFinalized(db, { serializeDate: true });
        return models.Group.findAll({});
      })
      .then((groups) => {
        const groupArray = []
        groups.forEach((group) => groupArray[group.name] = group.id);

        const customerGroups = db.customers.map((customer) => {
          return customer.groups.map((group) => ({ 
            customer_id: customer.id, group_id: groupArray[group] 
          }));
        });

        return queryInterface.bulkInsert('customer_group', [].concat.apply([], customerGroups), {});
      })
      .then(() => {
        return Promise.all(db.customers.map((customer) => {
          return models.Customer.update({
            latest_purchase: customer.latest_purchase,
            total_spent: customer.total_spent,
            nb_commands: customer.nb_commands,
            updatedAt: models.Sequelize.literal('CURRENT_TIMESTAMP')
          }, {
            where: { id: customer.id }
          }).spread(((affectedCount) => console.log(affectedCount)));
        }));
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customer_group', null, {});
  }
};