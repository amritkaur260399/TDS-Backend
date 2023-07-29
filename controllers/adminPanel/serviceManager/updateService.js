const quickBooksServiceModel = require("../../../models/quickbooks.service");
const { ObjectId } = require("mongoose").Types;

const updateService = async (req, res) => {
  try {
    const response = await quickBooksServiceModel.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = updateService;
