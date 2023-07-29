const Ride = require("../../../models/Ride");

const getAllRides = async (req, res, next) => {
  const { type, singleChauffeur, newest } = req.query;
  try {
    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;

    const searchCriteria = {};

    if (singleChauffeur) {
      const { chauffeurID } = req.query;

      // console.log(userId, "allRides");

      const allRides = await Ride.find({
        chauffeurID,
        status: "Pending",
      });

      res.status(200).json({
        message: "Success",
        data: allRides,
      });
    } else {
      if (type === "upcoming") {
        searchCriteria["$and"] = [
          {
            status: "Pending",
          },
          {
            date: {
              $gte: new Date(),
              // $gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
              // $lte: new Date(new Date().setUTCHours(23, 59, 59, 999)),
            },
          },
        ];
      } else if (type === "pending") {
        searchCriteria["$and"] = [
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
          {
            status: "Completed",
          },
        ];
      } else if (type === "cancelled") {
        searchCriteria["$and"] = [
          {
            status: "Cancelled",
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
            $and: [
              { firstName: { $exists: true } },
              {
                ...searchCriteria,
              },
            ],
          },
        },
        {
          $lookup: {
            from: "Chauffeur",
            let: { id: "$chauffeurID" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$_id", "$$id"] }],
                  },
                },
              },
              {
                $lookup: {
                  from: "vehicle",
                  localField: "vehicleId",
                  foreignField: "_id",
                  as: "vehicleDetails",
                },
              },
              {
                $unwind: {
                  path: "$vehicleDetails",
                  preserveNullAndEmptyArrays: true,
                },
              },
            ],
            as: "ChauffeurDetails",
          },
        },
        {
          $unwind: {
            path: "$ChauffeurDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            date: newest ? -1 : 1,
            time: newest ? -1 : 1,
          },
        },
        {
          $skip: startIndex,
        },
        {
          $limit: fetchSize,
        },
      ]);

      const totalCount = await Ride.aggregate([
        {
          $match: searchCriteria,
        },
      ]);

      res.json({
        message: "Successfully loaded Rides",
        success: true,
        data: allRides,
        totalCount: totalCount?.length,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getAllRides;
