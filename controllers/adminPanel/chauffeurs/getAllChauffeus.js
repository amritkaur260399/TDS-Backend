const Chauffeur = require("../../../models/Chauffeur");
const { ObjectId } = require("mongoose").Types;

const getAllChauffeurs = async (req, res, next) => {
  const { type, assignVehicle, deactiveChauffeurId, assignRide } = req.query;

  try {
    // console.log(type, "typoo");
    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;

    const searchCriteria = {};

    if (assignVehicle) {
      searchCriteria["$and"] = [
        {
          isVerified: "Verified",
          vehicleId: { $exists: false },
        },
      ];
    } else if (assignRide) {
      searchCriteria["$and"] = [
        {
          isVerified: "Verified",
          vehicleId: { $exists: true },
        },
      ];
    } else {
      if (type) {
        searchCriteria.isVerified = type;
      }
    }
    if (req.query.keyword || req.query.category) {
      searchCriteria["$or"] = [
        {
          name: { $regex: `^${req.query.keyword}`, $options: "i" },
        },
      ];
    }
    if (deactiveChauffeurId) {
      searchCriteria["$and"] = [
        {
          _id: { $ne: ObjectId(deactiveChauffeurId) },
        },
      ];
    }
    let allChauffeurs = await Chauffeur.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $lookup: {
          from: "vehicle",
          localField: "vehicleId",
          foreignField: "_id",
          as: "vehicle",
        },
      },

      {
        $unwind: { path: "$vehicle", preserveNullAndEmptyArrays: true },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: fetchSize,
      },
    ]);
    const totalCount = await Chauffeur.countDocuments();

    res.status(200).json({
      message: "Got all Chauffeurs successfully.",
      success: true,
      data: allChauffeurs,
      totalCount: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllChauffeurs;
