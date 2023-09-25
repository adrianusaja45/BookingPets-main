const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res) {
    const { full_name, email, phone_number, password } = req.body;
    User.create({
      full_name,
      email,
      phone_number,
      password,
    })
      .then((user) => {
        res.status(201).json({
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
            createdAt: user.createdAt,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
        console.log(err);
      });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "User Login Error",
            devMassage: `User with email ${email} not found`,
          };
        }
        const isCorrect = comparePassword(password, user.password);
        if (!isCorrect) {
          throw {
            name: "User Login Error",
            devMassage: `User's password with email ${email} doesn't match`,
          };
        }
        let payload = {
          id: user.id,
          email: user.email,
        };
        const token = generateToken(payload);
        return res.status(200).json({ token: token });
      })
      .catch((err) => {
        res.status(401).json({ err });
      });
  }

  static async updateUserByToken(req, res) {
    let id = res.locals.user.id;
    const { email, full_name } = req.body;
    let updateData = {
      email,
      full_name,
    };
    User.update(updateData, {
      where: {
        id,
      },
      returning: true,
    })
      .then((user) => {
        res.status(200).json({
          user: {
            id: user[1][0].id,
            full_name: user[1][0].full_name,
            email: user[1][0].email,
            createdAt: user[1][0].createdAt,
            updatedAt: user[1][0].updatedAt,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }

  static async deleteUserByToken(req, res) {
    let id = res.locals.user.id;
    User.destroy({
      where: {
        id,
      },
    })
      .then((user) => {
        res
          .status(200)
          .json({ message: "Your account been successfuly deleted" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.errors[0].message });
      });
  }

  static async getUserByToken(req, res) {
    let id = res.locals.user.id;
    User.findByPk(id)
      .then((user) => {
        res.status(200).json({
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
}

module.exports = UserController;
