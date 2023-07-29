const Client = require("../../../models/Client");
const formidable = require("formidable");
const sendEmail = require("../../../services/sendEmail");
const signatureTemplates = require("../../../templates/signature");

const addClient = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
    });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err);
      }
      const {
        motorCarrierName,
        physicalAddress1,
        physicalAddress2,
        physicalCity,
        physicalState,
        physicalZip,
        mailingCity,
        mailingState,
        mailingZip,
        fax,
        billingEmail,
        billingContact,
        billingContactName,
        SSNTAXIdNumber,
        licenceNumber,
        dotNumber,
        MCNumber,
        designated,
        signatureImage,
        services,
        mailingAddress1,
        mailingAddress2,
        isPhysicalAddress,
        isDERCheck,
        isTermsAndConditions,
        signature_url,
        licenseState,
      } = fields;

      const addServices = JSON.parse(services);
      const designatedRepresentative = JSON.parse(designated);
      console.log(addServices, addServices);

      const client = await Client.create({
        motorCarrierName,
        physicalCity,
        physicalState,
        physicalZip,
        mailingAddress1,
        mailingAddress2,
        mailingCity,
        mailingState,
        mailingZip,
        physicalAddress1,
        physicalAddress2,
        fax,
        billingEmail,
        billingContact,
        billingContactName,
        SSNTAXIdNumber,
        licenceNumber,
        dotNumber,
        MCNumber,
        designated: designatedRepresentative,
        signatureImage,
        services: addServices,
        isPhysicalAddress,
        isDERCheck,
        isTermsAndConditions,
        licenseState,
      });

      if (signature_url) {
        await sendEmail(
          ["harish.chaudhary@simbaquartz.com"], //billingEmail
          "Regarding TDS-Confirmation",
          signatureTemplates(
            `${signature_url}?id=${client._id}`,
            motorCarrierName
          )
        );
      }
      res.status(200).json({
        success: true,
        message: "client created successfully",
        data: client,
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = addClient;
