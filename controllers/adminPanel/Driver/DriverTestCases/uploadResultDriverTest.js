const uploadFiles = require("../../../../services/upload-files");
const formidable = require("formidable");
const sendEmail = require("../../../../services/sendEmail");
const Client = require("../../../../models/Client");
const { ObjectId } = require("mongoose").Types;
const preEmployementTemp = require("../../../../templates/preEmployementTemp");
const DriverTestCases = require("../../../../models/DriverTestCases");

const uploadResultDriverTest = async (req, res) => {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      }
      const {
        testResult,
        receivedDate,
        sendEmailToDriver,
        sendEmailToClient,
        sapSelected,
        type,
      } = fields;

      let resultPdf;
      if (!!files?.resultPdf === true) {
        let location = files.resultPdf.filepath;
        const originalFilename = files.resultPdf.originalFilename;
        resultPdf = await uploadFiles.upload(
          location,
          originalFilename,
          `T-D-S`,
          null
        );
      }

      const driverDataWithClient = await DriverTestCases.aggregate([
        {
          $match: { _id: ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "Driver",
            localField: "driverId",
            foreignField: "_id",
            as: "driverDetails",
          },
        },
        {
          $unwind: { path: "$driverDetails", preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            "driverDetails.clientID": 1,
            "driverDetails.firstName": 1,
            "driverDetails.lastName": 1,
          },
        },
      ]);

      const clientName = await Client.findOne({
        _id: ObjectId(driverDataWithClient[0].driverDetails.clientID),
      });
      console.log("driverDataWithClient", driverDataWithClient);

      if (sendEmailToDriver) {
        await sendEmail(
          ["harish.chaudhary@simbaquartz.com"], // selectDriver.email
          "Regarding TDS-Confirmation",
          preEmployementTemp(
            `${driverDataWithClient[0].driverDetails.firstName} ${driverDataWithClient[0].driverDetails.lastName}`,
            clientName.motorCarrierName,
            type === "PreEmployee"
              ? "Pre Employment drug test"
              : "Follow Up drug and Alcohol test"
          )
        );
      }
      if (sendEmailToClient) {
        await sendEmail(
          ["harish.chaudhary@simbaquartz.com"], // selectDriver.email
          "Regarding TDS-Confirmation",
          preEmployementTemp(
            `${driverDataWithClient[0].driverDetails.firstName} ${driverDataWithClient[0].driverDetails.lastName}`,
            clientName.motorCarrierName,
            type === "PreEmployee"
              ? "Pre Employment drug test"
              : "Follow Up drug and Alcohol test"
          )
        );
      }
      const preEmployment = await DriverTestCases.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          testResult,
          receivedDate,
          resultPdf: resultPdf?.Location,
          sendEmailToDriver,
          sendEmailToClient,
          type,
          sapSelected: ObjectId(sapSelected),
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Driver pre employee test result uploaded.",
        data: preEmployment,
      });
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong..",
    });
  }
};

module.exports = uploadResultDriverTest;
