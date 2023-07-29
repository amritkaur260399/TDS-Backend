const ClientNoteModel = require("../../../models/clientNotes");

const deleteClientNote = async (req, res) => {
  try {
    await ClientNoteModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Client note deleted successfully",
    });
  } catch {
    return res.status(404).json({
      success: false,
      message: "Please use a valid client note.",
    });
  }
};

module.exports = deleteClientNote;
