const CompanyClearing = require("../../../models/CompanyClearing");

const getAllCompanyClearings = async (req, res, next) => {
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
          ownersDriverLicenseNumber: {
            $regex: `^${keyword.trim()}`,
            $options: "i",
          },
        },
      ];
    }
    let AllCompanyClearings = await CompanyClearing.aggregate([
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

    // const totalCount = await CompanyClearing.countDocuments();

    res.status(200).json({
      message: "All Company Clearing House fetch successfully.",
      success: true,
      // totalCount: totalCount,
      // data: AllCompanyClearings,

      count: AllCompanyClearings[0]?.count[0]?.total,
      data: AllCompanyClearings[0]?.data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllCompanyClearings;
