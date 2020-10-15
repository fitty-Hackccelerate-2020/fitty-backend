const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET_KEY;

/**
 *
 * @param {string} token
 * @returns {{
 *  email: string,
 * }}
 */
const verifyToken = (token) => {
  return jwt.verify(token, jwtKey);
};

module.exports = verifyToken;
