const { ObjectId } = require("mongoose").Types;
const DriverClearing = require("../../../models/DriverClearing");

const getSingleDriverClearingDetails = async (req, res, next) => {
  const { id } = req.params;

  const data = await DriverClearing.findOne({ _id: ObjectId(id) });

  if (!data) {
    res.send({
      message:
        "Driver Clearing House id is not valid or Driver Clearing House not found",
    });
  }
  try {
    const ClearingHouse = await DriverClearing.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
    ]);

    res.json({
      message: "Single Driver Clearing House fetch successfully",
      success: true,
      data: ClearingHouse[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getSingleDriverClearingDetails;
