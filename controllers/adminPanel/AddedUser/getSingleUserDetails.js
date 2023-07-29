const { ObjectId } = require("mongoose").Types;
const User = require("../../../models/User");

const getSingleUserDetails = async (req, res, next) => {
  const { id } = req.params;

  //console.log(UserID);

  const data = await User.findOne({ _id: ObjectId(id) });

  if (!data) {
    res.send({ message: "User id is not valid or User not found" });
  }
  try {
    const UserDetails = await User.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
    ]);

    res.json({
      message: "User detail fetch successfully",
      success: true,
      data: UserDetails[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getSingleUserDetails;
