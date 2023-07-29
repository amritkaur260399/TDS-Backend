const Chauffeur = require("../../../models/Chauffeur");
const DriverClearing = require("../../../models/DriverClearing");
const Vehicle = require("../../../models/Vehicle");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { formidable } = require("formidable");
const GetCoordinates = require("../../../services/GeoLocation/GetCoordinates");
// const getClientDistance = require("../../../services/GeoLocation/getClientDistance");
const sendNotifications = require("../../../services/notifications/notification");

const { ObjectId } = require("mongoose").Types;

const updateDriverClearingHouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Data = await DriverClearing.findOne({ _id: ObjectId(id) });

    if (!Data) {
      res.send({
        message:
          "Driver Clearing House id is not valid or Driver Clearing House not found",
      });
    }

    const data = req.body;
    const {
      firstName,
      lastName,
      driverLicenseNumber,
      email,
      mailingAddress,
      onlineDriverEducation,
      DOB,
    } = data;

    const HouseData = await DriverClearing.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        firstName,
        lastName,
        driverLicenseNumber,
        email,
        mailingAddress,
        onlineDriverEducation,
        DOB,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Driver Clearing House updated successfully",
      data: HouseData,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateDriverClearingHouse;
