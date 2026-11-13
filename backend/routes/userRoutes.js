const express = require("express");
const { register, login, currentUser, updateProfile } = require("../controllers/userController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, currentUser);
router.patch("/profile", requireAuth, updateProfile);

module.exports = router;
