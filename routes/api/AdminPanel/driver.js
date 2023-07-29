const router = require("express").Router();

const createDriver = require("../../../controllers/adminPanel/Driver/createDriver");
const getAllDrivers = require("../../../controllers/adminPanel/Driver/getAllDrivers");
const getSingleDriverDetails = require("../../../controllers/adminPanel/Driver/getSingleDriverDetails");
const deleteDriver = require("../../../controllers/adminPanel/Driver/deleteDriver");
const updateDriver = require("../../../controllers/adminPanel/Driver/updateDriver");
const updateDriverStatus = require("../../../controllers/adminPanel/Driver/driverStatus");
const randomPullDriver = require("../../../controllers/adminPanel/Driver/randomPullDriver");
const randomPushDriver = require("../../../controllers/adminPanel/Driver/randomPushDriver");
const SelectQuatreDriverAndSendEmail = require("../../../controllers/adminPanel/Driver/SelectQuatreDriverAndSendEmail");
const createDrugAndAlcoholTest = require("../../../controllers/adminPanel/Driver/drugAndAlcoholTest/createDrugAndAlcoholTest");
const uploadResultDriverTest = require("../../../controllers/adminPanel/Driver/DriverTestCases/uploadResultDriverTest");
const createDriverTest = require("../../../controllers/adminPanel/Driver/DriverTestCases/CreateDriverTest");

router.post("/driver", createDriver);
router.get("/drivers", getAllDrivers);
router.get("/driver/:id", getSingleDriverDetails);
router.delete("/driver/:id", deleteDriver);

router.put("/driver/:id", updateDriver);
router.put("/driver/:id/status", updateDriverStatus);
router.post("/driver/random/pull/", randomPullDriver);
router.post("/driver/random/push/", randomPushDriver);
router.post("/driver/setQuatre", SelectQuatreDriverAndSendEmail);

// pre employment routes. and follow up
router.post("/driver/create/driverTest", createDriverTest);
router.put("/preEmployment/result/:id", uploadResultDriverTest);

// Drug and Alcohol test
router.post("/driver/create/drugAndAlcoholTest", createDrugAndAlcoholTest);

module.exports = router;
