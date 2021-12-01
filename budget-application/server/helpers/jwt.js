const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function createToken(obj) {
  return jwt.sign(obj, secret);
}

function verifyToken(obj) {
  return jwt.verify(obj, secret);
}

module.exports = { createToken, verifyToken };
