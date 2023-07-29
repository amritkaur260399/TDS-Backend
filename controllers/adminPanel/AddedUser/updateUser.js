const User = require("../../../models/User");
const { ObjectId } = require("mongoose").Types;

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({ message: "User id is not valid or User not found" });
    }
    const userData1 = req.body;

    let { firstName, lastName, email, phoneNumber } = userData1;

    const UserData = await User.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated Successfully",
      data: UserData,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateUser;
