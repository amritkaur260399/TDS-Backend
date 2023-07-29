const userModel = require("../../../models/User");
const sendEmail = require("../../../services/sendEmail");
const passwordTemplate = require("../../../templates/password");

const addUserFinal = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, confirmation_url } =
    req.body;

  if (await userModel.findOne({ email: email })) {
    return res.status(404).json({
      success: false,
      message: "This email address is already exists.",
    });
  } else if (await userModel.findOne({ phoneNumber: phoneNumber })) {
    return res.status(404).json({
      success: false,
      message: "This phone number is already exists.",
    });
  }
  const addUser = await userModel.create({
    firstName,
    lastName,
    email,
    phoneNumber,
  });

  if (confirmation_url) {
    await sendEmail(
      ["harish.chaudhary@simbaquartz.com"], //email
      "Regarding TDS-Confirmation",
      passwordTemplate(
        `${confirmation_url}?id=${addUser._id}`,
        firstName,
        lastName
      )
    );
  }

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    addUser,
  });
};

module.exports = addUserFinal;
