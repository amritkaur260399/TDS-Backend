const Chauffeur = require("../../models/Chauffeur");
const Ride = require("../../models/Ride");
const sendNotifications = require("../../services/notifications/notification");
const { ObjectId } = require("mongoose").Types;

const updateRide = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const { rideId, status } = req.query;

    if (status == "reject") {
      const ride = await Ride.findOne({ _id: ObjectId(rideId) });

      await Ride.findOneAndUpdate(
        { _id: ObjectId(rideId) },
        {
          $unset: { chauffeurID: "" },
          rejectedBy: [...ride.rejectedBy, userId],
          chauffeurStatus: "Pending"
        },
        { new: true }
      );
    } else if (status == "accept") {
      await Ride.findOneAndUpdate(
        { _id: ObjectId(rideId) },
        {
          chauffeurID: ObjectId(userId),
          chauffeurStatus: "Booked",
        },
        { new: true }
      );
    } else if (status == "start") {
      await Ride.findOneAndUpdate(
        { _id: ObjectId(rideId) },
        {
          chauffeurStatus: "Started",
          status: "Started",
        },
        { new: true }
      );

      await Chauffeur.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          activeRide: ObjectId(rideId),
        },
        { new: true }
      );
    } else if (status == "finish") {
      await Ride.findOneAndUpdate(
        { _id: ObjectId(rideId) },
        {
          chauffeurStatus: "Completed",
          status: "Completed",
        },
        { new: true }
      );

      await Chauffeur.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          $unset: { activeRide: "" },
        },
        { new: true }
      );
    } else if (status == "On-the-way") {
      await Ride.findOneAndUpdate(
        { _id: ObjectId(rideId) },
        {
          chauffeurStatus: "On-the-way",
        },
        { new: true }
      );
    } else if (status == "Arrived") {
      await Ride.findOneAndUpdate(
        { _id: ObjectId(rideId) },
        {
          chauffeurStatus: "Arrived",
        },
        { new: true }
      );
    }

    res.json({ message: "Ride updated successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = updateRide;
