const generateFinalized = require('../data-generator/finalize');
const model = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const db = {};
    return model.Customer.findAll({ include: [{ all: true }] })
      .then((customers) => {
        db.customers = customers.map((c) => c.get({ plain: true }));
        return model.Command.findAll({ include: [{ all: true }] });
      })
      .then((commands) => {
        db.commands = commands.map((c) => c.get({ plain: true }));
        return model.Review.findAll({});
      })
      .then((reviews) => {
        db.reviews = reviews.map((c) => c.get({ plain: true }));
        generateFinalized(db, { serializeDate: true });
        return model.Group.findAll({});
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
          return model.Customer.update({
            latest_purchase: customer.latest_purchase,
            total_spent: customer.total_spent,
            nb_commands: customer.nb_commands,
            updatedAt: model.Sequelize.literal('CURRENT_TIMESTAMP')
          }, {
            where: { id: customer.id }
          }).spread(((affectedCount) => affectedCount));
        }));
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customer_group', null, {});
  }
};