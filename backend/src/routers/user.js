const express = require("express");
const router = express.Router();
const { userSignUp, userLogin, getAllUsers, getCurrentUser, getUserById } = require("../controllers/user");
const { authenticate } = require("../middlewares/auth");

router.post("/signup", userSignUp)
router.post("/login", userLogin)
router.get("/all", authenticate, getAllUsers)
router.get("/current", authenticate, getCurrentUser)
router.get("/:id", authenticate, getUserById)



module.exports = router;
