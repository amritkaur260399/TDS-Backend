const bcrypt = require("bcryptjs");
const DriverClearing = require("../../../models/DriverClearing");
const createError = require("http-errors");
const uploadFiles = require("../../../services/upload-files");
const Client = require("../../../models/Client");
const { ObjectId } = require("mongoose").Types;

const addClearingHouse = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      driverLicenseNumber,
      email,
      mailingAddress,
      onlineDriverEducation,
      DOB,
      clientId,
      status,
      serviceId,
    } = req.body;

    clearingData = await DriverClearing.create({
      firstName,
      lastName,
      driverLicenseNumber,
      email,
      mailingAddress,
      onlineDriverEducation,
      DOB,
      clientId,
    });

    // await Client.findOneAndUpdate(
    //   { _id: ObjectId(clientId) },
    //   {},
    //   { new: true }
    // );
    const clientData1 = await Client.findOne({ _id: ObjectId(clientId) });
    // for (let x of clientData1.services) {
    //   if (x._id === ObjectId(serviceId)) {
    //     x.status = "completed";
    //   }
    // }
    const data = await Promise.all(
      clientData1.services?.map((i) => {
        console.log(i?._id == serviceId, serviceId, i?._id);
        if (i._id == serviceId) {
          return {
            ...i?._doc,
            status: "completed",
          };
        } else {
          return i;
        }
      })
    );

    console.log(data, "data");
    clientData1.services = data;
    await clientData1.save();
    res.status(200).json({
      success: true,
      message: "driver clearing house created successfully",
      data: clearingData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = addClearingHouse;

// firstName:Rajvindar
// lastName:Singh
// phoneNumber: 97637897149
// DOB:2000-04-29T09:33:57.374Z
// licenceNumber:kfhrenfjk545
// issueState:Punjab
// licenceType:learner_driving_license
// startDate:2023-04-29T09:33:57.374Z
// endDate:2023-04-29T09:33:57.374Z
