const { Schema, model } = require("mongoose");

const ClientNote = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    subject: {
      type: String,
      required: true,
    },
    noteCreatedBy: { type: String, required: false },
    userNameStamp: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = model("ClientNote", ClientNote, "ClientNote");
