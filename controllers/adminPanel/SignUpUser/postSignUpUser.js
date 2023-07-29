const bcrypt = require("bcryptjs");
const formidable = require("formidable");
const SignUpUser = require("../../../models/User");
const createError = require("http-errors");
const uploadFiles = require("../../../services/upload-files");

const postUser = async (req, res, next) => {
  try {
    const data = req.body;

    const { firstName,  lastName, email, phoneNumber, password } =
      data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const UserData = await SignUpUser.create({
      firstName,
  
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: UserData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = postUser;
