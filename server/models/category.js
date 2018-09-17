'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product, { foreignKey: 'category_id', as: 'products' });
  };
  return Category;
};

