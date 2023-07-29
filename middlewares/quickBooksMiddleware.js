const oauthClient = require("../controllers/QuickBooks/clientURL/oauthClient");
const quickBooksTokenModel = require("../models/quickbook.token");
const { ObjectId } = require("mongoose").Types;
const authURL = require("../controllers/QuickBooks/clientURL/authURL");
const createError = require("http-errors");

const quickBooksMiddleware = async (req, res, next) => {
  try {
    const { qb_admin } = req.body;
    const getToken = await quickBooksTokenModel.findOne({
      userId: ObjectId(qb_admin),
    });
    if (getToken) {
      try {
        const authCredential = await oauthClient.refreshUsingToken(
          getToken.refresh_token
        );
        const getLatestToken = await quickBooksTokenModel.findOneAndUpdate(
          {
            userId: ObjectId(qb_admin),
          },
          {
            access_token: authCredential.token.access_token,
            refresh_token: authCredential.token.refresh_token,
          },
          { new: true }
        );
        req.middlewareData = getLatestToken.access_token;
        return next();
      } catch (error) {
        return next(
          createError.Unauthorized({
            success: false,
            authURL,
          })
        );
      }
    } else {
      return next(
        createError.Unauthorized({
          success: false,
          authURL,
        })
      );
    }
  } catch (error) {
    return next(
      createError.Unauthorized({
        success: false,
        authURL,
      })
    );
  }
};

module.exports = quickBooksMiddleware;
