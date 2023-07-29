const Driver = require("../../../models/Driver");
const { ObjectId } = require("mongoose").Types;

const getAllDrivers = async (req, res, next) => {
  try {
    const {
      query: { keyword, randomPullFlag, randomPullQuatre, status, clientID } = {
        keyword: "",
        randomPullFlag: "",
        randomPullQuatre: "",
        status: "",
        clientID: "",
      },
    } = req;

    const startIndex =
      (req.query.startIndex && parseInt(req.query.startIndex)) || 0;
    const fetchSize =
      (req.query.fetchSize && parseInt(req.query.fetchSize)) || 10;
    const searchCriteria = {};

    if (keyword) {
      searchCriteria["$or"] = [
        { firstName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { lastName: { $regex: `^${keyword.trim()}`, $options: "i" } },
        { licenceNumber: { $regex: `^${keyword.trim()}`, $options: "i" } },
      ];
    }

    if (randomPullFlag) {
      searchCriteria.randomPullFlag = randomPullFlag.toLowerCase() === "true";
    }

    if (randomPullQuatre) {
      searchCriteria.randomPullQuatre = Number(randomPullQuatre);
    }

    if (status) {
      searchCriteria.status = status;
    }

    if (clientID) {
      searchCriteria.clientID = ObjectId(clientID);
    }

    let allDrivers = await Driver.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $lookup: {
          from: "Client",
          localField: "clientID",
          foreignField: "_id",
          as: "clientDetails",
        },
      },
      {
        $unwind: { path: "$clientDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          "clientDetails.motorCarrierName": 1,
          services: 1,
          DOB: 1,
          firstName: 1,
          lastName: 1,
          randomPullQuatre: 1,
          randomPullFlag: 1,
          email: 1,
          licenceNumber: 1,
          sendEmailToDriver: 1,
          sendEmailToClient: 1,
          issueState: 1,
          qbInvoiceID: 1,
          phoneNumber: 1,
          address1: 1,
          address2: 1,
          state: 1,
          city: 1,
          zip: 1,
          startDate: 1,
          expireDate: 1,
          status: 1,
        },
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
      message: "All Drivers Detail fetch successfully.",
      success: true,
      totalCount: allDrivers[0]?.count[0]?.total,
      data: allDrivers[0]?.data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllDrivers;
