const express = require('express');

const router = express.Router();

const logger = require('../setup/logger');
const responses = require('../helpers/responseWrapper');
const responseErrors = require('../helpers/responseErrors');
const passwordEncrypter = require('../helpers/passwordEncrypt');
const generateToken = require('../helpers/jwt/generate');

const validators = require('./middlewares/validators');

const Users = require('../models/Users');

/**
 * REQUEST for register & login:
 *  body:
 *    email<string>
 *    password<string>
 *    full_name<string> <--- not in login body
 */

router.post(
  '/register',
  validators.authBodyValidator('register'),
  async (req, res) => {
    const { email, password, full_name } = req.body;

    try {
      const emailExists = await Users.findOne({ email });
      if (emailExists) {
        res
          .status(400)
          .json(responses.errorResponse(responseErrors.USER_EXISTS));
        return;
      } else {
        const hashedPassword = await passwordEncrypter.hashPassword(password);
        await Users.create({ email, password: hashedPassword, full_name });

        const token = generateToken(email);
        res.status(200).json(responses.successResponse(token));
      }
    } catch (e) {
      logger.error(e);
      res
        .status(400)
        .json(responses.errorResponse(responseErrors.INTERNAL_ERROR_OCCURED));
    }
  }
);

router.post(
  '/login',
  validators.authBodyValidator('login'),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const emailExists = await Users.findOne({ email });
      if (!emailExists) {
        res
          .status(404)
          .json(responses.errorResponse(responseErrors.USER_NOT_EXISTS));
        return;
      }

      const hashedPasswordInDb = emailExists.password;

      const isValidPassword = await passwordEncrypter.compareHash(
        password,
        hashedPasswordInDb
      );

      if (!isValidPassword) {
        res
          .status(404)
          .json(responses.errorResponse(responseErrors.INVALID_CREDENTIALS));
        return;
      }

      const token = generateToken(email);
      res.status(200).json(responses.successResponse(token));
    } catch (e) {
      logger.error(e);
      res
        .status(400)
        .json(responses.errorResponse(responseErrors.INTERNAL_ERROR_OCCURED));
    }
  }
);

module.exports = router;
