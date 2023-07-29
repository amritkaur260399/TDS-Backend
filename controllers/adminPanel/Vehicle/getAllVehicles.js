const { ObjectId } = require("mongoose").Types;
const Vehicle = require("../../../models/Vehicle");

const getAllVehicles = async (req, res, next) => {
  try {
    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;

    const searchCriteria = {};

    if (req.query.keyword || req.query.category) {
      searchCriteria["$or"] = [
        {
          vehicleName: { $regex: `^${req.query.keyword}`, $options: "i" },
        },
        {
          category: { $eq: req.query.category },
        },
      ];
    }

    const vehicleList = await Vehicle.aggregate([
      {
        $match: req.query.assignVehicle
          ? {
              $and: [
                {
                  $or: [
                    { chauffeur: { $exists: false } },
                    { chauffeur: { $eq: null } },
                  ],
                },
                { ...searchCriteria },
              ],
            }
          : searchCriteria,
      },

      {
        $skip: startIndex,
      },
      {
        $limit: fetchSize,
      },
    ]);
    const totalCount = await Vehicle.countDocuments();
    res.status(200).json({
      message: "Success",
      data: vehicleList,
      totalCount: totalCount,
    });
  } catch (error) {
    console.log("error while fetching vehicle list:", error);
    next(error);
  }
};
module.exports = getAllVehicles;
