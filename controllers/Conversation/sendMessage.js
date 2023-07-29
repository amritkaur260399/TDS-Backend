const Message = require("../../models/Message.model");

const { ObjectId } = require("mongoose").Types;
var admin = require("firebase-admin");
const Chauffeur = require("../../models/Chauffeur");
const sendNotifications = require("../../services/notifications/notification");
const Conversation = require("../../models/Conversation");
const Customer = require("../../models/Client");

const sendMessage = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const { message, conversationId, myType } = req.body;

    const { type, receiverId } = req.query;

    let conversation;

    if (!conversationId) {
      const checkConvo = await Conversation.findOne({
        members: [receiverId, userId],
        members: [userId, receiverId],
      });

      if (!checkConvo) {
        const newConversation = new Conversation({
          members: [userId, receiverId],
          readBy: [userId],
        });

        await newConversation.save();

        conversation = newConversation._id;
      } else {
        conversation = checkConvo._id;
      }
    } else {
      conversation = conversationId;
    }

    let sender;
    let receiver;

    if (myType == "Customer") {
      sender = await Customer.findOne({ _id: ObjectId(userId) });
      receiver = await Chauffeur.findOne({ _id: ObjectId(receiverId) });
    } else {
      sender = await Chauffeur.findOne({ _id: ObjectId(userId) });
      receiver = await Customer.findOne({ _id: ObjectId(receiverId) });
    }

    const newMessage = new Message({
      conversation,
      type,
      message,
      sender: {
        id: ObjectId(userId),
        type: myType,
        name: sender.name,
        countryCode: sender.countryCode,
        phone: sender.phone,
      },
      receiver: {
        id: ObjectId(receiverId),
        type: myType == "Chauffeur" ? "Customer" : "Chauffeur",

        name: receiver.name,
        countryCode: receiver.countryCode,
        phone: receiver.phone,
      },
      readBy: [{ user: userId }],
    });

    await newMessage.save();

    await Conversation.findOneAndUpdate(
      { _id: ObjectId(conversation) },
      {
        last_message: newMessage._id,
        readBy: [userId],
      },
      { new: true }
    );

    await req.io.to(receiverId.toString()).emit("new-message", newMessage);

    if (receiver?.notifToken) {
      await sendNotifications({
        title: sender.name,
        body: `${sender.name} sent you a message`,
        token: receiver?.notifToken,
      });
    }

    res.json({
      message: "Message send successfully",
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = sendMessage;
