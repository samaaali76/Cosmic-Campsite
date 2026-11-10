// The planet information is stored here so the page works without a server or API.
const planets = [
  {
    id: "mercury", name: "Mercury", order: 1, type: "Terrestrial planet",
    description: "The smallest planet is also the closest to the Sun. Its cratered, rocky surface is shaped by a long history of impacts.",
    cardDescription: "A tiny, cratered world making the fastest trip around the Sun.",
    diameter: "4,879 km", distance: "57.9 million km", year: "88 Earth days", day: "58.6 Earth days",
    funFact: "Mercury has a huge temperature contrast between its hot days and cold nights.",
    visual: "mercury"
  },
  {
    id: "venus", name: "Venus", order: 2, type: "Terrestrial planet",
    description: "Venus is wrapped in a thick atmosphere and bright clouds. Its dense atmosphere traps heat, making it the hottest planet in our solar system.",
    cardDescription: "A bright, cloud-covered world with a remarkably hot surface.",
    diameter: "12,104 km", distance: "108.2 million km", year: "225 Earth days", day: "243 Earth days",
    funFact: "A day on Venus is longer than its year: it spins very slowly as it orbits the Sun.",
    visual: "venus"
  },
  {
    id: "earth", name: "Earth", order: 3, type: "Terrestrial planet",
    description: "Our home is a rocky planet with liquid water on its surface. It is the only world we know of that supports life.",
    cardDescription: "Our ocean-blue home, and the only known world with life.",
    diameter: "12,756 km", distance: "149.6 million km", year: "365.25 days", day: "23.9 hours",
    funFact: "Earth is the only planet in our solar system whose name does not come from a Roman or Greek god.",
    visual: "earth"
  },
  {
    id: "mars", name: "Mars", order: 4, type: "Terrestrial planet",
    description: "The red planet is a cold, dusty world with towering volcanoes, deep canyons, and signs that liquid water once flowed there.",
    cardDescription: "A rusty-red desert world with the tallest volcano we know.",
    diameter: "6,792 km", distance: "227.9 million km", year: "687 Earth days", day: "24.6 hours",
    funFact: "Olympus Mons on Mars is about three times taller than Mount Everest.",
    visual: "mars"
  },
  {
    id: "jupiter", name: "Jupiter", order: 5, type: "Gas giant",
    description: "The largest planet is a giant world of swirling clouds. Jupiter has no solid surface like Earth, and its atmosphere hosts enormous storms.",
    cardDescription: "A colossal gas giant striped by clouds and giant storms.",
    diameter: "142,984 km", distance: "778.6 million km", year: "11.9 Earth years", day: "9.9 hours",
    funFact: "The Great Red Spot is a giant storm that has been observed for hundreds of years.",
    visual: "jupiter"
  },
  {
    id: "saturn", name: "Saturn", order: 6, type: "Gas giant",
    description: "Saturn is a gas giant best known for its wide, bright rings, which are made mostly of pieces of ice and rock.",
    cardDescription: "A golden gas giant surrounded by spectacular icy rings.",
    diameter: "120,536 km", distance: "1.43 billion km", year: "29.4 Earth years", day: "10.7 hours",
    funFact: "Saturn's rings are incredibly wide, but they are surprisingly thin compared with their width.",
    visual: "saturn"
  },
  {
    id: "uranus", name: "Uranus", order: 7, type: "Ice giant",
    description: "This pale blue ice giant contains water, methane, and ammonia in its atmosphere. It spins tilted almost onto its side.",
    cardDescription: "A pale blue ice giant that spins on a dramatic tilt.",
    diameter: "51,118 km", distance: "2.87 billion km", year: "84 Earth years", day: "17.2 hours",
    funFact: "Uranus rotates on its side, so its seasons can last for many years.",
    visual: "uranus"
  },
  {
    id: "neptune", name: "Neptune", order: 8, type: "Ice giant",
    description: "Neptune is a distant, deep-blue ice giant. It takes a long journey around the Sun and has some of the fastest winds in the solar system.",
    cardDescription: "A distant blue world swept by powerful winds.",
    diameter: "49,528 km", distance: "4.50 billion km", year: "165 Earth years", day: "16.1 hours",
    funFact: "Neptune is so far away that it takes sunlight about four hours to reach it.",
    visual: "neptune"
  }
];

const planetGrid = document.querySelector("#planet-grid");
const detailPanel = document.querySelector("#planet-detail");
const backButton = document.querySelector("#back-to-planets");

function createPlanetCards() {
  planetGrid.innerHTML = planets.map((planet) => `
    <article class="planet-card planet-${planet.visual}">
      <div class="planet-card-art" aria-hidden="true">
        <span class="card-orbit"></span>
        <span class="card-planet"></span>
        <span class="card-star star-one">✦</span>
        <span class="card-star star-two">✧</span>
      </div>
      <div class="planet-card-copy">
        <p class="planet-index">${String(planet.order).padStart(2, "0")} <span> / 08</span></p>
        <h3>${planet.name}</h3>
        <p class="planet-type">${planet.type}</p>
        <p class="planet-summary">${planet.cardDescription}</p>
        <button class="planet-select" type="button" data-planet="${planet.id}" aria-label="Explore ${planet.name}">
          Explore ${planet.name} <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  `).join("");
}

function showPlanetDetails(planetId) {
  const planet = planets.find((item) => item.id === planetId);

  if (!planet) return;

  document.querySelector("#detail-order").textContent = String(planet.order).padStart(2, "0");
  document.querySelector("#detail-name").textContent = planet.name;
  document.querySelector("#detail-description").textContent = planet.description;
  document.querySelector("#detail-fun-fact").textContent = planet.funFact;

  // Build the fact list from the selected planet's data.
  const facts = [
    ["Planet type", planet.type],
    ["Diameter", planet.diameter],
    ["Distance from Sun", planet.distance],
    ["Orbit around Sun", planet.year],
    ["One rotation", planet.day]
  ];

  document.querySelector("#detail-facts").innerHTML = facts.map(([label, value]) => `
    <div class="fact-item"><dt>${label}</dt><dd>${value}</dd></div>
  `).join("");

  const detailArt = document.querySelector("#detail-art");
  detailArt.className = `detail-art planet-${planet.visual}`;
  detailArt.innerHTML = '<span class="detail-orbit"></span><span class="detail-planet-sphere"></span><span class="detail-art-star">✦</span>';

  planetGrid.hidden = true;
  detailPanel.hidden = false;
  document.querySelector("#explorer-title").textContent = `${planet.name}: a closer look`;
  detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  backButton.focus({ preventScroll: true });
}

function showAllPlanets() {
  detailPanel.hidden = true;
  planetGrid.hidden = false;
  document.querySelector("#explorer-title").innerHTML = 'Choose a world <span>to explore.</span>';
  planetGrid.querySelector(".planet-select")?.focus();
}

planetGrid.addEventListener("click", (event) => {
  const selectButton = event.target.closest(".planet-select");

  if (selectButton) {
    showPlanetDetails(selectButton.dataset.planet);
  }
});

backButton.addEventListener("click", showAllPlanets);

createPlanetCards();

// Mobile navigation follows the same accessible open/close pattern as the Home page.
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
    if (window.innerWidth > 700) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    }
  });
}
