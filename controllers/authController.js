const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const response = require("../utils/response.js");
const config = require('../config/config');

//Register User - /api/v1/auth/register
exports.registerUser = async (req, res) => {

    // console.log("req.body", req.body);
    // console.log("username", req.body.username);
    // console.log("email", req.body.email);
    // console.log("password", req.body.password);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        config.password.secret
      ).toString(),
    });

    // console.log("newUser", newUser);

    try {
      const savedUser = await newUser.save();
      response(res, 201, true, 'User successfully registered', savedUser);
    } catch (err) {
      response(res, 500, false, 'Internal Sever Error', err.message);
    }
  };

//Login User - /api/v1/auth/login
exports.loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(res, 401, false, "Username doesnt Exist");

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        config.password.secret
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      originalPassword !== req.body.password &&
        response(res, 401, false, 'Wrong Password');

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        config.jwt.secret,
        { expiresIn: "3 days" }
      );

      const { password, ...others } = user._doc;

      response(res, 200, true, "Login successful", {accessToken, ...others});
    } catch (err) {
      response(res, 500, false, 'Internal Sever Error', err.message);
    }
}