const adminAuth = require("./auth");
const clients = require("./client");
const drivers = require("./driver");

const vehicle = require("./vehicle");
const rides = require("./rides");
const users = require("./addedUsers");
const SignUpUsers = require("./user");
const companyClearing = require("./companyClearing");
const driverClearing = require("./driverClearing");

const chauffeurs = require("./chauffeurs");
const staff = require("./staff");
const stripe = require("./stripe");
const stripeCheckout = require("./stripeCheckout");

const customerFeedback = require("./customerfeedback");
const vehiclePrices = require("./vehiclePrices");

const getAnalytics = require("../../../controllers/adminPanel/getAnalytics");
const getAdminUser = require("../../../controllers/adminPanel/me");
const validateAccessToken = require("../../../middlewares/jwtValidation");
const servicesEndpoint = require("./servicesManager");

const SAP = require("./SAP");

const router = require("express").Router();

router.use("/auth", adminAuth);
router.use("/vehicles", vehicle);
router.use("/rides", rides);
router.use("/drivers", drivers);
router.use("/users", users);
router.use("/companyClearings", companyClearing);
router.use("/driverClearings", driverClearing);
router.use("/SignUpUsers", SignUpUsers);
router.use("/services", servicesEndpoint);
router.use("/sap", SAP);

router.use("/clients", clients);

router.use("/chauffeurs", chauffeurs);

router.use("/stripe", stripe);
router.use("/stripeCheckout", stripeCheckout);

router.use("/passenger", customerFeedback);
router.use("/staff", staff);
router.use("/prices", vehiclePrices);

router.get("/getAnalytics", getAnalytics);

router.get("/me", validateAccessToken, getAdminUser);

// router.post("/createVehicle", createVehicle);
// router.post("/createRide", createRide);

module.exports = router;
