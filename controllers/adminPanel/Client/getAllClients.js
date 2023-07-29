const Client = require("../../../models/Client");

const getAllClients = async (req, res, next) => {
  try {
    const { query: { keyword } = { keyword: "" } } = req;

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const viewSize = (req.query.viewSize && parseInt(req.query.viewSize)) || 10;

    const searchCriteria = {};

    if (keyword) {
      searchCriteria["$or"] = [
        { motorCarrierName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { licenceNumber: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { SSNTAXIdNumber: { $regex: keyword, $options: "i" } },
        {
          dotNumber: { $regex: keyword, $options: "i" },
        },
        {
          MCNumber: { $regex: keyword, $options: "i" },
        },
      ];
    }

    let allClients = await Client.aggregate([
      {
        $addFields: {
          dotNumber: {
            $toString: "$dotNumber",
          },
          MCNumber: {
            $toString: "$MCNumber",
          },
          SSNTAXIdNumber: {
            $toString: "$SSNTAXIdNumber",
          },
        },
      },

      {
        $match: searchCriteria,
      },
      // {
      //   $lookup: {
      //     from: "Driver",
      //     localField: "_id",
      //     foreignField: "clientID",
      //     as: "drivers",
      //   },
      // },
      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },

            { $skip: startIndex },
            { $limit: viewSize },
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);
    //const totalCount = await Client.countDocuments();

    res.status(200).json({
      message: "All Clients Detail fetch successfully.",
      success: true,
      totalCount: allClients[0]?.count[0]?.total,
      // totalCount: allClients?.count?.total,
      data: allClients[0]?.data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllClients;
