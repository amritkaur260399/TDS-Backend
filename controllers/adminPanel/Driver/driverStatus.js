const Driver = require("../../../models/Driver");
const { ObjectId } = require("mongoose").Types;

const updateDriverStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Driver.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({ message: "Driver id is not valid or Driver not found" });
    }

    let { status } = req.body;

    const driverData = await Driver.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        status,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Driver status updated Successfully",
      data: driverData,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateDriverStatus;
