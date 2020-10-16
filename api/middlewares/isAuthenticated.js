const jwt = require('jsonwebtoken');

const verifyToken = require('../../helpers/jwt/verify');
const responses = require('../../helpers/responseWrapper');
const responseErrors = require('../../helpers/responseErrors');

const Users = require('../../models/Users');

/**
 *
 * @param {{
 *  body: {
 *   token: string,
 *  }
 * }} req
 * @param {*} res
 * @param {Function} next
 */
const isAuthenticated = async (req, res, next) => {
  const { token } = req.body;
  let payload;
  try {
    payload = verifyToken(token || '');
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res
        .status(401)
        .json(responses.errorResponse(responseErrors.UNAUTHENTICATED));
      return;
    }
    res.status(400).end();
    return;
  }

  const emailExists = await Users.findOne({ email: payload.email });
  if (!emailExists) {
    res
      .status(401)
      .json(responses.errorResponse(responseErrors.UNAUTHENTICATED));
    return;
  }

  req.locals = {
    email: payload.email,
  };
  next();
};

module.exports = isAuthenticated;
