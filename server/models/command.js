module.exports = (sequelize, DataTypes) => {
  var Command = sequelize.define('Command', {
    customer_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    delivery_fees: DataTypes.DECIMAL,
    reference: DataTypes.STRING,
    returned: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    tax_rate: DataTypes.DECIMAL,
    taxes: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    total_ex_taxes: DataTypes.DECIMAL
  }, {
    tableName: "command",
    underscored: true,
  });
  Command.associate = function(models) {
    // associations can be defined here
    Command.belongsTo(models.Review, { foreignKey: 'command_id', as: 'command' });
  };
  return Command;
};