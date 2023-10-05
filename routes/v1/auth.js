const router = require("express").Router();
const authController = require('../../controllers/authController');
const { registerValidation } = require('./validations/registerValidation');


//REGISTER
router.route('/register').post(registerValidation, authController.registerUser);

//LOGIN
router.route('/login').post(authController.loginUser);



module.exports = router;
