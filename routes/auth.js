const router = require("express").Router();
const authController = require('../controllers/authController');

//REGISTER
router.route('/register').post(authController.registerUser);

//LOGIN
router.route('/login').post(authController.loginUser);



module.exports = router;
