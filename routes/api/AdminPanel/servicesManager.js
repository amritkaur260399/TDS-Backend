const createService = require("../../../controllers/adminPanel/serviceManager/createService");
const deleteService = require("../../../controllers/adminPanel/serviceManager/deleteService");
const getAllService = require("../../../controllers/adminPanel/serviceManager/getAllService");
const getSingleService = require("../../../controllers/adminPanel/serviceManager/getSingleService");
const updateService = require("../../../controllers/adminPanel/serviceManager/updateService");
const validateAccessToken = require("../../../middlewares/jwtValidation");

const router = require("express").Router();

router.post("/create", createService);
router.put("/update/:id", updateService);
router.get("/getall", getAllService);
router.get("/getSingle/:id", getSingleService);
router.delete("/delete/:id", deleteService);

module.exports = router;
