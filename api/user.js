const express = require('express');
const Users = require('../models/Users');

const helpers = require('../helpers');

const isAuthenticated = require('./middlewares/isAuthenticated');

const core = require('../core');

const router = express.Router();

// to update basic user data
router.post('/update', isAuthenticated, async (req, res, next) => {
  const { email } = req.locals;
  const modal = {};
  if (req.body.full_name) {
    modal.full_name = req.body.full_name;
  }

  const { weight, height, age, gender, exerciseIndex } = req.body;
  if (weight) {
    modal.weight = weight;
  }

  if (height) {
    modal.height = height;
  }

  if (age) {
    modal.age = age;
  }

  if (gender) {
    modal.gender = gender;
  }

  if (exerciseIndex) {
    modal.exerciseIndex = exerciseIndex;
  }

  let bmi = null;
  let upperBoundWeight, lowerBoundWeight;
  if (height && weight && age && gender) {
    bmi = core.bmiUtils.bmiCalc(modal);
    modal.bmi = bmi;

    [lowerBoundWeight, upperBoundWeight] = core.bmiUtils.weightRange(modal);
  }

  try {
    await Users.updateOne(modal).where({ email });
    if (bmi) {
      res.status(200).json(
        helpers.responseWrapper.successResponse({
          bmi,
          weightRange: [lowerBoundWeight, upperBoundWeight],
        })
      );
      return;
    }
    res
      .status(200)
      .json(
        helpers.responseWrapper.successResponse(
          helpers.responseSuccess.UPDATE_SUCCESS
        )
      );
  } catch (e) {
    next(e);
  }
});

router.post('/data', isAuthenticated, (req, res, next) => {
  try {
    const {
      full_name,
      weight,
      height,
      age,
      gender,
      bmi,
      bmr,
    } = req.locals.userData;
    res.status(200).json(
      helpers.responseWrapper.successResponse({
        full_name,
        weight,
        height,
        age,
        gender,
        bmi,
        bmr,
      })
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
