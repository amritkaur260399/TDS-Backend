const AdditionalPrice = require("../../../models/AdditionalPrice");

const createError = require("http-errors");

const getAdditionalPrices = async (req, res, next) => {
  try {
    const { priceId } = req.query;

    let additionalPrice;

    if (priceId) {
      additionalPrice = await AdditionalPrice.findOne({ _id: priceId });
    } else {
      additionalPrice = await AdditionalPrice.find();
    }

    res.json({
      message: " Vehicle Prices  fetched successfully.",
      success: true,
      data: additionalPrice,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAdditionalPrices;
