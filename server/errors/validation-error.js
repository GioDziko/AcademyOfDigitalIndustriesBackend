const { CustomAPIError } = require("./custom-errors");
const StatusCodes = require("http-status-codes");

class UserValidationError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

const createUserValidationError = (msg) => {
  return new UserValidationError(msg);
};

module.exports = { createUserValidationError };
