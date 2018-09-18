const generateProducts = require('../data-generator/products');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `select * from category;`
    ).then((categories) => {
      const db = { categories: categories[0] };
      console.log(categories);
      return queryInterface.bulkInsert('product', generateProducts(db), {});
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product', null, {});
  }
};
