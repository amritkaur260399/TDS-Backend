const Ride = require("../../../models/Ride");

const { ObjectId } = require("mongoose").Types;

const deleteRide = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Ride.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteRide;
