const responses = require('../../helpers/responseWrapper');
const responseErrors = require('../../helpers/responseErrors');

// for register it will make sure that request body contains email, password & full_name
// for login, only email & password required
const authBodyValidator = (method) => (req, res, next) => {
  const { email, password } = req.body;
  let blacklist = false;
  if (!email || !password) {
    blacklist = true;
  }

  if (method === 'register') {
    const { full_name } = req.body;
    if (!full_name) {
      blacklist = true;
    }
  }

  if (blacklist) {
    res
      .status(400)
      .json(responses.errorResponse(responseErrors.INVALID_REQUEST_BODY));
    return;
  }
  next();
};

// validator for /t/initiate
// it must provide goal to gain or loose kg
// it must provide goal per week
const initiateTaskBodyValidator = (req, res, next) => {
  const { goalWeight, perWeekWeightGoal } = req.body;

  if (!goalWeight || !perWeekWeightGoal) {
    // TODO: range of values should be valid
    res
      .status(400)
      .send(responses.errorResponse(responseErrors.INVALID_REQUEST_BODY));
    return;
  }

  next();
};

module.exports = {
  authBodyValidator,
  initiateTaskBodyValidator,
};
