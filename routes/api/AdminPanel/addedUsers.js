const router = require("express").Router();

const getAllUsers = require("../../../controllers/adminPanel/AddedUser/getAllUsers");
const getSingleUserDetails = require("../../../controllers/adminPanel/AddedUser/getSingleUserDetails");
const deleteUser = require("../../../controllers/adminPanel/AddedUser/deleteUser");
const updateUser = require("../../../controllers/adminPanel/AddedUser/updateUser");
const addUserFinal = require("../../../controllers/adminPanel/AddedUser/addUserFinal");
const existingUserForAdd = require("../../../controllers/adminPanel/AddedUser/existingUserForAdd");
const validateAccessToken = require("../../../middlewares/jwtValidation");
const createPasswordByUser = require("../../../controllers/adminPanel/AddedUser/createPasswordByUser");

router.post("/user", validateAccessToken, existingUserForAdd);
router.get("/users", validateAccessToken, getAllUsers);
router.get("/user/:id", validateAccessToken, getSingleUserDetails);
router.delete("/user/:id", validateAccessToken, deleteUser);
router.put("/user/:id", validateAccessToken, updateUser);
router.post("/finally/addUser", addUserFinal);
router.post("/user/create/password", createPasswordByUser);
module.exports = router;
