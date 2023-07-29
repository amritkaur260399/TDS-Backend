const Ride = require("../../models/Ride");
const { ObjectId } = require("mongoose").Types;

const getAllRides = async (req, res, next) => {
  try {
    const { type } = req.query;
    const { _id: userId } = req.user;

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;

    const searchCriteria = {};

    if (type == "offers") {
      searchCriteria["$and"] = [
        { rejectedBy: { $nin: [ObjectId(userId)] } },
        {
          $or: [{ chauffeurID: { $exists: false } }, { chauffeurID: null }],
        },
        {
          chauffeurStatus: "Pending",
        },

        {
          paymentStatus: "Completed",
        },
        {
          date: {
            $gte: new Date(),
          },
        },
        {
          date: {
            $lte: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          },
        },
      ];
    } else if (type == "signage") {
      searchCriteria["$and"] = [
        { chauffeurID: ObjectId(userId) },

        {
          status: "Pending",
        },

        {
          rideType: "Airport-Pickup/Drop",
        },

        {
          date: {
            $gte: new Date(),
          },
        },
      ];
    } else if (type === "upcoming") {
      searchCriteria["$and"] = [
        { chauffeurID: ObjectId(userId) },

        {
          status: "Pending",
        },
        {
          date: {
            $gte: new Date(),
          },
        },
      ];
    } else if (type === "pending") {
      searchCriteria["$and"] = [
        { chauffeurID: ObjectId(userId) },

        {
          status: "Pending",
        },
        {
          date: {
            $lt: new Date(new Date()),
            // $gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
            // $lte: new Date(new Date().setUTCHours(23, 59, 59, 999)),
          },
        },
      ];
    } else if (type === "completed") {
      searchCriteria["$and"] = [
        { chauffeurID: ObjectId(userId) },

        {
          status: "Completed",
        },
      ];
    } else if (type === "cancelled") {
      searchCriteria["$and"] = [
        // { chauffeurID: ObjectId(userId) },

        // {
        //   status: "Cancelled",
        // },
        { rejectedBy: { $in: [userId] } },
      ];
    } else if (type === "past") {
      searchCriteria["$and"] = [
        { chauffeurID: ObjectId(userId) },
        {
          date: {
            $lt: new Date(new Date()),
          },
        },
      ];
    }
    if (req.query.keyword || req.query.category) {
      searchCriteria["$or"] = [
        {
          firstName: { $regex: `^${req.query.keyword}`, $options: "i" },
        },
      ];
    }

    const allRides = await Ride.aggregate([
      {
        $match: {
          ...searchCriteria,
        },
      },
      // {
      //   $lookup: {
      //     from: "Chauffeur",
      //     let: { id: "$chauffeurID" },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [{ $eq: ["$_id", "$$id"] }],
      //           },
      //         },
      //       },
      //       {
      //         $lookup: {
      //           from: "vehicle",
      //           localField: "vehicleId",
      //           foreignField: "_id",
      //           as: "vehicleDetails",
      //         },
      //       },
      //       {
      //         $unwind: {
      //           path: "$vehicleDetails",
      //           preserveNullAndEmptyArrays: true,
      //         },
      //       },
      //     ],
      //     as: "ChauffeurDetails",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$ChauffeurDetails",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $sort: {
          date: type == "past" || type == "pending" ? -1 : 1,
          date: type == "past" || type == "pending" ? -1 : 1,
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: fetchSize,
      },
    ]);

    res.json({
      message: "Successfully loaded Rides",
      success: true,
      data: allRides,
    });

    // const { _id: userId } = req.user;

    // // console.log(userId, "allRides");

    // const allRides = await Ride.find({
    //   chauffeurID: userId,
    // });

    // res.status(200).json({
    //   message: "Success",
    //   data: allRides,
    // });

    // console.log(allRides, "allRides");
  } catch (err) {
    next(err);
  }
};

module.exports = getAllRides;
