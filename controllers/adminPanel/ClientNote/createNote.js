const ClientNoteModel = require("../../../models/clientNotes");

const clientCreateNoteController = async (req, res) => {
  try {
    const createdNote = await ClientNoteModel.create(req.body);
    return res.status(200).json({
      success: true,
      createdNote,
      message: "Note created successfully",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "something went wrong.",
    });
  }
};

module.exports = clientCreateNoteController;
