const clientModel = require("../../../models/Client");
const driverModel = require("../../../models/Driver");

const getAllDashboardCount = async (req, res) => {
  try {
    const clientCount = await clientModel.countDocuments();
    const driverCount = await driverModel.countDocuments();
    const randomDriverCount = await driverModel.countDocuments({
      randomPullFlag: true,
    });
    return res.status(200).json({
      success: true,
      data: {
        clientCount,
        driverCount,
        randomDriverCount,
        urineTest: 0,
        breathTest: 0,
        hairTest: 0,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = getAllDashboardCount;
