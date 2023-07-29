const Chauffeur = require("../../../models/Chauffeur");
const Customer = require("../../../models/Client");

const { ObjectId } = require("mongoose").Types;

const saveNotificationToken = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { token, type } = req.body;

    if (type == "chauffeur") {
      await Chauffeur.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          notifToken: token,
        },
        { new: true }
      );
    } else {
      await Chauffeur.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          notifToken: token,
        },
        { new: true }
      );
    }

    res.json({ message: "Token added Successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = saveNotificationToken;
