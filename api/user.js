const express = require('express');
const Users = require('../models/Users');

const helpers = require('../helpers');

const isAuthenticated = require('./middlewares/isAuthenticated');

const router = express.Router();

// to update basic user data
router.post('/update', isAuthenticated, async (req, res) => {
  const { email } = req.locals;
  const modal = {};
  if (req.body.full_name) {
    modal.full_name = req.body.full_name;
  }

  if (req.body.weight) {
    modal.weight = req.body.weight;
  }

  if (req.body.height) {
    modal.height = req.body.height;
  }

  if (req.body.age) {
    modal.age = req.body.age;
  }

  if (req.body.gender) {
    modal.gender = req.body.gender;
  }

  try {
    await Users.updateOne(modal).where({ email });
    res
      .status(200)
      .json(
        helpers.responseWrapper.successResponse(
          helpers.responseSuccess.UPDATE_SUCCESS
        )
      );
  } catch (e) {
    res
      .status(500)
      .json(
        helpers.responseWrapper.errorResponse(
          helpers.responseErrors.INTERNAL_ERROR_OCCURED
        )
      );
  }
});

module.exports = router;
