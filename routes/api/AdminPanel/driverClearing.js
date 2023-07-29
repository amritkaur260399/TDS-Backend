const router = require("express").Router();

const createDriverClearing = require("../../../controllers/adminPanel/DriverClearing/createDriverClearing");
const getAllDriverClearing = require("../../../controllers/adminPanel/DriverClearing/getAllDriverClearing");
const singleDriverClearing = require("../../../controllers/adminPanel/DriverClearing/singleDriverClearing");
const deleteDriverClearing = require("../../../controllers/adminPanel/DriverClearing/deleteDriverClearing");
const updateDriverClearing = require("../../../controllers/adminPanel/DriverClearing/updateDriverClearing");

router.post("/", createDriverClearing);
router.get("/", getAllDriverClearing);
router.get("/:id", singleDriverClearing);
router.delete("/:id", deleteDriverClearing);

router.put("/:id", updateDriverClearing);

module.exports = router;
