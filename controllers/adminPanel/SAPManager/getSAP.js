const sapDetailsModal = require("../../../models/SAPDetails");
const { ObjectId } = require("mongoose").Types;

const getSAP = async (req, res) => {
  try {
    const response = await sapDetailsModal.find({
      _id: ObjectId(req.params.id),
    });
    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = getSAP;
