module.exports = (sequelize, DataTypes) => {
  var CustomerGroup = sequelize.define('CustomerGroup', {
    customer_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    tableName: 'customer_group',
    underscored: true,
  });
  CustomerGroup.associate = function(models) {
    // associations can be defined here
  };
  return CustomerGroup;
};