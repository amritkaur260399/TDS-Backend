const oauthClient = require("../clientURL/oauthClient");

const clientRefresh = async (req, res) => {
  try {
    const clientRefetch = await oauthClient.refresh();
    return res.status(200).json({
      success: true,
      clientRefetch: clientRefetch?.token,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(404).json({
      success: false,
      err,
    });
  }
};

module.exports = clientRefresh;
