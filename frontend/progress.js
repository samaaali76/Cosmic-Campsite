const accountKey = (name) => window.CosmicAccount?.storageKey(name) || name;
const QUIZ_KEY = accountKey("cosmic-campsite-quiz-attempts");
const MISSION_KEY = accountKey("cosmic-campsite-mission-history");
const PROFILE_KEY = accountKey("cosmic-campsite-explorer-profile");
const BADGES_KEY = accountKey("cosmic-campsite-earned-badges");
const attemptList = document.querySelector("#attempt-list");
const attemptCount = document.querySelector("#attempt-count");
const correctCount = document.querySelector("#correct-count");
const accuracyValue = document.querySelector("#average-score");
const bestScore = document.querySelector("#best-score");
const missionLog = document.querySelector("#mission-log");
const missionEmpty = document.querySelector("#mission-empty");
const emptyState = document.querySelector("#progress-empty");
const clearButton = document.querySelector("#clear-history");

function readList(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderQuizHistory() {
  const attempts = readList(QUIZ_KEY)
    .filter((entry) => entry && Number.isFinite(Number(entry.percentage)))
    .sort((first, second) => new Date(second.date) - new Date(first.date));
  const totalCorrect = attempts.reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
  const totalQuestions = attempts.reduce((sum, entry) => sum + (Number(entry.total) || 0), 0);
  attemptCount.textContent = String(attempts.length);
  document.querySelector("#quiz-count-label").textContent = `${attempts.length} ${attempts.length === 1 ? "quiz" : "quizzes"}`;
  correctCount.textContent = String(totalCorrect);
  accuracyValue.textContent = totalQuestions ? `${Math.round(totalCorrect / totalQuestions * 100)}%` : "—";
  bestScore.textContent = attempts.length ? `${Math.max(...attempts.map((entry) => Number(entry.percentage) || 0))}%` : "—";
  emptyState.hidden = attempts.length > 0;
  clearButton.hidden = attempts.length === 0;
  attemptList.innerHTML = attempts.slice(0, 8).map((entry) => {
    const topics = Object.entries(entry.topics || {}).map(([topic, result]) => `<span>${safeText(topic)}: ${Number(result.correct) || 0}/${Number(result.total) || 0}</span>`).join("");
    return `<article class="attempt-card"><div><h3>${safeText(entry.level || "Space")} clearance</h3><p>${formatDate(entry.date)} · ${Number(entry.score) || 0}/${Number(entry.total) || 0} correct</p></div><strong class="attempt-score">${Number(entry.percentage)}%</strong>${topics ? `<div class="attempt-topics" aria-label="Topic results">${topics}</div>` : ""}</article>`;
  }).join("");
}

function renderMissionHistory() {
  const history = readList(MISSION_KEY).sort((first, second) => new Date(second.date) - new Date(first.date));
  document.querySelector("#mission-count").textContent = `${history.length} ${history.length === 1 ? "mission" : "missions"}`;
  missionEmpty.hidden = history.length > 0;
  missionLog.innerHTML = history.map((mission) => {
    const completed = mission.status === "Completed";
    return `<article class="mission-log-card"><span class="mission-log-icon" aria-hidden="true">${completed ? "✦" : "◉"}</span><div><h3>${safeText(mission.name)}</h3><p>${safeText(mission.planet || "Deep space")} · ${formatDate(mission.date)}</p></div><span class="mission-status ${completed ? "is-completed" : ""}">${completed ? "Completed" : "Explored"}</span></article>`;
  }).join("");
  const latestPlanet = history[0]?.planet;
  document.querySelector("#home-world").textContent = latestPlanet || "Awaiting first mission";
}

function renderExplorerProfile() {
  const attempts = readList(QUIZ_KEY);
  const missions = readList(MISSION_KEY);
  const completedMissions = missions.filter((mission) => mission.status === "Completed").length;
  const best = attempts.reduce((value, entry) => Math.max(value, Number(entry.percentage) || 0), 0);
  const xp = missions.reduce((sum, mission) => sum + (mission.status === "Completed" ? 100 : 40), 0)
    + attempts.reduce((sum, entry) => sum + (Number(entry.score) || 0) * 8, 0)
    + (best === 100 ? 50 : 0);
  const ranks = [
    { name: "Rookie Explorer", min: 0, next: 200 },
    { name: "Space Cadet", min: 200, next: 500 },
    { name: "Orbit Ranger", min: 500, next: 1000 },
    { name: "Cosmic Legend", min: 1000, next: 1000 }
  ];
  const rank = [...ranks].reverse().find((candidate) => xp >= candidate.min) || ranks[0];
  const fill = rank.next === rank.min ? 100 : Math.min(100, Math.round((xp - rank.min) / (rank.next - rank.min) * 100));
  document.querySelector("#explorer-rank").textContent = rank.name;
  document.querySelector("#rank-progress-fill").style.width = `${fill}%`;
  const progress = document.querySelector(".rank-track");
  progress.setAttribute("aria-valuenow", String(fill));
  document.querySelector("#rank-progress-copy").textContent = rank.name === "Cosmic Legend" ? `${xp} XP · The stars know your name.` : `${xp} XP · ${rank.next - xp} XP to ${ranks[ranks.indexOf(rank) + 1].name}.`;

  const definitions = [
    { id: "first-contact", name: "First Contact", icon: "◉", detail: "Explore your first mission", earned: missions.length > 0 },
    { id: "mission-specialist", name: "Mission Specialist", icon: "✦", detail: "Complete 3 mission debriefs", earned: completedMissions >= 3 },
    { id: "quiz-cadet", name: "Quiz Cadet", icon: "⌖", detail: "Finish your first quiz", earned: attempts.length > 0 },
    { id: "perfect-orbit", name: "Perfect Orbit", icon: "✧", detail: "Score 100% on a quiz", earned: best === 100 }
  ];
  const earnedIds = definitions.filter((badge) => badge.earned).map((badge) => badge.id);
  let previousIds = null;
  try { previousIds = JSON.parse(localStorage.getItem(BADGES_KEY)); } catch { /* Treat malformed data as a first visit. */ }
  if (Array.isArray(previousIds)) {
    const unlocked = definitions.find((badge) => badge.earned && !previousIds.includes(badge.id));
    if (unlocked) showAchievement(`Badge unlocked: ${unlocked.name}`);
  }
  try { localStorage.setItem(BADGES_KEY, JSON.stringify(earnedIds)); } catch { /* Badges still render if storage is unavailable. */ }
  document.querySelector("#badge-grid").innerHTML = definitions.map((badge) => `<article class="badge-card ${badge.earned ? "is-earned" : ""}" aria-label="${badge.name}: ${badge.earned ? "earned" : badge.detail}"><span class="badge-icon" aria-hidden="true">${badge.icon}</span><strong>${badge.name}</strong><small>${badge.earned ? "Badge earned" : `Locked · ${badge.detail}`}</small></article>`).join("");
}

const journeyStages = [
  { id: "moon", name: "The Moon", icon: "☾", subtitle: "First steps beyond Earth", unlockAt: 0, missions: ["apollo-11", "artemis-i"] },
  { id: "mars", name: "Mars", icon: "♂", subtitle: "The red frontier", unlockAt: 1, missions: ["curiosity", "perseverance"] },
  { id: "deep-space", name: "Deep Space", icon: "✧", subtitle: "Beyond our solar system", unlockAt: 3, missions: ["voyager-1", "new-horizons"] },
  { id: "observatory", name: "The Observatories", icon: "◎", subtitle: "A wider view of the cosmos", unlockAt: 5, missions: ["hubble", "james-webb"] }
];

function renderJourneyRoute() {
  const missions = window.COSMIC_MISSIONS || [];
  const history = readList(MISSION_KEY);
  const completedCount = history.filter((item) => item.status === "Completed").length;
  document.querySelector("#journey-route").innerHTML = journeyStages.map((stage, index) => {
    const locked = completedCount < stage.unlockAt;
    const cards = stage.missions.map((id) => {
      const mission = missions.find((item) => item.id === id);
      if (!mission) return "";
      const activity = history.find((item) => item.id === id);
      const statusClass = activity?.status === "Completed" ? "is-completed" : activity ? "is-explored" : "";
      const statusIcon = activity?.status === "Completed" ? "✓" : activity ? "◉" : "↗";
      return `<a class="journey-mission-link ${statusClass} ${locked ? "is-locked" : ""}" href="missions.html?mission=${encodeURIComponent(id)}" ${locked ? 'aria-disabled="true" tabindex="-1"' : ""}><span>${safeText(mission.title)}</span><span aria-hidden="true">${locked ? "🔒" : statusIcon}</span></a>`;
    }).join("");
    const stageHistory = stage.missions.map((id) => history.find((item) => item.id === id)).filter(Boolean);
    const stageDone = stageHistory.length > 0 && stageHistory.every((item) => item.status === "Completed");
    const stageCurrent = !locked && stageHistory.length > 0 && !stageDone;
    const stageStatus = locked ? `Unlock after ${stage.unlockAt} completed mission${stage.unlockAt === 1 ? "" : "s"}` : stageDone ? "Destination cleared" : stageCurrent ? "Current destination" : "Ready to explore";
    return `<article class="journey-stop ${locked ? "is-locked" : ""} ${stageCurrent ? "is-current" : ""}"><div class="journey-stop-head"><span class="journey-stop-planet" aria-hidden="true">${locked ? "⌑" : stage.icon}</span><div><h3>${stage.name}</h3><small>${stage.subtitle}</small></div></div><span class="journey-stop-status">${stageStatus}</span><div class="journey-stop-missions">${cards}</div></article>`;
  }).join("");
}

function showAchievement(message) {
  const toast = document.querySelector("#achievement-toast");
  document.querySelector("#toast-message").textContent = message;
  toast.hidden = false;
  window.clearTimeout(showAchievement.timer);
  showAchievement.timer = window.setTimeout(() => { toast.hidden = true; }, 4400);
}

function renderProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    document.querySelector("#explorer-name").textContent = profile.name || "Cosmic Explorer";
    if (profile.avatar) document.querySelector("#avatar-image").src = profile.avatar;
  } catch { /* Use the default explorer identity. */ }
}

