const router = require("express").Router();
const authController = require('../../controllers/authController');

const { check, validationResult } = require('express-validator');

const validations = [
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
  ];

//REGISTER
router.route('/register').post(validations, authController.registerUser);

//LOGIN
router.route('/login').post(authController.loginUser);



module.exports = router;
