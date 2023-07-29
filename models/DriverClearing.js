const { Schema, model } = require("mongoose");

const driverClearingHouse = new Schema(
  {
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },
    driverLicenseNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    DOB: { type: Date, required: true },

    mailingAddress: {
      type: String,
    },
    onlineDriverEducation: {
      type: Boolean,
    },
    clientId: { type: String, required: true, ref: "Client" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model(
  "driverClearingHouse",
  driverClearingHouse,
  "driverClearingHouse"
);
