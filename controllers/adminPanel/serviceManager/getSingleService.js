const quickBooksServiceModel = require("../../../models/quickbooks.service");
const { ObjectId } = require("mongoose").Types;

const getSingleService = async (req, res) => {
  try {
    const response = await quickBooksServiceModel.findOne({
      _id: ObjectId(req.params.id),
    });
    return res.status(200).json({
      success: true,
      message: "Get all services successfully",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Service id not found.",
    });
  }
};

module.exports = getSingleService;
