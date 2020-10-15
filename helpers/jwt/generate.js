const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET_KEY;
const expire = '9999 years'; // never

/**
 *
 * @param {string} email
 * @returns {string} jsonwebtoken
 */
const generateToken = (email) => {
  return jwt.sign({ email }, jwtKey, { expiresIn: expire });
};

module.exports = generateToken;
