const { ObjectId } = require("mongoose").Types;
const Driver = require("../../../models/Driver");

const getSingleDriverDetails = async (req, res, next) => {
  const { id } = req.params;

  const data = await Driver.findOne({ _id: ObjectId(id) });

  if (!data) {
    res.send({ message: "Driver id is not valid or Driver not found" });
  }
  try {
    const DriverDetails = await Driver.aggregate([
      {
        $match: { _id: ObjectId(id) },
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
          randomPullFlag: 1,
          qbInvoiceID: 1,
          randomPullQuatre: 1,
          email: 1,
          preEmploymentFlag: 1,
          clientID: 1,
          firstName: 1,
          lastName: 1,
          media: 1,
          phoneNumber: 1,
          DOB: 1,
          licenceNumber: 1,
          issueState: 1,
          address1: 1,
          address2: 1,
          state: 1,
          city: 1,
          zip: 1,
          startDate: 1,
          expireDate: 1,
          status: 1,
          sendEmailToDriver: 1,
          sendEmailToClient: 1,
        },
      },
      {
        $lookup: {
          from: "DriverTestCases",
          localField: "_id",
          foreignField: "driverId",
          as: "testCaseData",
        },
      },
      {
        $addFields: {
          driverPreEmployments: {
            $filter: {
              input: "$testCaseData",
              as: "testCase",
              cond: { $eq: ["$$testCase.type", "PreEmployee"] },
            },
          },
        },
      },
      {
        $addFields: {
          driverFollowUpDrugTests: {
            $filter: {
              input: "$testCaseData",
              as: "testCase",
              cond: { $eq: ["$$testCase.type", "FollowUp"] },
            },
          },
        },
      },
      {
        $lookup: {
          from: "DriverDrugAndAlcohol",
          localField: "_id",
          foreignField: "driverId",
          as: "driverDrugAndAlcohols",
        },
      },
    ]);

    return res.json({
      message: "Driver detail fetch successfully",
      success: true,
      data: DriverDetails[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getSingleDriverDetails;
