const router = require("express").Router();
const adminPanel = require("./AdminPanel");
const passenger = require("./PassengerRoutes/index");
const chauffeurRoutes = require("./ChauffeurRoutes/index");
const getCountryCode = require("../../controllers/Extras/getCountryCode");
const validateAccessToken = require("../../middlewares/jwtValidation");
const getConversations = require("../../controllers/Conversation/getConversations");
const sendMessage = require("../../controllers/Conversation/sendMessage");
const getMessages = require("../../controllers/Conversation/getMessages");
const verifyOTP = require("../../controllers/auth/PassengerAuth/verifiyOTP");
const getFlightDetails = require("../../controllers/FlightDetails/getFlightDetails");
const getAllDashboardCount = require("../../controllers/adminPanel/DashboardCount/getAllDashboardCount");
const quickBooksRoute = require("./QuickbooksRoutes/index");
const uploadImage = require("../../controllers/uploadImage");

router.use("/adminPanel", adminPanel);
router.use("/chauffeur", chauffeurRoutes);
router.use("/quickBooks", quickBooksRoute);
router.use("/passenger", passenger);
router.get("/countryCode", getCountryCode);
router.get("/getConversations", validateAccessToken, getConversations);
router.post("/sendMessage", validateAccessToken, sendMessage);
router.get("/getMessages", validateAccessToken, getMessages);
router.post("/verifyOtp", verifyOTP);
router.get("/getFlightDetails", getFlightDetails);
router.get("/getAll/dashboardCount", getAllDashboardCount);
router.post("/upload/image", uploadImage);
router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
