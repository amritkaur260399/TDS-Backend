const DriverClearing = require("../../../models/DriverClearing");

const { ObjectId } = require("mongoose").Types;

const deleteClearingHouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await DriverClearing.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({
        message:
          "Driver Clearing House id is not valid or Driver Clearing House not found",
      });
    }

    await DriverClearing.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "Driver Clearing House deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteClearingHouse;
