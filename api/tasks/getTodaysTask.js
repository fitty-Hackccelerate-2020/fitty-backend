const helpers = require('../../helpers');

const Tasks = require('../../models/Tasks');

const getTodaysTask = async (req, res, next) => {
  try {
    const { _id } = req.locals.userData;

    const recentTask = await Tasks.findOne({
      whoseTask: _id,
      active: true,
    }).populate('todayTask');

    res
      .status(200)
      .json(helpers.responseWrapper.successResponse(recentTask.todayTask));
  } catch (e) {
    next(e);
  }
};

module.exports = getTodaysTask;
