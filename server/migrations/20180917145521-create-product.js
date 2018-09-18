'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      height: {
        type: Sequelize.DECIMAL
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      reference: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      width: {
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
    return queryInterface.dropTable('product');
  }
};