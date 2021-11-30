const { User } = require("../models");
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
        throw { name: "Invalid" };
      }

      const isValid = comparePassword(password, result.password);

      if (!isValid) {
        throw { name: "Invalid" };
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
}

module.exports = UserController;
