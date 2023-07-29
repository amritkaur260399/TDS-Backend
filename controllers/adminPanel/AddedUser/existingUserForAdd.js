const User = require("../../../models/User");
const otpModel = require("../../../models/OTP");
const generateOTP = require("../../../services/generateOTP");
const sendEmail = require("../../../services/sendEmail");
const OTPtemplate = require("../../../templates/OTPlink");

const existingUserForAdd = async (req, res, next) => {
  // const currentLogin = await User.findOne({_id: req.user._id})
  // console.log(currentLogin.email)
  try {
    const { email, phoneNumber } = req.body;

    const data2 = await User.findOne({ phoneNumber: phoneNumber });

    if (data2) {
      return res.status(400).send({ message: "Phone number already exists" });
    }
    const data3 = await User.findOne({ email: email });

    if (data3) {
      return res.status(400).send({ message: "User Email already exists" });
    }

    const otpObject = await otpModel.findOne({ user: email });
    const newOTP = generateOTP();

    if (otpObject) {
      await otpModel.findByIdAndUpdate(
        otpObject._id,
        { otp: newOTP },
        { new: true }
      );
    } else {
      await otpModel.create({
        user: email,
        otp: newOTP,
      });
    }

    await sendEmail(
      ["harish.chaudhary@simbaquartz.com"],
      "Regarding OTP",
      OTPtemplate({ OTP: newOTP })
    );

    res.status(200).json({
      success: true,
      message: "OTP send successfully.",
      otp: newOTP,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = existingUserForAdd;
