const { createBadRequestError } = require("../errors/bad-request");
const { createUnauthenticatedError } = require("../errors/unauthenticated");
const { createUserValidationError } = require("../errors/validation-error");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const logInController = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    const emailOrUserName = email || userName;
    if (!emailOrUserName || !password) {
      throw new Error("provide userName or email and password");
    }
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ userName });
    }

    if (!user) {
      throw new Error("invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
      throw new Error("invalid Credentials");
    }
    const token = user.generateJWT();
    res.status(StatusCodes.OK).json({ user: user.userName, token });
  } catch (error) {
    if (error.message === "invalid Credentials") {
      next(createUnauthenticatedError(error.message));
    }
    next(createBadRequestError(error.message));
  }
};

const registerController = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.generateJWT();
    res.status(StatusCodes.CREATED).json({
      userName: user.userName,
      token,
    });
  } catch (error) {
    next(createUserValidationError(error.message));
  }
};

module.exports = { logInController, registerController };
