const DriverClearing = require("../../../models/DriverClearing");

const getAllDriverClearings = async (req, res, next) => {
  try {
    const { query: { keyword } = { keyword: "" } } = req;

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;

    const searchCriteria = {};

    if (keyword) {
      searchCriteria["$or"] = [
        { firstName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { lastName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        {
          driverLicenseNumber: { $regex: `^${keyword.trim()}`, $options: "i" },
        },
      ];
    }
    let AllDriverClearings = await DriverClearing.aggregate([
      {
        $match: searchCriteria,
      },

      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },

            { $skip: startIndex },
            { $limit: fetchSize },
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);

    // const totalCount = await DriverClearing.countDocuments();

    res.status(200).json({
      message: "All Driver Clearing House fetch successfully.",
      success: true,
      // totalCount: totalCount,
      // data: AllDriverClearings,

      count: AllDriverClearings[0]?.count[0]?.total,
      data: AllDriverClearings[0]?.data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllDriverClearings;
