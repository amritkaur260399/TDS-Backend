const bcrypt = require("bcryptjs");
const CompanyClearing = require("../../../models/CompanyClearing");
const createError = require("http-errors");
const uploadFiles = require("../../../services/upload-files");
const Client = require("../../../models/Client");
const { ObjectId } = require("mongoose").Types;

const addClearingHouse = async (req, res, next) => {
  try {
    const {
      companyName,
      phoneNumber,
      firstName,
      lastName,
      dob,
      ownersDriverLicenseNumber,
      email,
      address,
      FMCSAEmail,
      FMCSAPassword,
      clearingHouseLogin,
      clearingHousePassword,
      clientId,
      status,
      serviceId,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clearingHousePassword, salt);

    clearingData = await CompanyClearing.create({
      companyName,
      phoneNumber,
      firstName,
      lastName,
      dob,
      ownersDriverLicenseNumber,
      email,
      address,
      FMCSAEmail,
      FMCSAPassword,
      clearingHouseLogin,
      clientId,
      clearingHousePassword: hashedPassword,
    });

    console.log("serviceId", serviceId);
    console.log("clientId", clientId);
    const clientData1 = await Client.findOne({ _id: ObjectId(clientId) });
    console.log("clientData1.services", clientData1.services);
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
      message: "company clearing house created successfully",
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
