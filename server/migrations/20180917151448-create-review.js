'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      command_id: {
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('review');
  }
};