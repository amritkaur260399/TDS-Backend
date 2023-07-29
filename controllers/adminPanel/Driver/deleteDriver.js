const Driver = require("../../../models/Driver");

const { ObjectId } = require("mongoose").Types;

const deleteDriver = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Driver.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({ message: "Driver id is not valid or Driver not found" });
    }

    await Driver.findOneAndDelete({ _id: ObjectId(id) });

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteDriver;
