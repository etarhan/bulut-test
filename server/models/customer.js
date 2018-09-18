module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    avatar: DataTypes.STRING,
    birthday: DataTypes.DATE,
    first_seen: DataTypes.DATE,
    last_seen: DataTypes.DATE,
    latest_purchase: DataTypes.DATE,
    has_ordered: DataTypes.BOOLEAN,
    has_newsletter: DataTypes.BOOLEAN,
    nb_commands: DataTypes.INTEGER,
    total_spent: DataTypes.INTEGER
  }, {
    tableName: 'customer',
    underscored: true,
  });
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsToMany(models.Group, { through: models.CustomerGroup, as: 'groups' });
  };
  return Customer;
};