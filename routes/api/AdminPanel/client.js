const router = require("express").Router();

const createClient = require("../../../controllers/adminPanel/Client/createClient");
const getAllClients = require("../../../controllers/adminPanel/Client/getAllClients");
const getSingleClientDetails = require("../../../controllers/adminPanel/Client/getSingleClientDetails");
const deleteClient = require("../../../controllers/adminPanel/Client/deleteClient");
const updateClient = require("../../../controllers/adminPanel/Client/updateClient");
const clientCreateNoteController = require("../../../controllers/adminPanel/ClientNote/createNote");
const deleteClientNote = require("../../../controllers/adminPanel/ClientNote/deleteNote");
const clientSignatureImage = require("../../../controllers/adminPanel/Client/clientSignatureImage");
const clientSelection = require("../../../controllers/adminPanel/Client/clientSelection");

router.post("/client", createClient);
router.get("/clients", getAllClients);
router.get("/client/:id", getSingleClientDetails);
router.delete("/client/:id", deleteClient);
router.put("/client/:id", updateClient);
router.put("/capture/signature/:id", clientSignatureImage);
router.get("/selection", clientSelection);

// additional routes
router.post("/create/note", clientCreateNoteController);
router.delete("/delete/note/:id", deleteClientNote);

module.exports = router;
