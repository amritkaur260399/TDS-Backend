const router = require("express").Router();

const createCompanyClearing = require("../../../controllers/adminPanel/CompanyClearing/createCompanyClearing");
const getAllCompanyClearing = require("../../../controllers/adminPanel/CompanyClearing/getAllCompanyClearing");
const singleCompanyClearing = require("../../../controllers/adminPanel/CompanyClearing/singleCompanyClearing");
const deleteCompanyClearing = require("../../../controllers/adminPanel/CompanyClearing/deleteCompanyClearing");
const updateCompanyClearing = require("../../../controllers/adminPanel/CompanyClearing/updateCompanyClearing");

router.post("/clearing", createCompanyClearing);
router.get("/", getAllCompanyClearing);
router.get("/:id", singleCompanyClearing);
router.delete("/:id", deleteCompanyClearing);

router.put("/:id", updateCompanyClearing);

module.exports = router;
