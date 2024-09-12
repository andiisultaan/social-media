"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.hasMany(models.Like);
      // comment
      Posts.hasMany(models.Comment);
      // user
      Posts.belongsTo(models.User);
    }
  }
  Posts.init(
    {
      caption: DataTypes.STRING,
      image: DataTypes.TEXT,
      ProfileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
