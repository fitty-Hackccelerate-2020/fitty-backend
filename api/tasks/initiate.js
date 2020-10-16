const logger = require('../../setup/logger');
const helpers = require('../../helpers');

const core = require('../../core');

const Users = require('../../models/Users');
const Tasks = require('../../models/Tasks');
const DailyTask = require('../../models/DailyTask');

const initiate = async (req, res) => {
  // get goal weight
  // get per week goal
  const { goalWeight, perWeekWeightGoal } = req.body;

  // calculate bmr
  /**
   * @type {{
   *  _id: string,
   *  gender: 'M' | 'F',
   *  weight: number,
   *  height: number,
   *  age: number,
   * }} Users model which we extract in isAuthenticated middleware
   */
  const model = req.locals.data;
  const { email } = req.locals;
  const bmr = core.bmrUtils(model);

  try {
    await Users.update({ bmr }).where({ email });

    const dailyCalorieConsumption = core.dailyCalorieUtils({
      perWeekWeightGoal,
    });

    // make today's task
    const dailyTask = await DailyTask.create({
      caloriesToConsume: dailyCalorieConsumption,
      diet: [],
      workout: [],
    });

    // make long term task
    await Tasks.create({
      whoseTask: model._id,
      todayTask: dailyTask._id,
      goalWeight,
      perWeekWeightGoal,
      dailyCalorieConsumption,
      history: [],
    });

    // keeping in mind, once initiate process is done this response will lead to dashboard
    res.status(200).json(helpers.responseWrapper.successResponse(dailyTask));
  } catch (e) {
    logger.error(e);
    res
      .status(500)
      .json(
        helpers.responseWrapper.errorResponse(
          helpers.responseErrors.INTERNAL_ERROR_OCCURED
        )
      );
  }
};

module.exports = initiate;
