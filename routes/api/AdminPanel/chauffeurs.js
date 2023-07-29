const assignVehicle = require("../../../controllers/adminPanel/chauffeurs/assignVehicle");

const getAllChauffeurs = require("../../../controllers/adminPanel/chauffeurs/getAllChauffeus");
const verifyChauffeurs = require("../../../controllers/adminPanel/chauffeurs/verifyChauffeur");
const getSingleChauffeurs = require("../../../controllers/adminPanel/chauffeurs/getSingleChauffeur");
const UpdateDocuments = require("../../../controllers/adminPanel/chauffeurs/updateDocuments");

const router = require("express").Router();

router.get("/getAllChauffeurs", getAllChauffeurs);

router.put("/verifyChauffeur", verifyChauffeurs);
router.put("/assignVehicle", assignVehicle);
router.get("/:id", getSingleChauffeurs);
router.put("/updateDocuments", UpdateDocuments);

module.exports = router;
