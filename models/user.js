"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);

      // like
      User.hasMany(models.Like);

      //comment
      User.hasMany(models.Comment);

      //follow
      User.hasMany(models.Post);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  //Hook hash password
  User.beforeCreate(instance => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash;
  });

  return User;
};
