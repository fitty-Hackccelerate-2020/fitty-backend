const {
  responseWrapper,
  responseSuccess,
  responseErrors,
} = require('../../helpers');
const DailyTask = require('../../models/DailyTask');

const updateTask = async (req, res, next) => {
  try {
    /**
     * @type {{
     *  taskId: string,
     *  diet: {
     *    foodName: string,
     *    quantity: string | number,
     *    caloriesGot: number,
     *  },
     *  workout: {
     *    workoutName: string,
     *    caloriesBurnt: number,
     *  },
     *  water: number,
     *  sleep: {
     *    sleptAt: number,
     *    wokeupAt: number
     *  },
     *  totalWaterGoal: number,
     * }}
     */
    const { taskId, diet, workout, water, sleep, totalWaterGoal } = req.body;

    // TODO: validate

    // DIET
    if (diet) {
      // foodName, quantity, caloriesGot
      const { caloriesGot } = diet;

      // update calories & diet
      await DailyTask.findOneAndUpdate(
        { _id: taskId },
        {
          $inc: {
            caloriesConsumed: caloriesGot,
          },
          $push: {
            diet,
          },
        }
      );

      res
        .status(200)
        .json(responseWrapper.successResponse(responseSuccess.UPDATE_SUCCESS));
      return;
    }

    // WORKOUT
    if (workout) {
      await DailyTask.findOneAndUpdate(
        { _id: taskId },
        {
          $push: {
            workout,
          },
        }
      );

      res
        .status(200)
        .json(responseWrapper.successResponse(responseSuccess.UPDATE_SUCCESS));
      return;
    }

    // WATER
    if (water) {
      await DailyTask.findOneAndUpdate(
        { _id: taskId },
        {
          $inc: {
            drankWater: water,
          },
        }
      );

      res
        .status(200)
        .json(responseWrapper.successResponse(responseSuccess.UPDATE_SUCCESS));
      return;
    }

    // SLEEP
    if (sleep) {
      await DailyTask.findOneAndUpdate(
        { _id: taskId },
        {
          sleep,
        }
      );

      res
        .status(200)
        .json(responseWrapper.successResponse(responseSuccess.UPDATE_SUCCESS));
      return;
    }

    // WATER GOAL
    if (totalWaterGoal) {
      await DailyTask.findOneAndUpdate(
        { _id: taskId },
        {
          totalWaterGoal,
        }
      );
    }

    res
      .status(400)
      .json(responseWrapper.errorResponse(responseErrors.INVALID_REQUEST_BODY));
  } catch (e) {
    next(e);
  }
};

module.exports = updateTask;
