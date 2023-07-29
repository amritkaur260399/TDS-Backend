const authURL = require("../clientURL/authURL");

const quickBooksLogin = (req, res) => {
  return res.status(200).json({
    success: true,
    authURL,
  });
};

module.exports = quickBooksLogin;
