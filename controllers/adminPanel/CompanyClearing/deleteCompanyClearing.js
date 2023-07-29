const CompanyClearing = require("../../../models/CompanyClearing");

const { ObjectId } = require("mongoose").Types;

const deleteClearingHouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await CompanyClearing.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({
        message:
          "Company Clearing House id is not valid or Company Clearing House not found",
      });
    }

    await CompanyClearing.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "Company Clearing House deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteClearingHouse;
