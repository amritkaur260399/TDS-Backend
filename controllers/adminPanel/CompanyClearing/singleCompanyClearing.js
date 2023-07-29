const { ObjectId } = require("mongoose").Types;
const CompanyClearing = require("../../../models/CompanyClearing");

const getSingleCompanyClearingDetails = async (req, res, next) => {
  const { id } = req.params;

  const data = await CompanyClearing.findOne({ _id: ObjectId(id) });

  if (!data) {
    res.send({
      message:
        "Company Clearing House id is not valid or Company Clearing House not found",
    });
  }
  try {
    const ClearingHouse = await CompanyClearing.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
    ]);

    res.json({
      message: "Single Company Clearing House fetch successfully",
      success: true,
      data: ClearingHouse[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getSingleCompanyClearingDetails;
