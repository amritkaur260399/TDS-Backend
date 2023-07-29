const quickBooksServiceModel = require("../../../models/quickbooks.service");

const getAllService = async (req, res) => {
  try {
    const response = await quickBooksServiceModel.find();
    return res.status(200).json({
      success: true,
      message: "Get all services successfully",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = getAllService;
