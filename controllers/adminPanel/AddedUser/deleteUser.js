const User = require("../../../models/User");

const { ObjectId } = require("mongoose").Types;

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({ message: "User id is not valid or User not found" });
    }

    await User.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteUser;
