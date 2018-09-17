'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
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
        type: Sequelize.STRING
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
      rerference: {
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
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};