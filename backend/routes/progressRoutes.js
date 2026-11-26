const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { snapshot, saveQuizAttempt, clearQuizAttempts, saveMissionActivity } = require("../controllers/progressController");

const router = express.Router();
router.use(requireAuth);
router.get("/", snapshot);
router.post("/quizzes", saveQuizAttempt);
router.delete("/quizzes", clearQuizAttempts);
router.post("/missions", saveMissionActivity);

module.exports = router;
