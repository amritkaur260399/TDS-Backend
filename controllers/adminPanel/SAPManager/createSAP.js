const sapDetailsModal = require("../../../models/SAPDetails");

const createSAP = async (req, res) => {
  try {
    const response = await sapDetailsModal.create(req.body);
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

module.exports = createSAP;
