// All quiz content is local, so the page does not need a server or API.
// Questions are grouped by difficulty, then shuffled within each group.
document.documentElement.classList.add("js-ready");
const questionBank = [
  {
    id: "mars-red-planet",
    topic: "Planets",
    sourceUrl: "https://science.nasa.gov/mars/facts/",
    difficulty: "Easy",
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Mercury", "Neptune"],
    correctAnswer: 1,
    explanation: "Mars looks reddish because iron-rich dust on its surface has rusted over time."
  },
  {
    id: "jupiter-largest",
    topic: "Planets",
    sourceUrl: "https://science.nasa.gov/solar-system/skywatching/night-sky-network/spot-the-king-of-planets-observe-jupiter/",
    difficulty: "Easy",
    question: "Which planet is the largest in our solar system?",
    answers: ["Saturn", "Earth", "Jupiter", "Uranus"],
    correctAnswer: 2,
    explanation: "Jupiter is the largest planet. More than 1,300 Earths could fit inside it by volume."
  },
  {
    id: "nasa-acronym",
    topic: "NASA",
    sourceUrl: "https://science.nasa.gov/learning-resources/for-kids-and-students/what-is-nasa/",
    difficulty: "Easy",
    question: "What does NASA stand for?",
    answers: [
      "National Aeronautics and Space Administration",
      "North American Space Agency",
      "National Astronomy and Satellite Association",
      "New Aeronautics and Science Agency"
    ],
    correctAnswer: 0,
    explanation: "NASA is the National Aeronautics and Space Administration, the United States space agency."
  },
  {
    id: "apollo-11-landing",
    topic: "Moon missions",
    sourceUrl: "https://www.nasa.gov/mission/apollo-11/",
    difficulty: "Medium",
    question: "What was the name of the first mission to land people on the Moon?",
    answers: ["Apollo 8", "Apollo 10", "Apollo 11", "Gemini 4"],
    correctAnswer: 2,
    explanation: "Apollo 11 landed Neil Armstrong and Buzz Aldrin on the Moon in July 1969. Michael Collins orbited above them."
  },
  {
    id: "perseverance-jezero",
    topic: "Mars missions",
    sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/",
    difficulty: "Medium",
    question: "Which NASA rover landed in Jezero Crater in 2021?",
    answers: ["Curiosity", "Perseverance", "Sojourner", "Spirit"],
    correctAnswer: 1,
    explanation: "Perseverance landed in Jezero Crater in 2021 to study an ancient landscape and collect rock samples."
  },
  {
    id: "mercury-nearest-sun",
    topic: "Planets",
    sourceUrl: "https://science.nasa.gov/mercury/facts/",
    difficulty: "Medium",
    question: "Which planet is closest to the Sun?",
    answers: ["Venus", "Earth", "Mercury", "Mars"],
    correctAnswer: 2,
    explanation: "Mercury is the closest planet to the Sun, completing one orbit in about 88 Earth days."
  },
  {
    id: "iss-orbit",
    topic: "Space exploration",
    sourceUrl: "https://www.nasa.gov/missions/station/spot-the-station-frequently-asked-questions/",
    difficulty: "Medium",
    question: "Where does the International Space Station travel?",
    answers: ["Around Earth", "Around the Moon", "Around Mars", "Between Earth and Jupiter"],
    correctAnswer: 0,
    explanation: "The International Space Station orbits Earth about every 90 minutes, traveling at roughly 28,000 km/h."
  },
  {
    id: "venus-slow-rotation",
    topic: "Planets",
    sourceUrl: "https://science.nasa.gov/venus/venus-facts/",
    difficulty: "Hard",
    question: "Which planet takes longer to spin once than it takes to orbit the Sun?",
    answers: ["Mars", "Saturn", "Venus", "Neptune"],
    correctAnswer: 2,
    explanation: "Venus rotates very slowly: one rotation takes about 243 Earth days, while one orbit takes about 225."
  },
  {
    id: "new-horizons-pluto",
    topic: "Space missions",
    sourceUrl: "https://science.nasa.gov/mission/new-horizons/",
    difficulty: "Hard",
    question: "What distant object did New Horizons fly past in 2015?",
    answers: ["Europa", "Pluto", "Titan", "Ceres"],
    correctAnswer: 1,
    explanation: "New Horizons made the first close flyby of Pluto in 2015, revealing mountains, icy plains, and a thin atmosphere."
  },
  {
    id: "webb-orbit",
    topic: "Space telescopes",
    sourceUrl: "https://science.nasa.gov/asset/webb/webbs-orbit-at-sun-earth-lagrange-point-2-l2/",
    difficulty: "Hard",
    question: "What is the name of the region where the James Webb Space Telescope operates?",
    answers: ["Low Earth orbit", "The Moon's orbit", "Sun-Earth Lagrange point 2", "The asteroid belt"],
    correctAnswer: 2,
    explanation: "Webb orbits the Sun near Sun-Earth Lagrange point 2, about 1.5 million km from Earth."
  }
];

