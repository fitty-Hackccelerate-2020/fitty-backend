const helpers = require('../../helpers');

const Tasks = require('../../models/Tasks');

const getTodaysTask = async (req, res) => {
  const { email } = req.locals;

  const recentTask = await Tasks.findOne({ email, status: true }).populate(
    'todayTask'
  );
  res
    .status(200)
    .json(helpers.responseWrapper.successResponse(recentTask.todayTask));
};

module.exports = getTodaysTask;
