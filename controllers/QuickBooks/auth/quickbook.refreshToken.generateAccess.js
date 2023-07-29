const quickBookToken = require("../../../models/quickbook.token");
const oauthClient = require("../clientURL/oauthClient");
const { ObjectId } = require("mongoose").Types;

const generateAccessTokenWithRefresh = async (req, res) => {
  try {
    const { refresh_token, user_id } = req.body;
    const authCredential = await oauthClient.refreshUsingToken(refresh_token);
    const getLatestToken = await quickBookToken.findOneAndUpdate(
      {
        userId: ObjectId(user_id),
      },
      {
        access_token: authCredential.token.access_token,
        refresh_token: authCredential.token.refresh_token,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      getLatestToken,
      message: "Token generated successfully.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong.",
      error,
    });
  }
};

module.exports = generateAccessTokenWithRefresh;
