const { Schema, model } = require("mongoose");

const quickBooksServiceModel = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    qbItemId: { type: String, required: false },
    quantity: { type: Number, required: false, default: 1 },
    rate: { type: Number, required: false },
    amount: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

module.exports = model(
  "quickBooksServiceModel",
  quickBooksServiceModel,
  "quickBooksServiceModel"
);
