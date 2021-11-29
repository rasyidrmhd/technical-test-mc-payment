const { User } = require("../models");

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
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserController;
