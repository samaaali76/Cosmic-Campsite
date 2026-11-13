const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { snapshot, saveQuizAttempt, saveMissionActivity } = require("../controllers/progressController");

const router = express.Router();
router.use(requireAuth);
router.get("/", snapshot);
router.post("/quizzes", saveQuizAttempt);
router.post("/missions", saveMissionActivity);

module.exports = router;
