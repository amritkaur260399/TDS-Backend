const { Schema, model } = require("mongoose");

const VehiclePrice = new Schema(
  {
    category: {
      type: String,
      default: "SEDAN",
      required: true,
      enum: ["SEDAN", "SED", "SUV", "VAN", "BUS", "STR", "ROSA_BUS"],
    },

    title: {
      type: String,
    },

    fixedKm: {
      type: Number,
    },
    fixedPrice: {
      type: Number,
    },
    pricePerKm: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("VehiclePrice", VehiclePrice, "VehiclePrice");
