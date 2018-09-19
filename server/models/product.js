module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    category_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    height: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    reference: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    width: DataTypes.DECIMAL
  }, {
    tableName: 'product',
    underscored: true,
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  };
  return Product;
};