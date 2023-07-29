const User = require("../../../models/User");

const getAllUsers = async (req, res, next) => {
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
        { email: { $regex: `^${keyword.trim()}`, $options: "i" } },
        // { userName: { $regex: `^${keyword.trim()}`, $options: "i" } },
      ];
    }
    let allUsers = await User.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $facet: {
          data: [{ $skip: startIndex }, { $limit: fetchSize }],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      message: "All Users Detail fetch successfully.",
      success: true,
      totalCount: allUsers[0]?.count[0]?.total,
      data: allUsers[0]?.data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllUsers;
