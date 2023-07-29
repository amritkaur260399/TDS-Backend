const { Schema, model } = require("mongoose");

const Driver = new Schema(
  {
    randomPullFlag: { type: Boolean, required: false, default: false },
    qbInvoiceID: { type: String, required: false },
    randomPullQuatre: { type: Number, require: false, default: 0 },
    email: { type: String, required: false },
    preEmploymentFlag: { type: String, required: false, default: false },

    clientID: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    media: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    DOB: { type: Date, required: true },
    licenceNumber: { type: Schema.Types.String, required: true },
    issueState: { type: Schema.Types.String },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    startDate: { type: Date, required: true },
    expireDate: { type: Date, required: false },
    sendEmailToDriver: { type: Boolean, default: false },
    sendEmailToClient: { type: Boolean, default: false },
    status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
    services: [
      {
        name: { type: Schema.Types.String },
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "completed"],
        },
      },
    ],
    // endDate: { type: Date, required: true },

    // TODO: use verification false as default when sending mail to veridy password
    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Driver", Driver, "Driver");
