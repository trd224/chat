const express = require("express");
const router = express.Router();
const { userSignUp, userLogin, getAllUsers, getCurrentUsers, getUserById } = require("../controllers/user");
const { authenticate } = require("../middlewares/auth");

router.post("/signup", userSignUp)
router.post("/login", userLogin)

router.get("/all", getAllUsers)
router.get("/current", authenticate, getCurrentUsers)
router.get("/:id", authenticate, getUserById)



module.exports = router;
