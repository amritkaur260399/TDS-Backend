const Chauffeur = require("../../../models/Chauffeur");
const { ObjectId } = require("mongoose").Types;

const UpdateDocuments = async (req, res, next) => {
  const { licenseStatus, drivingAuthorityStatus, chauffeurId } = req.query;

  try {
    if (licenseStatus) {
      await Chauffeur.findOneAndUpdate(
        { _id: ObjectId(chauffeurId) },
        {
          isDrivingLicenseVerified: licenseStatus,
        },
        { new: true }
      );
    } else if (drivingAuthorityStatus) {
      await Chauffeur.findOneAndUpdate(
        { _id: ObjectId(chauffeurId) },
        {
          istialProofVerified: drivingAuthorityStatus,
        },
        { new: true }
      );
    }

    res.json({
      message: "Document Status Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = UpdateDocuments;
