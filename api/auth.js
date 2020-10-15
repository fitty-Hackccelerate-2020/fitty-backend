const express = require('express');

const router = express.Router();

const logger = require('../setup/logger');
const responses = require('../helpers/responseWrapper');
const responseErrors = require('../helpers/responseErrors');
const responseSuccess = require('../helpers/responseSuccess');
const passwordEncrypter = require('../helpers/passwordEncrypt');

const validators = require('./middlewares/validators');

const Users = require('../models/Users');

/**
 * REQUEST for register & login:
 *  body:
 *    email<string>
 *    password<string>
 */

router.post('/register', validators.authBodyValidator, async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExists = await Users.findOne({ email });
    if (emailExists) {
      res.status(400).json(responses.errorResponse(responseErrors.USER_EXISTS));
      return;
    } else {
      const hashedPassword = await passwordEncrypter.hashPassword(password);
      await Users.create({ email, password: hashedPassword });
      res
        .status(200)
        .json(responses.successResponse(responseSuccess.USER_REGISTERED));
    }
  } catch (e) {
    logger.error(e);
    res
      .status(400)
      .json(responses.errorResponse(responseErrors.INTERNAL_ERROR_OCCURED));
  }
});

router.post('/login', validators.authBodyValidator, async (req, res) => {
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

    res.status(200).json(responses.successResponse('Done'));
  } catch (e) {
    logger.error(e);
    res
      .status(400)
      .json(responses.errorResponse(responseErrors.INTERNAL_ERROR_OCCURED));
  }
});

module.exports = router;