const letters = ["A", "B", "C", "D"];
const difficultyOrder = ["Easy", "Medium", "Hard"];
const questionCount = document.querySelector("#question-count");
const scoreValue = document.querySelector("#score-value");
const questionProgress = document.querySelector("#question-progress");
const progressLabel = document.querySelector("#progress-label");
const questionTitle = document.querySelector("#question-title");
const answerOptions = document.querySelector("#answer-options");
const answerFeedback = document.querySelector("#answer-feedback");
const nextQuestionButton = document.querySelector("#next-question");
const quizPanel = document.querySelector("#quiz-panel");
const quizResults = document.querySelector("#quiz-results");
const finalScore = document.querySelector("#final-score");
const finalPercentage = document.querySelector("#final-percentage");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-quiz");
const startButton = document.querySelector("#start-quiz");
const quizIntro = document.querySelector("#quiz-intro");
const flightStages = document.querySelectorAll(".flight-stage");
const clearanceGroup = document.querySelector("#quiz-clearances");
const progressRing = document.querySelector("#progress-ring-value");
const progressPercent = document.querySelector("#mission-progress-percent");
const progressRingLabel = document.querySelector(".mission-progress-ring");
const quizSectionHeading = document.querySelector(".quiz-section .section-heading");
const quizHeadingObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      quizSectionHeading.classList.add("is-visible");
      observer.disconnect();
    }
  }, { threshold: 0.1 })
  : null;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
let selectedQuizLevel = "Explorer";
let answerReport = [];

if (quizHeadingObserver) quizHeadingObserver.observe(quizSectionHeading);
else quizSectionHeading.classList.add("is-visible");

const quizHeroImage = document.querySelector(".quiz-hero-photo");
const showQuizHeroFallback = () => {
  quizHeroImage.hidden = true;
  quizHeroImage.closest("figure")?.classList.add("image-unavailable");
};
quizHeroImage.addEventListener("error", showQuizHeroFallback, { once: true });
if (quizHeroImage.complete && quizHeroImage.naturalWidth === 0) showQuizHeroFallback();

const quizRevealItems = document.querySelectorAll("[data-reveal]");
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.body.classList.add("motion-ready");
  const quizRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
  quizRevealItems.forEach((item) => quizRevealObserver.observe(item));
} else {
  quizRevealItems.forEach((item) => item.classList.add("is-visible"));
}

function shuffleList(items) {
  const shuffledItems = [...items];

  // Fisher-Yates shuffle: randomly swap each item with one before it.
  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
  }

  return shuffledItems;
}

function createQuestionOrder() {
  // Keep each training clearance in easy-to-hard order while shuffling each tier.
  const includedDifficulties = selectedQuizLevel === "Cadet"
    ? ["Easy"]
    : selectedQuizLevel === "Explorer"
      ? ["Easy", "Medium"]
      : difficultyOrder;
  return includedDifficulties.flatMap((difficulty) => {
    const questionsAtDifficulty = questionBank.filter((item) => item.difficulty === difficulty);
    return shuffleList(questionsAtDifficulty);
  });
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const difficultyClass = question.difficulty.toLowerCase();
  const activeStageIndex = difficultyOrder.indexOf(question.difficulty);

  flightStages.forEach((stage, index) => {
    const isActive = index === activeStageIndex;
    stage.classList.toggle("is-current", isActive);
    stage.classList.toggle("is-complete", index < activeStageIndex);
    if (isActive) stage.setAttribute("aria-current", "step");
    else stage.removeAttribute("aria-current");
  });

  hasAnswered = false;
  quizPanel.classList.remove("question-enter");
  void quizPanel.offsetWidth;
  quizPanel.classList.add("question-enter");
  questionCount.innerHTML = `Question ${questionNumber} of ${questions.length} <span class="difficulty-pill ${difficultyClass}">${question.difficulty}</span><span class="topic-pill" id="question-topic">${question.topic}</span>`;
  scoreValue.textContent = score;
  progressLabel.textContent = `${questionNumber} / ${questions.length}`;
  questionProgress.max = questions.length;
  questionProgress.value = currentQuestionIndex;
  questionProgress.textContent = `${currentQuestionIndex} of ${questions.length} challenges complete`;
  updateMissionProgress(currentQuestionIndex / questions.length);
  questionTitle.textContent = question.question;
  answerFeedback.hidden = true;
  answerFeedback.classList.remove("is-incorrect", "is-correct", "feedback-enter");
  answerFeedback.replaceChildren();
  nextQuestionButton.hidden = true;

  answerOptions.innerHTML = question.answers.map((answer, index) => `
    <button class="answer-option" type="button" data-answer-index="${index}">
      <span class="answer-letter" aria-hidden="true">${letters[index]}</span>
      <span>${answer}</span>
    </button>
  `).join("");
}

