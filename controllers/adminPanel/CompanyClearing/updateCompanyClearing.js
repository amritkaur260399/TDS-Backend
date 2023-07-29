const CompanyClearing = require("../../../models/CompanyClearing");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongoose").Types;

const updateCompanyClearingHouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Data = await CompanyClearing.findOne({ _id: ObjectId(id) });

    if (!Data) {
      res.send({
        message:
          "Company Clearing House id is not valid or Company Clearing House not found",
      });
    }

    const data = req.body;
    const {
      companyName,
      phoneNumber,
      firstName,
      lastName,
      dob,
      ownersDriverLicenseNumber,
      email,
      address,
      FMCSAEmail,
      FMCSAPassword,
      clearingHouseLogin,
      clearingHousePassword,
    } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clearingHousePassword, salt);

    const HouseData = await CompanyClearing.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        companyName,
        phoneNumber,
        firstName,
        lastName,
        dob,
        ownersDriverLicenseNumber,
        email,
        address,
        FMCSAEmail,
        FMCSAPassword,
        clearingHouseLogin,
        clearingHousePassword: hashedPassword,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Company Clearing House updated successfully",
      data: HouseData,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateCompanyClearingHouse;
