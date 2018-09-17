'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {
    tableName: 'group',
    underscored: true,
  });
  Group.associate = function(models) {
    // associations can be defined here
   // Group.belongsToMany(models.Customer, { through: models.CustomerGroup });
  };
  return Group;
};