function renderProgress() {
  renderQuizHistory();
  renderMissionHistory();
  renderExplorerProfile();
  renderJourneyRoute();
}

clearButton.addEventListener("click", () => {
  localStorage.removeItem(QUIZ_KEY);
  renderProgress();
});
window.addEventListener("storage", (event) => {
  if (event.key === QUIZ_KEY || event.key === MISSION_KEY || event.key === PROFILE_KEY) { renderProgress(); renderProfile(); }
});
renderProfile();
renderProgress();
if (window.CosmicAccount?.isSignedIn()) {
  window.CosmicAccount.hydrateProgress().then(() => {
    renderProfile();
    renderProgress();
  }).catch(() => showAchievement("Using this account's saved copy. Reconnect to sync the latest changes."));
}

const profileDialog = document.querySelector("#profile-dialog");
document.querySelector("#edit-profile").addEventListener("click", () => {
  const currentName = document.querySelector("#explorer-name").textContent;
  document.querySelector("#explorer-name-input").value = currentName === "Cosmic Explorer" ? "" : currentName;
  profileDialog.showModal();
});
document.querySelector("#save-profile").addEventListener("click", async () => {
  const name = document.querySelector("#explorer-name-input").value.trim().slice(0, 24) || "Cosmic Explorer";
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"); } catch { /* Start a fresh profile. */ }
  profile.name = name;
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch { /* The account API remains the source of truth when signed in. */ }
  renderProfile();
  if (window.CosmicAccount?.isSignedIn()) {
    try { const result = await window.CosmicAccount.updateProfile({ name }); if (result.user) profile.name = result.user.name; }
    catch { showAchievement("Name saved on this device. Reconnect to sync it to your account."); }
  }
});
document.querySelector("#avatar-upload").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const side = Math.min(image.naturalWidth, image.naturalHeight, 320);
      canvas.width = side; canvas.height = side;
      const context = canvas.getContext("2d");
      context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, side, side);
      let profile = {};
      try { profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"); } catch { /* Start a fresh profile. */ }
      profile.avatar = canvas.toDataURL("image/jpeg", .82);
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        renderProfile();
        if (window.CosmicAccount?.isSignedIn()) window.CosmicAccount.updateProfile({ avatar: profile.avatar }).catch(() => showAchievement("Avatar saved on this device. Reconnect to sync it."));
      } catch { showAchievement("That image is too large. Try a smaller one."); }
    }, { once: true });
    image.src = reader.result;
  }, { once: true });
  reader.readAsDataURL(file);
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
    primaryNavigation.classList.toggle("is-open", !expanded);
  });
}
