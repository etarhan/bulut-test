'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    command_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    date: DataTypes.DATE,
    product_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    underscored: true,
  });
  Review.associate = function(models) {
    // associations can be defined here
    Review.hasOne(models.Command, { foreignKey: 'command_id', as: 'command' });
  };
  return Review;
};