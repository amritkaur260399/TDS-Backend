const driverModel = require("../../../models/Driver");
const { ObjectId } = require("mongoose").Types;

const randomPullDriver = async (req, res) => {
  try {
    const { driver_list_id } = req.body;
    for (var id = 0; id < driver_list_id.length; id++) {
      await driverModel.findOneAndUpdate(
        {
          _id: ObjectId(driver_list_id[id]),
        },
        {
          randomPullFlag: true,
        },
        { new: true }
      );
    }
    return res.status(200).json({
      success: true,
      message: "Driver Random pull successfully.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "Something went wrong.",
    });
  }
};

module.exports = randomPullDriver;
