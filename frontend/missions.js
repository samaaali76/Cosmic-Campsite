// Page behavior for the local, source-linked mission archive.
document.documentElement.classList.add("js-ready");
const missions = window.COSMIC_MISSIONS || [];
const accountKey = (name) => window.CosmicAccount?.storageKey(name) || name;
const missionHistoryKey = accountKey("cosmic-campsite-mission-history");
const missionGrid = document.querySelector("#mission-grid");
const archiveJourney = document.querySelector("#archive-journey");
const missionTimeline = document.querySelector("#mission-timeline");
const searchInput = document.querySelector("#mission-search");
const filterGroup = document.querySelector("#mission-filters");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#mission-empty");
const clearFiltersButton = document.querySelector("#clear-filters");
const missionDialog = document.querySelector("#mission-dialog");
const dialogCloseButton = document.querySelector("#mission-dialog-close");
const dialogImage = document.querySelector("#mission-dialog-image");
const dialogSections = document.querySelector("#mission-dialog-sections");
const missionCardObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" })
  : null;
const timelineObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { root: missionDialog, threshold: 0.08 })
  : null;
const archiveHeading = document.querySelector(".mission-explorer .section-heading");
const archiveHeadingObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      archiveHeading.classList.add("is-visible");
      observer.disconnect();
    }
  }, { threshold: 0.1 })
  : null;
const sectionRevealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" })
  : null;
let activeCategory = "all";
let lastOpenedButton = null;

if (archiveHeadingObserver) archiveHeadingObserver.observe(archiveHeading);
else archiveHeading.classList.add("is-visible");

const missionHeroImage = document.querySelector(".mission-hero-photo");
const showMissionHeroFallback = () => {
  missionHeroImage.hidden = true;
  missionHeroImage.closest("figure")?.classList.add("image-unavailable");
};
missionHeroImage.addEventListener("error", showMissionHeroFallback, { once: true });
if (missionHeroImage.complete && missionHeroImage.naturalWidth === 0) showMissionHeroFallback();

