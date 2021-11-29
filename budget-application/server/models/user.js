"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }
  user.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username can't be empty",
          },
          notNull: {
            msg: "Username can't be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email can't be empty",
          },
          notNull: {
            msg: "Email can't be empty",
          },
          isEmail: {
            msg: "Email is invalid",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can't be empty",
          },
          notNull: {
            msg: "Name can't be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password can't be empty",
          },
          notNull: {
            msg: "Password can't be empty",
          },
          minLength(value) {
            if (this.password.length <= 8) {
              throw new Error("Password length minimal is 8 character");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
