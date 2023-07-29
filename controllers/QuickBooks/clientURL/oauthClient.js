const QuickBooks = require("intuit-oauth");
const { quickBook } = require("../../../config/keys");

const oauthClient = new QuickBooks({
  clientId: quickBook.clientID,
  clientSecret: quickBook.clientSecret,
  environment: quickBook.environment, // or 'production' for live environment
  redirectUri: quickBook.redirectURL, // Replace with your callback URL
});

module.exports = oauthClient;
