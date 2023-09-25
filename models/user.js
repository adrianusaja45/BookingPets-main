'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Full name cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number cannot be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10],
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPassword = hashPassword(user.password);
        user.password = hashedPassword;
      },
    },
  });
  return User;
};