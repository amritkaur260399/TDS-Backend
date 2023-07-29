const router = require("express").Router();

const createRide = require("../../../controllers/adminPanel/Rides/createRide");
const getAllRides = require("../../../controllers/adminPanel/Rides/getAllRides");
const getSingleRideDetails = require("../../../controllers/adminPanel/Rides/getSingleRideDetails");
const deleteRide = require("../../../controllers/adminPanel/Rides/deleteRide");
const updateRide = require("../../../controllers/adminPanel/Rides/updateRide");

router.post("/createRide", createRide);
router.get("/getAllRides", getAllRides);
router.get("/getSingleRideDetails", getSingleRideDetails);
router.delete("/:id", deleteRide);

router.put("/updateRide", updateRide);

module.exports = router;
