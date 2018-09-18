'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('command', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      delivery_fees: {
        type: Sequelize.DECIMAL
      },
      reference: {
        type: Sequelize.STRING
      },
      returned: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      tax_rate: {
        type: Sequelize.DECIMAL
      },
      taxes: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      total_ex_taxes: {
        type: Sequelize.DECIMAL
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
    return queryInterface.dropTable('command');
  }
};