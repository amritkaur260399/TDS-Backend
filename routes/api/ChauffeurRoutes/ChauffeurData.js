const router = require("express").Router();

const getBankDetails = require("../../../controllers/Chauffeurs/bankDetails");
const getAllRides = require("../../../controllers/Chauffeurs/getAllRides");
const getNotifications = require("../../../controllers/Chauffeurs/getNotifications");
const getChauffeursData = require("../../../controllers/Chauffeurs/me/getChauffeursData");
const saveNotificationToken = require("../../../controllers/Chauffeurs/me/saveNotifToken");
const updateRide = require("../../../controllers/Chauffeurs/updateRide");

router.get("/me", getChauffeursData);
router.get("/bankDetails", getBankDetails);
router.get("/getAllRides", getAllRides);
router.put("/updateRide", updateRide)

router.put("/notifToken", saveNotificationToken)

router.get("/notifications", getNotifications)

module.exports = router;
