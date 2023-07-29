const Chauffeur = require("../../../models/Chauffeur");
const Vehicle = require("../../../models/Vehicle");

const { ObjectId } = require("mongoose").Types;

const assignVehicle = async (req, res, next) => {
  const { chauffeurID, vehicleID } = req.body;

  try {
    await Chauffeur.findOneAndUpdate(
      {
        _id: ObjectId(chauffeurID),
      },
      {
        vehicleId: vehicleID,
      },
      { new: true }
    );

    await Vehicle.findOneAndUpdate(
      {
        _id: ObjectId(vehicleID),
      },
      {
        chauffeur: chauffeurID,
      },
      { new: true }
    );

    res.json({
      message: "Vehicle assigned Successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = assignVehicle;
