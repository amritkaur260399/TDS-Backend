const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratings = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    chauffeurId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
    feedback: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("rating", ratings, "rating");
