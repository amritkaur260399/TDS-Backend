const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message.model");
const { ObjectId } = require("mongoose").Types;

const getMessages = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const { otherUserId, conversationId, mySelf } = req.query;

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 15;

    const searchCriteria = {};

    // if (conversationId) {
    //   searchCriteria = {

    //     conversation: ObjectId(conversationId),
    //   }
    // } else {
    //   searchCriteria["$or"] = [

    //   ]
    // }

    console.log('membersssss ', otherUserId, userId )

    let conversation;

    if (!conversationId) {
      const checkConvo = await Conversation.findOne({
        members: [otherUserId, userId],
        members: [userId, otherUserId],
      });

      console.log('checkConvo convo cnvo ', checkConvo)

      if (checkConvo) {
        conversation = checkConvo._id;
      }
    } else {
      conversation = conversationId;
    }

    console.log("conversation..asdga.sdga.g.ag.ag..a.g", conversation);

    const messages = await Message.aggregate([
      {
        $match: {
          conversation: ObjectId(conversation),
        },
      },

      {
        $sort: { created_at: -1 },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: fetchSize,
      },
    ]);

    res.json({
      message: "Fetched all messages",
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getMessages;
