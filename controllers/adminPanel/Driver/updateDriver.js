const Driver = require("../../../models/Driver");
const { formidable } = require("formidable");
const { ObjectId } = require("mongoose").Types;

const updateDriver = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Driver.findOne({ _id: ObjectId(id) });
    if (!data) {
      return res.send({
        success: false,
        message: "Driver id is not valid or Driver not found",
      });
    }

    const driverData = await Driver.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },

      {
        ...req.body,
        media: req.body?.media ? req.body.media : data.media,
        services: req.body.services.map((item) => {
          return data.services.find((itemObj) => itemObj.name === item.name)
            ? data.services.find((itemObj) => itemObj.name === item.name)
            : item;
        }),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Driver updated Successfully",
      data: driverData,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateDriver;
