const VehiclePrice = require("../../../models/VehiclePrice");
const createError = require("http-errors");

const getVehiclePrices = async (req, res, next) => {
  try {
    const { priceId } = req.query;

    let vehiclePrice;

    if (priceId) {
      vehiclePrice = await VehiclePrice.findOne({ _id: priceId });
    } else {
      vehiclePrice = await VehiclePrice.find();
    }

    res.json({
      message: " Vehicle Prices  fetched successfully.",
      success: true,
      data: vehiclePrice,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getVehiclePrices;
