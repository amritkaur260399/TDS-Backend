const userPortal =require("../../models/userPortal")

const getAllUserPortal = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 10;
    const searchCriteria = {};
    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          email: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }

    const data = await userPortal.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [{ $count: "totalCount" }],
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);
    console.log("data: ", data);
    const totalCount = await userPortal.countDocuments(searchCriteria);
    if (!data) throw createError.BadRequest("No field Found");
    res.status(200).json({
      success: true,
      count: data.length,
      totalCount,
      data: data[0].data,
      total: data[0].count[0] ? data[0].count[0].total : 0,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAllUserPortal;