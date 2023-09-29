const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../../middlewares/verifyToken");
const router = require("express").Router();
const userController = require('../../controllers/userController');

//GET ALL USERS
router.route('/').get(verifyToken, userController.getAllUser);

//GET USER
router.route('/find/:id').get(verifyToken, userController.getUser);

//UPDATE USER
router.route('/:id').put(verifyTokenAndAuthorization, userController.updateUser);

//DELETE
router.route('/:id').delete(verifyTokenAndAdmin, userController.deleteUser);

//GET USER STATS
router.route('/stats').get(verifyTokenAndAdmin, userController.statsUser);


module.exports = router;
