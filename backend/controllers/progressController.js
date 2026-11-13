function snapshot(req, res) {
  const user = req.user;
  res.json({
    quizAttempts: [...(user.quizAttempts || [])].reverse(),
    missionHistory: [...(user.missionHistory || [])].reverse(),
    profile: { name: user.displayName, avatar: user.avatarDataUrl || "" }
  });
}

async function saveQuizAttempt(req, res, next) {
  try {
    const score = Number(req.body.score);
    const total = Number(req.body.total);
    const level = String(req.body.level || "Explorer").slice(0, 20);
    if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || total > 100 || score < 0 || score > total) {
      return res.status(400).json({ message: "Quiz result is invalid." });
    }
    const topics = req.body.topics && typeof req.body.topics === "object" ? req.body.topics : {};
    const attempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      level,
      score,
      total,
      percentage: Math.round(score / total * 100),
      topics
    };
    req.user.quizAttempts.push(attempt);
    req.user.quizAttempts = req.user.quizAttempts.slice(-50);
    await req.user.save();
    res.status(201).json({ attempt });
  } catch (error) { next(error); }
}

async function saveMissionActivity(req, res, next) {
  try {
    const id = String(req.body.id || "");
    const name = String(req.body.name || "").trim().slice(0, 80);
    const planet = String(req.body.planet || "Deep space").trim().slice(0, 120);
    const requestedStatus = req.body.status;
    if (!/^[a-z0-9-]{2,60}$/i.test(id) || !name || !["Explored", "Completed"].includes(requestedStatus)) {
      return res.status(400).json({ message: "Mission activity is invalid." });
    }
    const existing = req.user.missionHistory.find((entry) => entry.id === id);
    const activity = {
      id,
      name,
      planet,
      status: requestedStatus === "Completed" || existing?.status === "Completed" ? "Completed" : "Explored",
      date: new Date().toISOString()
    };
    if (existing) Object.assign(existing, activity);
    else req.user.missionHistory.push(activity);
    req.user.missionHistory = req.user.missionHistory.slice(-100);
    await req.user.save();
    res.status(200).json({ activity });
  } catch (error) { next(error); }
}

module.exports = { snapshot, saveQuizAttempt, saveMissionActivity };
