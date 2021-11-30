const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);

    const result = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username,
      },
    });

    if (!result) {
      throw { name: "Invalid" };
    }

    req.user = {
      id: result.id,
      username: result.username,
      email: result.email,
      name: result.name,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
