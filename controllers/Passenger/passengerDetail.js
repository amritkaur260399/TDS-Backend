const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const Customer = require("../../models/Client");

const passengerDetail = async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id: userId } = req.user;

    const customer = await Customer.findOne(
      { _id: ObjectId(userId) },
      { name: 1, email: 1, role: 1, countryCode: 1, phone: 1 }
    );

    if (!customer)
      throw createError.Unauthorized("Customer details can not be fetched");

    res.status(200).json({
      message: "success",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = passengerDetail;
