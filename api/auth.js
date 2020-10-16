const express = require('express');

const router = express.Router();

const {
  responseErrors,
  passwordEncrypt,
  jwtUtils,
  responseWrapper,
} = require('../helpers');

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
  async (req, res, next) => {
    const { email, password, full_name } = req.body;

    try {
      const emailExists = await Users.findOne({ email });
      if (emailExists) {
        res
          .status(400)
          .json(responseWrapper.errorResponse(responseErrors.USER_EXISTS));
        return;
      } else {
        const hashedPassword = await passwordEncrypt.hashPassword(password);
        await Users.create({ email, password: hashedPassword, full_name });

        const token = jwtUtils.generate(email);
        res.status(200).json(responseWrapper.successResponse(token));
      }
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/login',
  validators.authBodyValidator('login'),
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const emailExists = await Users.findOne({ email });
      if (!emailExists) {
        res
          .status(404)
          .json(responseWrapper.errorResponse(responseErrors.USER_NOT_EXISTS));
        return;
      }

      const hashedPasswordInDb = emailExists.password;

      const isValidPassword = await passwordEncrypt.compareHash(
        password,
        hashedPasswordInDb
      );

      if (!isValidPassword) {
        res
          .status(404)
          .json(
            responseWrapper.errorResponse(responseErrors.INVALID_CREDENTIALS)
          );
        return;
      }

      const token = jwtUtils.generate(email);
      res.status(200).json(responseWrapper.successResponse(token));
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
