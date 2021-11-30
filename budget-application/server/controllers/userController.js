const { User, Transaction } = require("../models");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, name, password } = req.body;

      const result = await User.create({ username, email, name, password });
      res.status(201).json({ id: result.id, username: result.username });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "loginEmailEmpty" };
      }

      if (!password) {
        throw { name: "loginPasswordEmpty" };
      }

      const result = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username: email }],
        },
      });

      if (!result) {
        throw { name: "invalid" };
      }

      const isValid = comparePassword(password, result.password);

      if (!isValid) {
        throw { name: "invalid" };
      }

      const payload = {
        id: result.id,
        name: result.name,
        email: result.email,
        username: result.username,
      };

      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async getUserData(req, res, next) {
    try {
      let balance = 0;
      const getLastBalance = await Transaction.findAll({
        where: { UserId: req.user.id },
        order: [["id", "DESC"]],
        limit: 1,
      });

      if (getLastBalance[0]) {
        balance = getLastBalance[0].current_balance;
      }

      res.status(200).json({ dataUser: req.user, balance });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
