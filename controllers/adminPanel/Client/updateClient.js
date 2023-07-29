const Client = require("../../../models/Client");
const { formidable } = require("formidable");
const { ObjectId } = require("mongoose").Types;

const updateClient = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
    });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      }
      const { id } = req.params;
      const data = await Client.findOne({ _id: ObjectId(id) });

      if (!data) {
        res.send({ message: "Client id is not valid or Client not found" });
      }

      let {
        motorCarrierName,
        physicalAddress1,
        physicalAddress2,
        physicalCity,
        physicalState,
        physicalZip,
        mailingAddress,
        mailingCity,
        mailingState,
        mailingZip,
        fax,
        billingEmail,
        billingContact,
        SSNTAXIdNumber,
        licenceNumber,
        dotNumber,
        MCNumber,
        designated,
        signatureImage,
        services,
        isPhysicalAddress,
        isDERCheck,
        isTermsAndConditions,
        licenseState,
      } = fields;

      const addServices = JSON.parse(services);
      const finalArray = addServices.map((item) => {
        return data.services.find((itemObj) => itemObj.name === item.name)
          ? data.services.find((itemObj) => itemObj.name === item.name)
          : item;
      });

      const clientData = await Client.findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        {
          motorCarrierName,
          physicalAddress1,
          physicalAddress2,
          physicalCity,
          physicalState,
          physicalZip,
          mailingAddress,
          mailingCity,
          mailingState,
          mailingZip,
          fax,
          billingEmail,
          billingContact,
          SSNTAXIdNumber,
          licenceNumber,
          dotNumber,
          MCNumber,
          designated: JSON.parse(designated),
          signatureImage: signatureImage ? signatureImage : data.signatureImage,
          services: finalArray,
          isPhysicalAddress,
          isDERCheck,
          isTermsAndConditions,
          licenseState,
        },
        { new: true }
      );
      await clientData.save();

      res.status(200).json({
        success: true,
        message: "Client updated Successfully",
        data: clientData,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateClient;