function showFeedback(isCorrect, explanation, sourceUrl) {
  answerFeedback.classList.remove("is-incorrect", "is-correct", "feedback-enter");
  answerFeedback.classList.add(isCorrect ? "is-correct" : "is-incorrect");
  void answerFeedback.offsetWidth;
  answerFeedback.classList.add("feedback-enter");

  const icon = document.createElement("span");
  icon.className = "feedback-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = isCorrect ? "✓" : "✦";

  const copy = document.createElement("span");
  copy.className = "feedback-copy";
  const heading = document.createElement("strong");
  heading.textContent = isCorrect ? "That's right!" : "Not quite — here's the answer.";
  const detail = document.createElement("span");
  detail.textContent = explanation;
  copy.append(heading, detail);
  const sourceLink = document.createElement("a");
  sourceLink.className = "answer-source";
  sourceLink.href = sourceUrl;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.textContent = "Explore this fact at NASA ↗";
  copy.append(sourceLink);
  answerFeedback.replaceChildren(icon, copy);
  answerFeedback.hidden = false;
}

function selectAnswer(selectedButton) {
  if (hasAnswered) return;

  hasAnswered = true;
  const question = questions[currentQuestionIndex];
  const selectedAnswer = Number(selectedButton.dataset.answerIndex);
  const isCorrect = selectedAnswer === question.correctAnswer;
  answerReport.push({ topic: question.topic, correct: isCorrect });

  answerOptions.querySelectorAll(".answer-option").forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctAnswer) button.classList.add("is-correct");
    if (button === selectedButton) button.classList.add("is-selected");
    if (button === selectedButton && !isCorrect) button.classList.add("is-incorrect");
  });

  if (isCorrect) score += 1;
  scoreValue.textContent = score;
  updateMissionProgress((currentQuestionIndex + 1) / questions.length);
  showFeedback(isCorrect, question.explanation, question.sourceUrl);
  nextQuestionButton.textContent = currentQuestionIndex === questions.length - 1 ? "See my results" : "Next question";
  nextQuestionButton.hidden = false;
  nextQuestionButton.focus();
}

function updateMissionProgress(fraction) {
  const circumference = 270.18;
  const percent = Math.round(fraction * 100);
  progressRing.style.strokeDasharray = String(circumference);
  progressRing.style.strokeDashoffset = String(circumference * (1 - fraction));
  progressPercent.textContent = `${percent}%`;
  progressRingLabel.setAttribute("aria-label", `Mission progress: ${percent}%`);
}

function renderMissionReport() {
  document.querySelector("#report-level").textContent = `MISSION REPORT · ${selectedQuizLevel.toUpperCase()}`;
  document.querySelector("#report-points").textContent = `${score} / ${questions.length}`;
  const topicTotals = answerReport.reduce((topics, answer) => {
    if (!topics[answer.topic]) topics[answer.topic] = { correct: 0, total: 0 };
    topics[answer.topic].total += 1;
    if (answer.correct) topics[answer.topic].correct += 1;
    return topics;
  }, {});
  document.querySelector("#report-topics").innerHTML = Object.entries(topicTotals).map(([topic, stats]) => {
    const mastered = stats.correct === stats.total;
    return `<div class="report-topic ${mastered ? "is-mastered" : "needs-review"}"><span>${topic}</span><strong>${stats.correct}/${stats.total}</strong><small>${mastered ? "Strong signal" : "Review this topic"}</small></div>`;
  }).join("");
}

function getResultMessage(percentage) {
  if (percentage === 100) return "Perfect score! Your space knowledge is truly stellar. Keep exploring the cosmos!";
  if (percentage >= 80) return "Fantastic work! You know your way around the solar system and beyond.";
  if (percentage >= 60) return "Great exploring! You have a strong start — keep learning and your knowledge will soar.";
  if (percentage >= 40) return "Nice effort, explorer! Every mission teaches us something new. Try again and see what you discover.";
  return "Every space expert starts with a question. Explore the planets and missions, then come back for another launch!";
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  finalScore.textContent = `${score} / ${questions.length}`;
  finalPercentage.textContent = `(${percentage}%)`;
  resultMessage.textContent = getResultMessage(percentage);
  updateMissionProgress(1);
  renderMissionReport();
  saveQuizAttempt(percentage);
  quizPanel.hidden = true;
  quizResults.classList.remove("results-enter");
  quizResults.classList.remove("is-celebrating");
  void quizResults.offsetWidth;
  quizResults.hidden = false;
  quizResults.classList.add("results-enter");
  if (percentage >= 80) quizResults.classList.add("is-celebrating");
  document.querySelector("#results-title").focus();
}

