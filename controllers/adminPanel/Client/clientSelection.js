const clientModel = require("../../../models/Client");

const clientListSelection = async (req, res) => {
  try {
    const clientListData = await clientModel.find(
      {},
      { _id: 1, motorCarrierName: 1 }
    );
    return res.status(200).json({
      success: true,
      response: clientListData,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = clientListSelection;
