// consistent response.

/**
 *
 * @param {*} data - data to be responded
 */
const successResponse = (data) => ({
  error: false,
  data,
});

/**
 *
 * @param {*} error
 * @param {boolean} internalError whether the error is internal error or not
 */
const errorResponse = (error, internalError = false) => ({
  error: true,
  internalError,
  data: error,
});

module.exports = {
  successResponse,
  errorResponse,
};
