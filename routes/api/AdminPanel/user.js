const router = require("express").Router();

const createUser = require("../../../controllers/adminPanel/SignUpUser/postSignUpUser");
// const getAllUsers = require("../../../controllers/adminPanel/AddedUser/getAllUsers");
// const getSingleUserDetails = require("../../../controllers/adminPanel/AddedUser/getSingleUserDetails");
// const deleteUser = require("../../../controllers/adminPanel/AddedUser/deleteUser");
// const updateUser = require("../../../controllers/adminPanel/AddedUser/updateUser");

router.post("/", createUser);
// router.get("/users", getAllUsers);
// router.get("/user/:id", getSingleUserDetails);
// router.delete("/user/:id", deleteUser);

// router.put("/user/:id", updateUser);

module.exports = router;
