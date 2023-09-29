const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();

const {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    statsUser

  } = require('../controllers/userController');

//GET ALL USERS
router.route('/').get(verifyToken, getAllUser);

//GET USER
router.route('/find/:id').get(verifyToken, getUser);

//UPDATE USER
router.route('/:id').put(verifyTokenAndAuthorization, updateUser);

//DELETE
router.route('/:id').delete(verifyTokenAndAdmin, deleteUser);

//GET USER STATS
router.route('/stats').get(verifyTokenAndAdmin, statsUser);


module.exports = router;
