const quickbookToken = require("../../../models/quickbook.token");
const { ObjectId } = require("mongoose").Types;

const getToken = async (req, res) => {
  try {
    const { id } = req.params;
    const quickBookModelObject = await quickbookToken.findOne({
      userId: ObjectId(id),
    });
    return res.status(200).json({
      success: true,
      authToken: quickBookModelObject,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      err,
    });
  }
};

module.exports = getToken;
