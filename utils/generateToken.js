const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "2d" });
};

module.exports = generateToken;
