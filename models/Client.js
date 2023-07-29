const { Schema, model } = require("mongoose");

const Client = new Schema(
  {
    motorCarrierName: {
      type: String,
      requried: true,
    },
    qbCustomerID: { type: String, required: false },
    qbInvoiceID: { type: String, required: false },

    licenseState: { type: String, required: false },
    isPhysicalAddress: { type: Boolean, default: false, required: false },
    isDERCheck: { type: Boolean, default: false, required: false },
    isTermsAndConditions: { type: String, default: false, required: false },
    physicalAddress2: { type: String, required: true },
    physicalAddress1: { type: String, required: true },
    physicalCity: { type: String, required: true },
    physicalState: { type: String, required: true },
    physicalZip: { type: Schema.Types.Number, required: true },

    mailingAddress1: { type: String },
    mailingAddress2: { type: String },
    mailingCity: { type: String },
    mailingState: { type: String },
    mailingZip: { type: Schema.Types.Number },

    fax: { type: Schema.Types.Number, required: false },
    billingEmail: { type: String, required: true },
    billingContact: { type: Schema.Types.String, required: true },
    billingContactName: { type: Schema.Types.String, required: true },
    SSNTAXIdNumber: { type: Schema.Types.String, required: true },
    licenceNumber: { type: Schema.Types.String, required: true },
    dotNumber: { type: Schema.Types.Number, required: true },
    MCNumber: { type: String, required: true },

    designated: [
      {
        designatedRepresentativeFirstName: { type: String, required: false },
        designatedRepresentativeLastName: { type: String, required: false },
        designatedRepresentativePhone: {
          type: Schema.Types.String,
          required: false,
        },
        designatedRepresentativeEmail: {
          type: Schema.Types.String,
          required: false,
        },
      },
    ],

    signatureImage: {
      type: Schema.Types.String,
      required: false,
    },

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
  },
  { timestamps: true }
);

module.exports = model("Client", Client, "Client");
