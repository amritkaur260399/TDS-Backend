const { Schema, model } = require("mongoose");

const Conversation = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    // lastMessage: {
    //   type: String,
    //   requried: true,
    // },
    last_message: { type: Schema.Types.ObjectId, ref: "message" },

    readBy: [{ type: Schema.Types.ObjectId }],

    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Conversation", Conversation, "Conversation");
