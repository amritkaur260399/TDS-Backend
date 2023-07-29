const formidable = require("formidable");
const uploadFiles = require("../../../../services/upload-files");
const DriverDrugAndAlcoholModal = require("../../../../models/DriverDrugAndAlcohol");

const createDrugAndAlcoholTest = (req, res) => {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      }
      const { driverId, queryDate, expireDate } = fields;

      let queryForm;
      if (!!files?.queryForm === true) {
        let location = files.queryForm.filepath;
        const originalFilename = files.queryForm.originalFilename;
        queryForm = await uploadFiles.upload(
          location,
          originalFilename,
          `T-D-S`,
          null
        );
      }

      const client = await DriverDrugAndAlcoholModal.create({
        driverId,
        queryDate,
        expireDate,
        queryForm: queryForm?.Location,
        // sendFromToCompany
      });

      return res.status(200).json({
        success: true,
        message: "Driver Drug and Alcohol tet created.",
        data: client,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createDrugAndAlcoholTest;
