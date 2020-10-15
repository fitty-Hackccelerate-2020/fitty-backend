const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/**
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

/**
 *
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
const compareHash = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) reject(err);
      if (res) resolve(true);
      else resolve(false);
    });
  });
};

module.exports = {
  hashPassword,
  compareHash,
};
