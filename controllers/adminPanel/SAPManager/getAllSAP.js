const sapDetailsModal = require("../../../models/SAPDetails");

const getAllSAP = async (req, res) => {
  try {
    const {
      query: { keyword } = {
        keyword: "",
      },
    } = req;

    const searchCriteria = {};
    if (keyword) {
      searchCriteria["$or"] = [
        { name: { $regex: `^${keyword.trim()}`, $options: "i" } },
      ];
    }

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.viewSize && parseInt(req.query.viewSize)) || 10;

    const response = await sapDetailsModal.aggregate([
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
            {
              $skip: startIndex,
            },
            {
              $limit: fetchSize,
            },
          ],
          count: [{ $count: "total" }],
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      response: {
        data: response[0].data,
        totalCount: response[0].count[0].total,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = getAllSAP;
