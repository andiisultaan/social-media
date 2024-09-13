"use strict";
// const { Model, Op } = require("sequelize"); // Importing Op here
const { Model, Op } = require("sequelize");
const getTime = require("../helpers/index");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    get date() {
      return getTime(this.createdAt.toLocaleDateString());
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async getUsers(search) {
      const users = await Post.findAll({
        include: {
          model: sequelize.models.User,
          where: {
            role: "user",
            username: search ? { [Op.iLike]: `%${search}%` } : { [Op.ne]: null },
          },
          include: sequelize.models.Profile,
        },
        order: [["id", "DESC"]],
      });
      return users;
    }
    static associate(models) {
      // define association here
      Post.hasMany(models.Like);
      // comment
      Post.hasMany(models.Comment, {
        foreignKey: "PostId",
        onDelete: "CASCADE",
      });
      // user
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      caption: DataTypes.STRING,
      image: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
