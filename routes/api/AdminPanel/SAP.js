const createSAP = require("../../../controllers/adminPanel/SAPManager/createSAP");
const getAllSAP = require("../../../controllers/adminPanel/SAPManager/getAllSAP");
const getSAP = require("../../../controllers/adminPanel/SAPManager/getSAP");
const updateSAP = require("../../../controllers/adminPanel/SAPManager/updateSAP");

const router = require("express").Router();

router.post("/createSAP", createSAP);
router.put("/updateSAP/:id", updateSAP);
router.get("/getSAP/:id", getSAP);
router.get("/getSAP", getAllSAP);
module.exports = router;
