const { Schema, model } = require("mongoose");

const DriverTestCases = new Schema(
  {
    driverId: { type: Schema.Types.ObjectId, ref: "Driver", require: true },
    testResult: {
      type: String,
      enum: ["Positive", "Negative", "Invalid"],
      required: false,
    },
    receivedDate: { type: Date, required: false },
    dateAndTimeOrdered: { type: Date, required: false },
    ccfNumber: { type: String, required: false },
    resultPdf: { type: String, required: false },
    ccfForm: { type: String, required: false },
    sendFromToCompany: { type: Boolean, required: false },
    sapSelected: {
      type: Schema.Types.ObjectId,
      ref: "sapDetailsModal",
      required: false,
    },
    type: {
      type: String,
      default: "PreEmployee",
      enum: ["PreEmployee", "FollowUp"],
      required: false,
    },

    sendEmailToDriver: { type: Boolean, default: false },
    sendEmailToClient: { type: Boolean, default: false },
    sendEmailToSAP: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = model("DriverTestCases", DriverTestCases, "DriverTestCases");
