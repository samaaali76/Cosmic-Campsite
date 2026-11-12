// The Journey page reuses the verified mission records from missions-data.js.
document.documentElement.classList.add("js-ready");

const missions = window.COSMIC_MISSIONS || [];
const routePicker = document.querySelector("#route-picker");
const routeContent = document.querySelector("#route-content");
const journeyMissionGrid = document.querySelector("#journey-missions");
const routeTitle = document.querySelector("#route-stop-title");
const routeKicker = document.querySelector("#route-kicker");
const routeDescription = document.querySelector("#route-description");
const routeDestinationLink = document.querySelector("#route-destination-link");
let revealObserver = null;

const journeyStops = [
  {
    id: "moon",
    number: "01",
    title: "The Moon",
    note: "First steps outward",
    description: "Follow Apollo 11, the first crewed lunar landing, and Artemis I, an uncrewed test flight around the Moon.",
    destinationLabel: "Explore the Moon missions",
    destinationHref: "missions.html?mission=apollo-11"
  },
  {
    id: "mars",
    number: "02",
    title: "Mars",
    note: "A world to investigate",
    description: "Join Curiosity in Gale Crater and Perseverance in Jezero Crater as the rovers study the Red Planet.",
    destinationLabel: "Explore Mars in Planet Explorer",
    destinationHref: "planets.html?planet=mars"
  },
  {
    id: "deep-space",
    number: "03",
    title: "Deep Space",
    note: "Beyond the familiar",
    description: "Follow Voyager 1 into interstellar space and New Horizons on its exploration of Pluto and the Kuiper Belt.",
    destinationLabel: "Explore deep-space missions",
    destinationHref: "missions.html?mission=voyager-1"
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getMissionImage(mission) {
  if (mission.imageUrl) return mission.imageUrl;
  const imageId = encodeURIComponent(mission.imageId);
  return `https://images-assets.nasa.gov/image/${imageId}/${imageId}~small.jpg`;
}

function formatDate(dateValue) {
  return new Date(`${dateValue}T00:00:00Z`).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}

function addImageFallback(image) {
  const showPlaceholder = () => {
    image.hidden = true;
    image.closest("figure")?.classList.add("image-unavailable");
  };

  image.addEventListener("error", showPlaceholder, { once: true });
  if (image.complete && image.naturalWidth === 0) showPlaceholder();
}

function renderMissionCard(mission) {
  const milestones = [...mission.timeline]
    .sort((first, second) => first.date.localeCompare(second.date))
    .slice(0, 2)
    .map((event) => `
      <li>
        <time datetime="${escapeHtml(event.date)}">${formatDate(event.date)}</time>
        <span>${escapeHtml(event.title)}</span>
        <a href="${escapeHtml(event.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Source for ${escapeHtml(event.title)}">Source ↗</a>
      </li>`).join("");

  return `
    <article class="journey-mission-card" data-reveal>
      <figure class="journey-mission-image">
        <img class="journey-card-photo" src="${escapeHtml(getMissionImage(mission))}" alt="${escapeHtml(mission.imageAlt)}" width="640" height="360" loading="lazy" decoding="async">
        <span class="journey-image-placeholder" aria-hidden="true">✦</span>
        <figcaption>${escapeHtml(mission.imageCredit)} · <a href="${escapeHtml(mission.imageSourceUrl)}" target="_blank" rel="noopener noreferrer">NASA source ↗</a></figcaption>
      </figure>
      <div class="journey-mission-copy">
        <div class="journey-mission-meta"><span>${escapeHtml(mission.categoryLabel)}</span><span>${escapeHtml(mission.year)}</span></div>
        <h4>${escapeHtml(mission.title)}</h4>
        <p>${escapeHtml(mission.summary)}</p>
        <div class="journey-milestones"><span class="milestones-label">MISSION MILESTONES</span><ol>${milestones}</ol></div>
        <a class="journey-briefing-link" href="missions.html?mission=${encodeURIComponent(mission.id)}">Open mission briefing <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
}

function showJourneyStop(stopId) {
  const stop = journeyStops.find((item) => item.id === stopId);
  if (!stop) return;

  routeContent.classList.remove("is-changing");
  void routeContent.offsetWidth;
  routeContent.classList.add("is-changing");
  routeTitle.textContent = stop.title;
  routeKicker.textContent = `DESTINATION ${stop.number} · ${stop.title.toUpperCase()}`;
  routeDescription.textContent = stop.description;
  routeDestinationLink.href = stop.destinationHref;
  routeDestinationLink.textContent = stop.destinationLabel;

  const stopMissions = missions.filter((mission) => mission.category === stop.id);
  journeyMissionGrid.innerHTML = stopMissions.map(renderMissionCard).join("");

  journeyMissionGrid.querySelectorAll(".journey-card-photo").forEach(addImageFallback);
  journeyMissionGrid.querySelectorAll("[data-reveal]").forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${index * 90}ms`);
    if (revealObserver) revealObserver.observe(card);
    else card.classList.add("is-visible");
  });
  routePicker.querySelectorAll(".route-stop").forEach((button) => {
    const isSelected = button.dataset.route === stop.id;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

}

routePicker.addEventListener("click", (event) => {
  const routeButton = event.target.closest(".route-stop");
  if (routeButton) showJourneyStop(routeButton.dataset.route);
});

const heroImage = document.querySelector(".journey-photo");
addImageFallback(heroImage);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("motion-ready");
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
}

showJourneyStop("moon");

// Mobile navigation mirrors the existing page pattern.
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
