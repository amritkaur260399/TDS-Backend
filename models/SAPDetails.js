const { Schema, model } = require("mongoose");

const sapDetailsModal = new Schema(
  {
    email: { type: String, required: false },
    name: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    sapAddress: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = model("sapDetailsModal", sapDetailsModal, "sapDetailsModal");