function saveQuizAttempt(percentage) {
  const accountKey = (name) => window.CosmicAccount?.storageKey(name) || name;
  const storageKey = accountKey("cosmic-campsite-quiz-attempts");
  let attempts = [];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) attempts = saved;
    const previousAttemptCount = attempts.length;
    attempts.push({
      date: new Date().toISOString(),
      level: selectedQuizLevel,
      score,
      total: questions.length,
      percentage,
      topics: answerReport.reduce((result, answer) => {
        if (!result[answer.topic]) result[answer.topic] = { correct: 0, total: 0 };
        result[answer.topic].total += 1;
        if (answer.correct) result[answer.topic].correct += 1;
        return result;
      }, {})
    });
    localStorage.setItem(storageKey, JSON.stringify(attempts.slice(-50)));
    const previousBadges = JSON.parse(localStorage.getItem(accountKey("cosmic-campsite-earned-badges")) || "null");
    const badgeIds = new Set(Array.isArray(previousBadges) ? previousBadges : []);
    const earned = new Set(badgeIds);
    const missionHistory = JSON.parse(localStorage.getItem(accountKey("cosmic-campsite-mission-history")) || "[]");
    if (Array.isArray(missionHistory) && missionHistory.length) earned.add("first-contact");
    if (Array.isArray(missionHistory) && missionHistory.filter((mission) => mission.status === "Completed").length >= 3) earned.add("mission-specialist");
    earned.add("quiz-cadet");
    if (attempts.some((attempt) => Number(attempt.percentage) === 100)) earned.add("perfect-orbit");
    localStorage.setItem(accountKey("cosmic-campsite-earned-badges"), JSON.stringify([...earned]));
    const unlockedBadges = [];
    if (previousAttemptCount === 0 && !badgeIds.has("quiz-cadet")) unlockedBadges.push("Quiz Cadet");
    if (percentage === 100 && !badgeIds.has("perfect-orbit")) unlockedBadges.push("Perfect Orbit");
    if (unlockedBadges.length) showQuizAchievement(`Badge unlocked: ${unlockedBadges.join(" + ")}!`);
    if (window.CosmicAccount?.isSignedIn()) {
      const latest = attempts[attempts.length - 1];
      window.CosmicAccount.saveQuizAttempt(latest).catch(() => showQuizAchievement("Quiz saved to this account on this device. Sync is unavailable."));
    }
  } catch (error) {
    // The results screen remains available when browser storage is disabled.
  }
}

function showQuizAchievement(message) {
  const toast = document.querySelector("#quiz-achievement-toast");
  if (!toast) return;
  document.querySelector("#quiz-toast-message").textContent = message;
  toast.hidden = false;
  window.clearTimeout(showQuizAchievement.timer);
  showQuizAchievement.timer = window.setTimeout(() => { toast.hidden = true; }, 4600);
}

function advanceQuestion() {
  if (!hasAnswered) return;

  if (currentQuestionIndex === questions.length - 1) {
    showResults();
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
  questionTitle.focus();
}

function startQuiz() {
  questions = createQuestionOrder();
  currentQuestionIndex = 0;
  score = 0;
  answerReport = [];
  quizResults.hidden = true;
  quizResults.classList.remove("results-enter", "is-celebrating");
  quizIntro.hidden = true;
  quizPanel.hidden = false;
  renderQuestion();
}

clearanceGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz-level]");
  if (!button) return;
  selectedQuizLevel = button.dataset.quizLevel;
  clearanceGroup.querySelectorAll("[data-quiz-level]").forEach((choice) => {
    const selected = choice === button;
    choice.classList.toggle("is-selected", selected);
    choice.setAttribute("aria-pressed", String(selected));
  });
});

answerOptions.addEventListener("click", (event) => {
  const answerButton = event.target.closest(".answer-option");
  if (answerButton) selectAnswer(answerButton);
});

nextQuestionButton.addEventListener("click", advanceQuestion);
startButton.addEventListener("click", () => {
  startQuiz();
  questionTitle.focus();
});

restartButton.addEventListener("click", () => {
  startQuiz();
  questionTitle.focus();
});

quizIntro.hidden = false;
quizPanel.hidden = true;
quizResults.hidden = true;

// Mobile navigation follows the same accessible open/close pattern as the reference pages.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    }
  });
}
