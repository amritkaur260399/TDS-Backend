const router = require("express").Router();
const quickBooksLogin = require("../../../controllers/QuickBooks/auth/quickBook.login");
const clientRefresh = require("../../../controllers/QuickBooks/auth/quickbook.clientRefresh");
const generateToken = require("../../../controllers/QuickBooks/auth/quickbook.generateToken");
const getToken = require("../../../controllers/QuickBooks/auth/quickbook.getToken");
const generateAccessTokenWithRefresh = require("../../../controllers/QuickBooks/auth/quickbook.refreshToken.generateAccess");
const createCustomer = require("../../../controllers/QuickBooks/customer/createCustomer");
const queryCustomer = require("../../../controllers/QuickBooks/customer/queryCustomer");
const createInvoice = require("../../../controllers/QuickBooks/invoice/createInvoice");
const updateInvoice = require("../../../controllers/QuickBooks/invoice/updateInvoice");
const quickBooksMiddleware = require("../../../middlewares/quickBooksMiddleware");

router.get("/login", quickBooksLogin);
router.post("/generate/token", generateToken);
router.get("/get/token/:id", getToken);
router.post("/generate/token/use/refresh", generateAccessTokenWithRefresh);
router.get("/client/refetch", clientRefresh);

router.post("/createCustomer", quickBooksMiddleware, createCustomer);
router.post("/queryCustomer", quickBooksMiddleware, queryCustomer);

router.post("/createInvoice", quickBooksMiddleware, createInvoice);
router.put("/updateInvoice", quickBooksMiddleware, updateInvoice);

module.exports = router;
