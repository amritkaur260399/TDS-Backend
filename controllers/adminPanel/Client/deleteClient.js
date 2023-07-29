const Client = require("../../../models/Client");

const { ObjectId } = require("mongoose").Types;

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Client.findOne({ _id: ObjectId(id) });

    if (!data) {
      res.send({ message: "Client id is not valid or Client not found" });
    }

    await Client.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteClient;
