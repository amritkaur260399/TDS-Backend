const sapDetailsModal = require("../../../models/SAPDetails");
const { ObjectId } = require("mongoose").Types;

const updateSAP = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await sapDetailsModal.findOneAndUpdate(
      { _id: ObjectId(id) },
      req.body,
      { new: true }
    );
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

module.exports = updateSAP;
