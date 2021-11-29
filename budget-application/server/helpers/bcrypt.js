const bcrypt = require("bcryptjs");

function hashPassword(pass) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(pass, salt);
}

function comparePassword(pass, hashPass) {
  return bcrypt.compareSync(pass, hashPass);
}

module.exports = { hashPassword, comparePassword };
