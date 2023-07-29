const { Schema, model } = require("mongoose");

const RidePersonalDetails = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model(
  "ridePersonalDetails",
  RidePersonalDetails,
  "ridePersonal"
);
