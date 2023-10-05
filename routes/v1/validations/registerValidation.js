const { check, validationResult } = require('express-validator');
const {inputValidationMiddleware} = require("../../../middlewares/customValidations");

const registerValidation = [
    check('username')
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage('A valid username with minimum 3 letter is required'),
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email address is required'),
    check('password')
      .trim()
      .isLength({ min: 6 })
      .escape()
      .withMessage('A valid password with minimum 6 letter is required'),
    // check('message')
    //   .trim()
    //   .isLength({ min: 5 })
    //   .escape()
    //   .withMessage('A message is required'),
    inputValidationMiddleware
  ];

  module.exports = {
    registerValidation
  }