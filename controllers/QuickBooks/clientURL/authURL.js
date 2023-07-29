const QuickBooks = require("intuit-oauth");
const oauthClient = require("./oauthClient");
const { state } = require("../../../config/keys").quickBook;

const authURL = oauthClient.authorizeUri({
  scope: [QuickBooks.scopes.Accounting],
  state: state,
});

module.exports = authURL;
