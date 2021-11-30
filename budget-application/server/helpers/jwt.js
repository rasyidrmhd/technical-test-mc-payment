const jwt = require("jsonwebtoken");
const secret = "thisissecret";

function createToken(obj) {
  return jwt.sign(obj, secret);
}

function verifyToken(obj) {
  return jwt.verify(obj, secret);
}

module.exports = { createToken, verifyToken };
