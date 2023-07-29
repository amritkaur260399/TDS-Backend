const { ObjectId } = require("mongoose").Types;
const Client = require("../../../models/Client");

const getSingleClientDetails = async (req, res, next) => {
  const { id } = req.params;
  const data = await Client.findOne({ _id: ObjectId(id) });

  if (!data) {
    res.send({ message: "Client id is not valid or Client not found" });
  }
  try {
    const ClientDetails = await Client.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $lookup: {
          from: "ClientNote",
          localField: "_id",
          foreignField: "clientId",
          as: "clientNotes",
        },
      },
      {
        $lookup: {
          from: "Driver",
          localField: "_id",
          foreignField: "clientID",
          as: "drivers",
        },
      },
    ]);

    return res.json({
      message: "Client detail fetch successfully",
      success: true,
      data: ClientDetails[0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getSingleClientDetails;
