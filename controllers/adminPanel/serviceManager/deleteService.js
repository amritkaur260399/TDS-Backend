const quickBooksServiceModel = require("../../../models/quickbooks.service");

const deleteService = async (req, res) => {
  try {
    const deleteService = await quickBooksServiceModel.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Service id not found to delete.",
      error,
    });
  }
};

module.exports = deleteService;
