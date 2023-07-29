const formidable = require("formidable");
const driverPreEmployeeModel = require("../../../../models/DriverTestCases");
const uploadFiles = require("../../../../services/upload-files");
const Driver = require("../../../../models/Driver");
const { ObjectId } = require("mongoose").Types;

const createDriverTest = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      }
      const {
        driverId,
        dateAndTimeOrdered,
        ccfNumber,
        sendFromToCompany,
        type,
      } = fields;

      let ccfForm;
      if (!!files?.ccfForm === true) {
        let location = files.ccfForm.filepath;
        const originalFilename = files.ccfForm.originalFilename;
        ccfForm = await uploadFiles.upload(
          location,
          originalFilename,
          `T-D-S`,
          null
        );
      }
      const client = await driverPreEmployeeModel.create({
        driverId,
        dateAndTimeOrdered,
        ccfNumber,
        ccfForm: ccfForm?.Location,
        sendFromToCompany,
        type,
      });

      await Driver.findOneAndUpdate(
        {
          _id: ObjectId(driverId),
        },
        {
          preEmploymentFlag: true,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Driver pre employee test created.",
        data: client,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createDriverTest;
