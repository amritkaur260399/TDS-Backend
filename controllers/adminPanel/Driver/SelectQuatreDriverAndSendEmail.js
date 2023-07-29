const driverModel = require("../../../models/Driver");
const { ObjectId } = require("mongoose").Types;
const sendEmail = require("../../../services/sendEmail");
const clientModel = require("../../../models/Client");
const {
  default: randomTestTemp,
} = require("../../../templates/randomTestTemp");

const SelectQuatreDriverAndSendEmail = async (req, res) => {
  try {
    const { driver_id, quatre, sendEmailToDriver, sendEmailToClient } =
      req.body;
    const selectDriver = await driverModel.findOne({
      _id: ObjectId(driver_id),
    });
    const selectedClient = await clientModel.findOne({
      _id: ObjectId(selectDriver.clientID),
    });

    if (selectDriver?.randomPullFlag) {
      selectDriver.randomPullQuatre = quatre;
      if (sendEmailToDriver) {
        selectDriver.sendEmailToDriver = true;
        await sendEmail(
          ["harish.chaudhary@simbaquartz.com"], // selectDriver.email
          "Regarding TDS-Confirmation",
          randomTestTemp(
            `${selectDriver.firstName} ${selectDriver.lastName}`,
            selectedClient.motorCarrierName
          )
        );
      }

      if (sendEmailToClient) {
        selectDriver.sendEmailToClient = true;
        await sendEmail(
          ["harish.chaudhary@simbaquartz.com"], // selectedClient.billingEmail
          "Regarding TDS-Confirmation",
          randomTestTemp(
            `${selectDriver.firstName} ${selectDriver.lastName}`,
            selectedClient.motorCarrierName
          )
        );
      }
      selectDriver.save();

      return res.status(200).json({
        success: true,
        message: "Driver quatre set successfully and email sended.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Driver randomPullFlag must be true for set quatre.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Maybe Some required key not defined.",
    });
  }
};

module.exports = SelectQuatreDriverAndSendEmail;
