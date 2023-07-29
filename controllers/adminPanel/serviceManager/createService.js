const quickBooksServiceModel = require("../../../models/quickbooks.service");

const createService = async (req, res) => {
  try {
    const response = await quickBooksServiceModel.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Service created successfully.",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = createService;
