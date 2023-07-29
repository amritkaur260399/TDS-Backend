const { Schema, model } = require("mongoose");

const quickBookToken = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("quickBookToken", quickBookToken, "quickBookToken");