const revealSections = document.querySelectorAll("[data-reveal]");
if (sectionRevealObserver && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("motion-ready");
  revealSections.forEach((section) => sectionRevealObserver.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add("is-visible"));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function recordMissionActivity(mission, status) {
  try {
    const saved = JSON.parse(localStorage.getItem(missionHistoryKey) || "[]");
    const history = Array.isArray(saved) ? saved : [];
    const existingIndex = history.findIndex((entry) => entry.id === mission.id);
    const existing = existingIndex >= 0 ? history[existingIndex] : null;
    const activity = {
      id: mission.id,
      name: mission.title,
      planet: mission.destinations.map((destination) => destination.label).join(" · "),
      status: status === "Completed" || existing?.status === "Completed" ? "Completed" : "Explored",
      date: new Date().toISOString()
    };
    if (existingIndex >= 0) history[existingIndex] = activity;
    else history.unshift(activity);
    localStorage.setItem(missionHistoryKey, JSON.stringify(history.slice(0, 100)));
    window.dispatchEvent(new CustomEvent("cosmic-mission-history-updated"));
    const attempts = JSON.parse(localStorage.getItem(accountKey("cosmic-campsite-quiz-attempts")) || "[]");
    const previousBadges = JSON.parse(localStorage.getItem(accountKey("cosmic-campsite-earned-badges")) || "null");
    const completedCount = history.filter((entry) => entry.status === "Completed").length;
    const bestScore = Array.isArray(attempts) ? Math.max(0, ...attempts.map((entry) => Number(entry.percentage) || 0)) : 0;
    const badgeRules = [
      ["first-contact", history.length > 0, "First Contact"],
      ["mission-specialist", completedCount >= 3, "Mission Specialist"],
      ["quiz-cadet", Array.isArray(attempts) && attempts.length > 0, "Quiz Cadet"],
      ["perfect-orbit", bestScore === 100, "Perfect Orbit"]
    ];
    const earnedBadges = badgeRules.filter(([, earned]) => earned).map(([id]) => id);
    let unlockedBadge = null;
    const newlyEarned = badgeRules.find(([id, earned]) => earned && (!Array.isArray(previousBadges) ? id === "first-contact" : !previousBadges.includes(id)));
    if (newlyEarned) unlockedBadge = newlyEarned[2];
    localStorage.setItem(accountKey("cosmic-campsite-earned-badges"), JSON.stringify(earnedBadges));
    if (window.CosmicAccount?.isSignedIn()) {
      window.CosmicAccount.saveMissionActivity(activity).catch(() => showMissionCompletionToast("Mission saved to this account on this device. Sync is unavailable."));
    }
    return unlockedBadge;
  } catch {
    // Mission exploration remains available even if browser storage is disabled.
  }
}

function showMissionCompletionToast(message) {
  const toast = document.querySelector("#mission-completion-toast");
  if (!toast) return;
  document.querySelector("#mission-toast-message").textContent = message;
  toast.hidden = false;
  window.clearTimeout(showMissionCompletionToast.timer);
  showMissionCompletionToast.timer = window.setTimeout(() => { toast.hidden = true; }, 4600);
}

function getImageUrl(mission) {
  if (mission.imageUrl) return mission.imageUrl;
  const safeImageId = encodeURIComponent(mission.imageId);
  return `https://images-assets.nasa.gov/image/${safeImageId}/${safeImageId}~medium.jpg`;
}

function sourceLink(url, label = "Source") {
  return `<a class="source-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
}

function renderMissionCards(missionList) {
  missionGrid.innerHTML = missionList.map((mission) => {
    const destinations = mission.destinations.map((destination) => destination.id === "mars"
      ? `<a class="destination-link" href="planets.html" aria-label="Explore Mars in Planet Explorer">${escapeHtml(destination.label)}</a>`
      : `<span class="destination-label">${escapeHtml(destination.label)}</span>`).join(", ");
    return `
      <article class="mission-card" data-category="${escapeHtml(mission.category)}">
        <div class="mission-image-wrap" data-mission-label="${escapeHtml(mission.title)}">
          <img class="mission-image" src="${escapeHtml(getImageUrl(mission))}" alt="${escapeHtml(mission.imageAlt)}" loading="lazy">
        </div>
        <div class="mission-card-copy">
          <div class="mission-meta"><span class="mission-category">${escapeHtml(mission.categoryLabel)}</span><span class="mission-year">${escapeHtml(mission.year)}</span></div>
          <h3>${escapeHtml(mission.title)}</h3>
          <p class="mission-destination">Destination: ${destinations}</p>
          <p class="mission-summary">${escapeHtml(mission.summary)}</p>
          <button class="learn-more" type="button" data-mission="${escapeHtml(mission.id)}" aria-label="Explore ${escapeHtml(mission.title)} details">Explore mission <span aria-hidden="true">→</span></button>
        </div>
      </article>`;
  }).join("");

  missionGrid.querySelectorAll(".mission-image").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.parentElement.classList.add("image-unavailable");
    }, { once: true });
  });

  const cards = missionGrid.querySelectorAll(".mission-card");
  if (missionCardObserver) {
    missionCardObserver.disconnect();
    cards.forEach((card) => missionCardObserver.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }
}

function renderArchiveTimeline(missionList) {
  const chronologicalMissions = [...missionList].sort((first, second) => {
    const firstDate = first.timeline.map((event) => event.date).sort()[0] || `${first.year}-01-01`;
    const secondDate = second.timeline.map((event) => event.date).sort()[0] || `${second.year}-01-01`;
    return firstDate.localeCompare(secondDate);
  });

  missionTimeline.innerHTML = chronologicalMissions.map((mission) => `
    <li class="archive-timeline-item">
      <button class="archive-stop" type="button" data-mission="${escapeHtml(mission.id)}" aria-label="Open ${escapeHtml(mission.title)} details">
        <span class="archive-stop-year">${escapeHtml(mission.year)}</span>
        <span class="archive-stop-marker" aria-hidden="true"></span>
        <strong>${escapeHtml(mission.title)}</strong>
        <span class="archive-stop-category">${escapeHtml(mission.categoryLabel)}</span>
      </button>
    </li>`).join("");
  archiveJourney.hidden = chronologicalMissions.length === 0;
}

function updateMissionList() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredMissions = missions.filter((mission) => {
    const matchesCategory = activeCategory === "all" || mission.category === activeCategory;
    const destinationText = mission.destinations.map((destination) => destination.label).join(" ");
    const searchableText = `${mission.title} ${mission.year} ${mission.categoryLabel} ${destinationText} ${mission.summary} ${mission.details} ${JSON.stringify(mission.timeline)} ${JSON.stringify(mission.hardware)} ${JSON.stringify(mission.scientificImpact)}`.toLowerCase();
    return matchesCategory && searchableText.includes(query);
  });

  renderMissionCards(filteredMissions);
  renderArchiveTimeline(filteredMissions);
  missionGrid.hidden = filteredMissions.length === 0;
  emptyState.hidden = filteredMissions.length > 0;
  resultsCount.textContent = `${filteredMissions.length} ${filteredMissions.length === 1 ? "mission" : "missions"} found`;
  document.querySelector("#hero-mission-count").textContent = `${missions.length} missions`;
}

function renderTimeline(timeline) {
  const orderedEvents = [...timeline].sort((first, second) => first.date.localeCompare(second.date));
  return `<ol class="mission-timeline">${orderedEvents.map((event) => `
    <li class="timeline-event"><time datetime="${escapeHtml(event.date)}">${new Date(`${event.date}T00:00:00Z`).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}</time>
      <div><h4>${escapeHtml(event.title)}</h4><p>${escapeHtml(event.description)}</p>${sourceLink(event.sourceUrl)}</div></li>`).join("")}</ol>`;
}

function renderMissionSections(mission) {
  const hardware = mission.hardware.map((item) => `
    <article class="hardware-item"><div class="hardware-heading"><h4>${escapeHtml(item.name)}</h4><span class="hardware-status status-${escapeHtml(item.status)}">${escapeHtml(item.status)}</span></div>
      <p>${escapeHtml(item.description)}</p>${sourceLink(item.sourceUrl)}</article>`).join("");
  const impact = mission.scientificImpact.map((item) => `<article class="impact-item"><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.description)}</p>${sourceLink(item.sourceUrl)}</article>`).join("");
  const debrief = mission.debrief;
  const answers = debrief.answers.map((answer) => `<button class="debrief-answer" type="button" data-answer="${escapeHtml(answer.id)}">${escapeHtml(answer.text)}</button>`).join("");

  return `
    <section class="detail-section"><h3>Mission Timeline</h3>${renderTimeline(mission.timeline)}</section>
    <section class="detail-section"><h3>Hardware Across Space</h3><p class="section-note">Status labels distinguish equipment that stayed at a destination, remains active, or returned to Earth.</p><div class="hardware-list">${hardware}</div></section>
    <section class="detail-section"><h3>Scientific Discoveries</h3><div class="impact-list">${impact}</div></section>
    <section class="detail-section"><h3>Why It Still Matters</h3><p>${escapeHtml(mission.whyItMatters)}</p>${sourceLink(mission.whyItMattersSourceUrl)}</section>
    <section class="detail-section debrief" data-question-id="${escapeHtml(debrief.questionId)}" data-correct-answer="${escapeHtml(debrief.correctAnswerId)}">
      <p class="debrief-eyebrow">MISSION DEBRIEF · ${escapeHtml(debrief.difficulty)}</p><h3>${escapeHtml(debrief.question)}</h3>
      <div class="debrief-options">${answers}</div><p class="debrief-feedback" aria-live="polite" tabindex="-1"></p>${sourceLink(debrief.sourceUrl, "Learn more")}
    </section>`;
}

function openMissionDetails(missionId, triggerButton) {
  const mission = missions.find((item) => item.id === missionId);
  if (!mission) return;
  const unlockedBadge = recordMissionActivity(mission, "Explored");
  if (unlockedBadge) showMissionCompletionToast(`Badge unlocked: ${unlockedBadge}`);

  missionDialog.classList.remove("is-closing");
  lastOpenedButton = triggerButton;
  document.querySelector("#mission-dialog-category").textContent = `MISSION BRIEFING · ${mission.categoryLabel.toUpperCase()}`;
  document.querySelector("#mission-dialog-year").textContent = `Mission year: ${mission.year} · ${mission.destinations.map((item) => item.label).join(" and ")}`;
  document.querySelector("#mission-dialog-title").textContent = mission.title;
  document.querySelector("#mission-dialog-description").textContent = mission.details;
  document.querySelector("#mission-dialog-credit").innerHTML = `Image credit: ${escapeHtml(mission.imageCredit)} · ${sourceLink(mission.imageSourceUrl, "Image source")}`;
  dialogImage.src = getImageUrl(mission);
  dialogImage.alt = mission.imageAlt;
  dialogImage.hidden = false;
  dialogImage.parentElement.classList.remove("dialog-image-unavailable");
  dialogSections.innerHTML = renderMissionSections(mission);
  if (timelineObserver) timelineObserver.disconnect();
  missionDialog.showModal();
  const timelineEvents = dialogSections.querySelectorAll(".timeline-event");
  if (timelineObserver) {
    timelineEvents.forEach((timelineEvent) => timelineObserver.observe(timelineEvent));
  } else {
    timelineEvents.forEach((timelineEvent) => timelineEvent.classList.add("is-visible"));
  }
  document.body.classList.add("dialog-open");
}

function closeMissionDetails() {
  if (!missionDialog.open || missionDialog.classList.contains("is-closing")) return;

  missionDialog.classList.add("is-closing");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    missionDialog.close();
    return;
  }

  window.setTimeout(() => {
    if (missionDialog.open) missionDialog.close();
  }, 160);
}

filterGroup.addEventListener("click", (event) => {
  const filterButton = event.target.closest(".filter-button");
  if (!filterButton) return;
  activeCategory = filterButton.dataset.category;
  filterGroup.querySelectorAll(".filter-button").forEach((button) => {
    const isSelected = button === filterButton;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  updateMissionList();
});

searchInput.addEventListener("input", updateMissionList);
missionGrid.addEventListener("click", (event) => {
  const learnMoreButton = event.target.closest(".learn-more");
  if (learnMoreButton) openMissionDetails(learnMoreButton.dataset.mission, learnMoreButton);
});
missionTimeline.addEventListener("click", (event) => {
  const timelineButton = event.target.closest(".archive-stop");
  if (timelineButton) openMissionDetails(timelineButton.dataset.mission, timelineButton);
});
clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  filterGroup.querySelector('[data-category="all"]').click();
  searchInput.focus();
});
dialogCloseButton.addEventListener("click", closeMissionDetails);
dialogSections.addEventListener("click", (event) => {
  const answerButton = event.target.closest(".debrief-answer");
  if (!answerButton || answerButton.disabled) return;
  const debrief = answerButton.closest(".debrief");
  const isCorrect = answerButton.dataset.answer === debrief.dataset.correctAnswer;
  debrief.querySelectorAll(".debrief-answer").forEach((button) => {
    button.disabled = true;
    if (button === answerButton) button.classList.add("is-selected", isCorrect ? "is-correct" : "is-incorrect");
  });
  const mission = missions.find((item) => item.debrief.questionId === debrief.dataset.questionId);
  if (mission) {
    recordMissionActivity(mission, "Completed");
    const unlockedBadge = recordMissionActivity(mission, "Completed");
    showMissionCompletionToast(unlockedBadge ? `Mission completed · ${unlockedBadge} badge unlocked!` : "Mission completed · Flight log updated");
  }
  const feedback = debrief.querySelector(".debrief-feedback");
  feedback.textContent = `${isCorrect ? "Correct! " : "Not quite. "}${mission ? mission.debrief.explanation : "Review the mission source to explore the answer."}`;
  feedback.classList.add(isCorrect ? "feedback-correct" : "feedback-incorrect");
  feedback.focus();
});

missionDialog.addEventListener("close", () => {
  missionDialog.classList.remove("is-closing");
  if (timelineObserver) timelineObserver.disconnect();
  document.body.classList.remove("dialog-open");
  if (lastOpenedButton && document.contains(lastOpenedButton)) lastOpenedButton.focus();
});
missionDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeMissionDetails();
});
missionDialog.addEventListener("click", (event) => {
  if (event.target === missionDialog) closeMissionDetails();
});
dialogImage.addEventListener("error", () => {
  dialogImage.hidden = true;
  dialogImage.parentElement.classList.add("dialog-image-unavailable");
});
dialogImage.addEventListener("load", () => {
  dialogImage.parentElement.classList.remove("dialog-image-unavailable");
});
const requestedMissionId = new URLSearchParams(window.location.search).get("mission");
const requestedMission = missions.find((mission) => mission.id === requestedMissionId);
if (requestedMission) searchInput.value = requestedMission.title;

updateMissionList();

if (requestedMission) {
  const requestedMissionButton = [...missionGrid.querySelectorAll(".learn-more")]
    .find((button) => button.dataset.mission === requestedMission.id);
  requestedMissionButton?.click();
}

// Mobile navigation follows the accessible open/close pattern used on the site.
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
