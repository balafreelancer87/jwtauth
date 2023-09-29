const router = require("express").Router();
const {
  registerUser,
  loginUser

} = require('../controllers/authController');

//REGISTER
router.route('/register').post(registerUser);

//LOGIN
router.route('/login').post(loginUser);



module.exports = router;
