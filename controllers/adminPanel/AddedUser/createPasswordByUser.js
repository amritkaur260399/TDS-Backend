const userModel = require("../../../models/User");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcryptjs");

const createPasswordByUser = async (req, res) => {
  const { user_id, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.status(404).json({
      success: false,
      message: "Password and confirm password do not match.",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userUpdatedObject = await userModel.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    {
      password: hashedPassword,
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "Password created successfully.",
  });
};

module.exports = createPasswordByUser;
