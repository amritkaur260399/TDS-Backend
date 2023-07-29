const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = require("../../../models/User");
const Token = require("../../../models/token");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../services/auth/generate_token");

const { accessTokenLife, refreshTokenLife } =
  require("../../../config/keys").jwt;

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      throw createError.BadRequest("Please enter full details !");
    }

    const findAdmin = await User.findOne({
      email: email,
    });
    // if (!findAdmin?.isActive) {
    //   throw createError.BadRequest("Account suspended");
    // }
    if (!findAdmin) {
      throw createError.BadRequest("User does not exists !");
    }
    //console.log("findAdmin", findAdmin);

    const passMatch = await bcrypt.compare(password, findAdmin.password);
    if (!passMatch) {
      throw createError.Unauthorized("Incorrect password. Please try again.");
    }

    const payload = {
      _id: findAdmin._id,
    };

    const accessToken = generateAccessToken(payload, accessTokenLife);
    const refreshToken = generateRefreshToken(payload, refreshTokenLife);

    if (accessToken && refreshToken) {
      const token = new Token({
        user: findAdmin._id,
        token: refreshToken,
      });
      token.save();

      res.json({
        message: "Login Success",
        success: true,
        data: payload,
        accessToken,
        refreshToken,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = adminLogin;
