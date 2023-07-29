// const path = require("path");
// require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: "/home/ubuntu/TDS-Backend/.env" });
module.exports = {
  host: {
    port: process.env.PORT || 5000,
    hostIP: process.env.HOST || "127.0.0.1",

    // hostIP: process.env.HOST || "localhost",
    // "192.168.225.54",
  },
  emailverifyKey: {
    initVector: process.env.EMAILVERIFY_INIT_VECTOR,
    securitykey: process.env.SECURITY_KEY,
  },
  app: {
    name: "CityTaxi Backend",
    serverURL: process.env.BASE_SERVER_URL,
    apiURL: process.env.BASE_API_URL,
    clientURL: process.env.BASE_CLIENT_URL,
  },
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME,
    fileURL: `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}`,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sesSenderAddress: "harish.chaudhary@simbaquartz.com",
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  database: process.env.DB_CONNECT,
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishedKey: process.env.STRIPE_PUBLISHED_KEY,
  },
  quickBook: {
    clientID: process.env.QUICKBOOKS_CLIENT_ID,
    clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
    realmID:
      process.env.NODE_ENV === "test"
        ? process.env.QUICKBOOKS_REALM_ID_TEST
        : process.env.QUICKBOOKS_REALM_ID_PRODUCTION,
    redirectURL: process.env.QUICKBOOKS_REDIRECT_URL,
    state: process.env.QUICKBOOKS_STATE,
    environment:
      process.env.NODE_ENV === "test"
        ? process.env.QUICKBOOKS_ENVIRONMENT_TEST
        : process.env.QUICKBOOKS_ENVIRONMENT_PRODUCTION,
    quickBookBaseURL:
      process.env.NODE_ENV === "test"
        ? process.env.QUICKBOOKS_BASEURL_TEST
        : process.env.QUICKBOOKS_BASEURL_PRODUCTION,
    quickBookBaseRedirectURL:
      process.env.NODE_ENV === "test"
        ? process.env.QUICKBOOKS_REDIRECT_TEST
        : process.env.QUICKBOOKS_REDIRECT_PRODUCTION,
    minorVersion: process.env.QUICKBOOKS_MINORVERSION,
  },
};
