const oauthClient = require("../clientURL/oauthClient");
const quickBookToken = require("../../../models/quickbook.token");
const { ObjectId } = require("mongoose").Types;

const generateToken = async (req, res) => {
  try {
    const { url, user_id } = req.body;
    const responseToken = await oauthClient.createToken(url);
    const findOneObject = await quickBookToken.findOne({
      userId: user_id,
    });
    if (findOneObject) {
      findOneObject.set({
        access_token: responseToken.token.access_token,
        refresh_token: responseToken.token.refresh_token,
      });
    } else {
      await quickBookToken.create({
        userId: ObjectId(user_id),
        access_token: responseToken?.token.access_token,
        refresh_token: responseToken?.token.refresh_token,
      });
    }
    return res.status(200).json({
      success: true,
      responseToken: responseToken?.token,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
};

module.exports = generateToken;
