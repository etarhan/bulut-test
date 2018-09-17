'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING
      },
      birthday: {
        allowNull: true,
        type: Sequelize.DATE
      },
      first_seen: {
        allowNull: true,
        type: Sequelize.DATE
      },
      last_seen: {
        allowNull: true,
        type: Sequelize.DATE
      },
      latest_purchase: {
        allowNull: true,
        type: Sequelize.DATE
      },
      has_ordered: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      has_newsletter: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      nb_commands: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      total_spent: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer');
  }
};