const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
      tableName: 'admin',
      underscored: true,
    }
  );
  Admin.associate = function (models) {
    // associations can be defined here
  };

  Admin.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10).then(hashedPw => {
      user.password = hashedPw;
    });
  });

  return Admin;
};