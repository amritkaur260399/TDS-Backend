const Driver = require("../../../models/Driver");

const addDriver = async (req, res) => {
  try {
    const { driverCollection } = req.body;
    const createdDrivers = await Driver.insertMany(driverCollection);
    return res.status(200).json({
      success: true,
      message: "Create driver list successfully.",
      createdDrivers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = addDriver;
