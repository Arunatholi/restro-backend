const express = require("express");
// const router  = require("../app");
const router = express.Router();
const{  postRegister, userLogin, getAllusers, updateUserDetails, getUserDetails, deleteUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.route('/register').post(postRegister);
router.route('/login').post(userLogin);
router.route('/users').get(verifyToken,getAllusers);
router.route('/user/:id').put(verifyToken,updateUserDetails).get(verifyToken,getUserDetails).delete(verifyToken,deleteUser);
module.exports = router;