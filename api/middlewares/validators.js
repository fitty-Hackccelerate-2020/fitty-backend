const responses = require('../../helpers/responseWrapper');
const responseErrors = require('../../helpers/responseErrors');

const authBodyValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    responses.errorResponse(responseErrors.INVALID_REQUEST_BODY);
    return;
  }
  next();
};

module.exports = {
  authBodyValidator,
};
