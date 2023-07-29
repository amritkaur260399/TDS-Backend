const { Schema, model } = require("mongoose");

const companyClearingHouse = new Schema(
  {
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    //company clearing house fields
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dob: {
      type: Date,
    },
    ownersDriverLicenseNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    FMCSAEmail: {
      type: String,
    },
    FMCSAPassword: {
      type: String,
    },
    clearingHouseLogin: {
      type: String,
    },
    clearingHousePassword: {
      type: String,
    },
    active: { type: Boolean, default: true },
    clientId: { type: String, required: true, ref: "Client" },
  },
  { timestamps: true }
);

module.exports = model(
  "companyClearingHouse",
  companyClearingHouse,
  "companyClearingHouse"
);
