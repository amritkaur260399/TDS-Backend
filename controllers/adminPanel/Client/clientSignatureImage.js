const ClientModal = require("../../../models/Client");
const { ObjectId } = require("mongoose").Types;

const clientSignatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const createSignature = await ClientModal.findByIdAndUpdate(
      {
        _id: ObjectId(id),
      },
      { signatureImage: req.body.signatureImage },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Signature captured successfully.",
      createSignature,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
      error,
    });
  }
};

module.exports = clientSignatureImage;
