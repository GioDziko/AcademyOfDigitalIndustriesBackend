const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("./custom-errors");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

const createUnauthenticatedError = (msg) => {
  return new UnauthenticatedError(msg);
};

module.exports = { createUnauthenticatedError };
