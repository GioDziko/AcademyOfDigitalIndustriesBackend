const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("./custom-errors");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const createBadRequestError = (msg) => {
  return new BadRequestError(msg);
};

module.exports = { createBadRequestError };
