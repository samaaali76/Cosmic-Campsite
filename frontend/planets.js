// The planet information is stored here so the page works without a server or API.
const planets = [
  {
    id: "mercury", name: "Mercury", order: 1, type: "Terrestrial planet",
    description: "The smallest planet is also the closest to the Sun. Its cratered, rocky surface is shaped by a long history of impacts.",
    cardDescription: "A tiny, cratered world making the fastest trip around the Sun.",
    diameter: "4,879 km", diameterKm: 4879, distance: "57.9 million km", distanceMillionKm: 57.9, year: "88 Earth days", yearDays: 88, day: "58.6 Earth days", dayEarthDays: 58.6,
    funFact: "Mercury has a huge temperature contrast between its hot days and cold nights.",
    visual: "mercury",
    image: "https://images-assets.nasa.gov/image/PIA16853/PIA16853~small.jpg",
    imageAlt: "MESSENGER spacecraft color-enhanced global view of Mercury's cratered surface.",
    imageCredit: "NASA/Johns Hopkins APL/Carnegie Institution of Washington · color-enhanced",
    imageSource: "https://images.nasa.gov/details/PIA16853"
  },
  {
    id: "venus", name: "Venus", order: 2, type: "Terrestrial planet",
    description: "Venus is wrapped in a thick atmosphere and bright clouds. Its dense atmosphere traps heat, making it the hottest planet in our solar system.",
    cardDescription: "A bright, cloud-covered world with a remarkably hot surface.",
    diameter: "12,104 km", diameterKm: 12104, distance: "108.2 million km", distanceMillionKm: 108.2, year: "225 Earth days", yearDays: 225, day: "243 Earth days", dayEarthDays: 243,
    funFact: "A day on Venus is longer than its year: it spins very slowly as it orbits the Sun.",
    visual: "venus",
    image: "https://images-assets.nasa.gov/image/PIA00072/PIA00072~small.jpg",
    imageAlt: "Galileo spacecraft view of Venus's cloud patterns, colorized and filtered from spacecraft data.",
    imageCredit: "NASA/JPL · Galileo colorized/filtered image",
    imageSource: "https://images.nasa.gov/details/PIA00072"
  },
  {
    id: "earth", name: "Earth", order: 3, type: "Terrestrial planet",
    description: "Our home is a rocky planet with liquid water on its surface. It is the only world we know of that supports life.",
    cardDescription: "Our ocean-blue home, and the only known world with life.",
    diameter: "12,756 km", diameterKm: 12756, distance: "149.6 million km", distanceMillionKm: 149.6, year: "365.25 days", yearDays: 365.25, day: "23.9 hours", dayEarthDays: 23.9 / 24,
    funFact: "Earth is the only planet in our solar system whose name does not come from a Roman or Greek god.",
    visual: "earth",
    image: "https://images-assets.nasa.gov/image/as17-148-22727/as17-148-22727~small.jpg",
    imageAlt: "Apollo 17 photograph of Earth with Africa, cloud systems, and the Antarctic ice cap visible.",
    imageCredit: "NASA/JSC · Apollo 17 photograph",
    imageSource: "https://images.nasa.gov/details/as17-148-22727"
  },
  {
    id: "mars", name: "Mars", order: 4, type: "Terrestrial planet",
    description: "The red planet is a cold, dusty world with towering volcanoes, deep canyons, and signs that liquid water once flowed there.",
    cardDescription: "A rusty-red desert world with the tallest volcano we know.",
    diameter: "6,792 km", diameterKm: 6792, distance: "227.9 million km", distanceMillionKm: 227.9, year: "687 Earth days", yearDays: 687, day: "24.6 hours", dayEarthDays: 24.6 / 24,
    funFact: "Olympus Mons on Mars is about three times taller than Mount Everest.",
    visual: "mars",
    image: "https://images-assets.nasa.gov/image/PIA00407/PIA00407~small.jpg",
    imageAlt: "Viking-era global color view of Mars assembled from spacecraft imaging data.",
    imageCredit: "NASA/JPL/USGS · global color view",
    imageSource: "https://images.nasa.gov/details/PIA00407"
  },
  {
    id: "jupiter", name: "Jupiter", order: 5, type: "Gas giant",
    description: "The largest planet is a giant world of swirling clouds. Jupiter has no solid surface like Earth, and its atmosphere hosts enormous storms.",
    cardDescription: "A colossal gas giant striped by clouds and giant storms.",
    diameter: "142,984 km", diameterKm: 142984, distance: "778.6 million km", distanceMillionKm: 778.6, year: "11.9 Earth years", yearDays: 11.9 * 365.25, day: "9.9 hours", dayEarthDays: 9.9 / 24,
    funFact: "The Great Red Spot is a giant storm that has been observed for hundreds of years.",
    visual: "jupiter",
    image: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~small.jpg",
    imageAlt: "Juno spacecraft color-enhanced image showing Jupiter's Great Red Spot and turbulent clouds.",
    imageCredit: "NASA/JPL-Caltech/SwRI/MSSS · color-enhanced by Kevin M. Gill",
    imageSource: "https://images.nasa.gov/details/PIA22946"
  },
  {
    id: "saturn", name: "Saturn", order: 6, type: "Gas giant",
    description: "Saturn is a gas giant best known for its wide, bright rings, which are made mostly of pieces of ice and rock.",
    cardDescription: "A golden gas giant surrounded by spectacular icy rings.",
    diameter: "120,536 km", diameterKm: 120536, distance: "1.43 billion km", distanceMillionKm: 1430, year: "29.4 Earth years", yearDays: 29.4 * 365.25, day: "10.7 hours", dayEarthDays: 10.7 / 24,
    funFact: "Saturn's rings are incredibly wide, but they are surprisingly thin compared with their width.",
    visual: "saturn",
    image: "https://images-assets.nasa.gov/image/PIA20481/PIA20481~small.jpg",
    imageAlt: "Cassini spacecraft's angled view of Saturn's rings and north pole.",
    imageCredit: "NASA/JPL-Caltech/Space Science Institute · Cassini",
    imageSource: "https://images.nasa.gov/details/PIA20481"
  },
  {
    id: "uranus", name: "Uranus", order: 7, type: "Ice giant",
    description: "This pale blue ice giant contains water, methane, and ammonia in its atmosphere. It spins tilted almost onto its side.",
    cardDescription: "A pale blue ice giant that spins on a dramatic tilt.",
    diameter: "51,118 km", diameterKm: 51118, distance: "2.87 billion km", distanceMillionKm: 2870, year: "84 Earth years", yearDays: 84 * 365.25, day: "17.2 hours", dayEarthDays: 17.2 / 24,
    funFact: "Uranus rotates on its side, so its seasons can last for many years.",
    visual: "uranus",
    image: "https://images-assets.nasa.gov/image/PIA00032/PIA00032~small.jpg",
    imageAlt: "Voyager 2 true-color composite view of Uranus, paired with a false-color view in NASA's source image.",
    imageCredit: "NASA/JPL · Voyager 2 true-color composite",
    imageSource: "https://images.nasa.gov/details/PIA00032"
  },
  {
    id: "neptune", name: "Neptune", order: 8, type: "Ice giant",
    description: "Neptune is a distant, deep-blue ice giant. It takes a long journey around the Sun and has some of the fastest winds in the solar system.",
    cardDescription: "A distant blue world swept by powerful winds.",
    diameter: "49,528 km", diameterKm: 49528, distance: "4.50 billion km", distanceMillionKm: 4500, year: "165 Earth years", yearDays: 165 * 365.25, day: "16.1 hours", dayEarthDays: 16.1 / 24,
    funFact: "Neptune is so far away that it takes sunlight about four hours to reach it.",
    visual: "neptune",
    image: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~small.jpg",
    imageAlt: "Voyager 2 whole-planet image of Neptune assembled from green and orange filter exposures.",
    imageCredit: "NASA/JPL · Voyager 2 filter composite",
    imageSource: "https://images.nasa.gov/details/PIA01492"
  }
];

const planetGrid = document.querySelector("#planet-grid");
const detailPanel = document.querySelector("#planet-detail");
const backButton = document.querySelector("#back-to-planets");
const planetImageViewer = document.querySelector("#planet-image-viewer");

// Rounded NASA reference values. Giant-planet gravity and temperature are
// measured at the 1-bar atmospheric level rather than on a solid surface.
const planetFacts = {
  mercury: { temperature: "167 °C", gravity: "3.7 m/s²", moons: "0" },
  venus: { temperature: "464 °C", gravity: "8.9 m/s²", moons: "0" },
  earth: { temperature: "15 °C", gravity: "9.8 m/s²", moons: "1" },
  mars: { temperature: "−65 °C", gravity: "3.7 m/s²", moons: "2" },
  jupiter: { temperature: "−110 °C", gravity: "23.1 m/s²", moons: "115" },
  saturn: { temperature: "−140 °C", gravity: "9.0 m/s²", moons: "293" },
  uranus: { temperature: "−195 °C", gravity: "8.7 m/s²", moons: "29" },
  neptune: { temperature: "−200 °C", gravity: "11.0 m/s²", moons: "16" }
};

const roverImages = [
  { title: "Curiosity · Martian landscape", src: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia26/pia26632/PIA26632.jpg?crop=faces%2Cfocalpoint&fit=clip&h=720&w=1280", alt: "A grayscale navigation-camera view of the Martian landscape captured by NASA's Curiosity rover, with part of the rover visible in the foreground.", credit: "NASA/JPL-Caltech · PIA26632", source: "https://science.nasa.gov/photojournal/curiosity-captures-mars-landscape-while-talking-to-an-orbiter/", hotspots: [
    { left: 24, top: 76, title: "Rover tracks", text: "Tracks cross this boxwork region. Curiosity captured the view while also communicating with an orbiter." },
    { left: 57, top: 51, title: "Boxwork ridges", text: "The ridges formed from mineral deposits left by subsurface water billions of years ago." },
    { left: 80, top: 27, title: "Mount Sharp", text: "The pale peak on the horizon is Mount Sharp, rising within Gale Crater." }
  ] },
  { title: "Perseverance · Arbot panorama", src: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia26753/figures/PIA26753_figA.png?crop=faces%2Cfocalpoint&fit=clip&h=720&w=1280", alt: "Natural-color Mastcam-Z panorama of the rocky Martian landscape at Arbot, captured by NASA's Perseverance rover.", credit: "NASA/JPL-Caltech/ASU/MSSS · natural color", source: "https://science.nasa.gov/photojournal/nasas-perseverance-captures-panorama-at-arbot/", hotspots: [
    { left: 36, top: 57, title: "Rock textures", text: "The natural-color panorama is made from 46 images and shows varied rock textures across the Arbot area." },
    { left: 77, top: 34, title: "Beyond Jezero", text: "Perseverance captured this view during its deepest push west beyond Jezero Crater at the time." }
  ] }
];

const relatedMissionIds = {
  mercury: [], venus: [], earth: ["hubble"], mars: ["curiosity", "perseverance"],
  jupiter: ["voyager-1"], saturn: ["voyager-1"], uranus: [], neptune: []
};

function createPlanetCards() {
  planetGrid.innerHTML = planets.map((planet) => `
    <article class="planet-card planet-${planet.visual}" data-reveal>
      <figure class="planet-card-art">
        <img class="planet-photo" src="${planet.image}" alt="${planet.imageAlt}" width="640" height="360" loading="lazy" decoding="async">
        <span class="planet-image-placeholder" aria-hidden="true">✦</span>
        <figcaption class="planet-image-credit"><a href="${planet.imageSource}" target="_blank" rel="noopener noreferrer">${planet.imageCredit} ↗</a></figcaption>
      </figure>
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

  planetGrid.querySelectorAll(".planet-photo").forEach(addImageFallback);
}

function addImageFallback(image) {
  const showPlaceholder = () => {
    image.hidden = true;
    image.closest("figure")?.classList.add("image-unavailable");
  };

  image.addEventListener("error", showPlaceholder);

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  }
}

function showFeaturedPlanet(planetId) {
  const planet = planets.find((item) => item.id === planetId);
  const showcasePhoto = document.querySelector("#showcase-photo");
  const showcase = document.querySelector("#planet-showcase");

  if (!planet || !showcasePhoto || !showcase) return;

  showcasePhoto.hidden = false;
  showcase.classList.remove("image-unavailable");
  showcasePhoto.alt = planet.imageAlt;
  showcasePhoto.src = planet.image;
  showcasePhoto.classList.remove("is-changing");
  void showcasePhoto.offsetWidth;
  showcasePhoto.classList.add("is-changing");
  document.querySelector("#showcase-number").textContent = `${String(planet.order).padStart(2, "0")} / ${planet.name.toUpperCase()}`;
  document.querySelector("#showcase-credit").textContent = planet.imageCredit;
  const sourceLink = document.querySelector("#showcase-source");
  sourceLink.href = planet.imageSource;
  sourceLink.setAttribute("aria-label", `View NASA source for ${planet.name}`);

  document.querySelectorAll(".planet-pick").forEach((button) => {
    const isSelected = button.dataset.heroPlanet === planet.id;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function setupScrollReveal() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const revealItems = document.querySelectorAll("[data-reveal]");
  document.body.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
}

function showPlanetDetails(planetId) {
  const planet = planets.find((item) => item.id === planetId);

  if (!planet) return;

  document.querySelectorAll("[data-map-planet]").forEach((button) => {
    const selected = button.dataset.mapPlanet === planet.id;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  document.querySelector("#detail-order").textContent = String(planet.order).padStart(2, "0");
  document.querySelector("#detail-name").textContent = planet.name;
  document.querySelector("#detail-description").textContent = planet.description;
  document.querySelector("#detail-fun-fact").textContent = planet.funFact;

  // Build the fact list from the selected planet's data.
  const facts = [
    ["Planet class", planet.type, "✦"],
    ["Diameter", planet.diameter, "◉"],
    ["Mean temperature", planetFacts[planet.id].temperature, "℃"],
    ["Gravity", planetFacts[planet.id].gravity, "↓"],
    ["Known moons", planetFacts[planet.id].moons, "☾"],
    ["Distance from Sun", planet.distance, "↗"],
    ["Orbit around Sun", planet.year, "↻"],
    ["One rotation", planet.day, "⟳"]
  ];

  document.querySelector("#detail-facts").innerHTML = facts.map(([label, value, icon]) => `
    <div class="fact-item"><dt><span class="fact-icon" aria-hidden="true">${icon}</span>${label}</dt><dd>${value}</dd></div>
  `).join("");
  document.querySelector("#fact-source-note").innerHTML = `Rounded NASA reference values: <a href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/" target="_blank" rel="noopener noreferrer">NASA Planetary Fact Sheet</a> · moon counts cross-checked with the <a href="https://ssd.jpl.nasa.gov/sats/discovery.html" target="_blank" rel="noopener noreferrer">JPL/IAU satellite table</a>. Counts can change as moons are confirmed.${["jupiter", "saturn", "uranus", "neptune"].includes(planet.id) ? " Giant-planet temperature and gravity are given at the 1-bar atmospheric level; these planets do not have a solid surface like Earth." : ""}`;

  renderPlanetMissions(planet);
  renderMarsGallery(planet);
  renderDetailActions(planet);

  const detailArt = document.querySelector("#detail-art");
  detailArt.className = `detail-art planet-${planet.visual}`;
  detailArt.innerHTML = `
    <button class="planet-image-open" type="button" aria-label="Open larger NASA image of ${planet.name}"><img class="planet-photo" src="${planet.image}" alt="${planet.imageAlt}" width="640" height="360" decoding="async"></button>
    <span class="planet-image-placeholder" aria-hidden="true">✦</span>
    <span class="detail-image-label">NASA FIELD ARCHIVE <span>0${planet.order} / 08</span></span>
    <figcaption class="planet-image-credit"><a href="${planet.imageSource}" target="_blank" rel="noopener noreferrer">${planet.imageCredit} ↗</a></figcaption>
  `;
  addImageFallback(detailArt.querySelector(".planet-photo"));
  detailArt.querySelector(".planet-image-open").addEventListener("click", () => openPlanetImage(planet));

  renderDiameterScale(planet.id);

  planetGrid.hidden = true;
  detailPanel.hidden = false;
  detailPanel.classList.remove("is-opening");
  void detailPanel.offsetWidth;
  detailPanel.classList.add("is-opening");
  document.querySelector("#explorer-title").textContent = `${planet.name}: a closer look`;
  detailPanel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  backButton.focus({ preventScroll: true });
}

function openPlanetImage(planet) {
  const image = document.querySelector("#planet-viewer-image");
  const figure = document.querySelector("#planet-viewer-figure");
  image.hidden = false;
  figure.classList.remove("image-unavailable");
  image.alt = planet.imageAlt;
  image.src = planet.image.replace("~small.jpg", "~medium.jpg");
  image.onerror = () => {
    image.hidden = true;
    figure.classList.add("image-unavailable");
  };
  document.querySelector("#planet-viewer-title").textContent = `${planet.name} · spacecraft image`;
  document.querySelector("#planet-viewer-credit").textContent = planet.imageCredit;
  document.querySelector("#planet-viewer-source").href = planet.imageSource;
  planetImageViewer.showModal();
}

document.querySelector("#planet-viewer-close").addEventListener("click", () => planetImageViewer.close());
planetImageViewer.addEventListener("click", (event) => {
  if (event.target === planetImageViewer) planetImageViewer.close();
});

function renderPlanetMissions(planet) {
  const section = document.querySelector("#planet-missions");
  const list = document.querySelector("#related-mission-list");
  const archive = window.COSMIC_MISSIONS || [];
  const ids = relatedMissionIds[planet.id] || [];
  const matches = archive.filter((mission) => ids.includes(mission.id));

  document.querySelector("#mission-destination-name").textContent = planet.name;
  section.hidden = false;
  if (!matches.length) {
    list.innerHTML = '<p class="empty-mission-note">Our current mission archive does not yet feature a mission that visited this planet.</p>';
    document.querySelector("#mission-archive-note").textContent = "This is a selection from the local archive, not a complete record of every spacecraft encounter.";
    return;
  }

  list.innerHTML = matches.map((mission) => `
    <a class="related-mission-card" href="missions.html?mission=${encodeURIComponent(mission.id)}">
      <span><strong>${mission.title}</strong><small>${mission.year} · ${mission.categoryLabel}</small></span><span aria-hidden="true">↗</span>
    </a>`).join("");
  document.querySelector("#mission-archive-note").textContent = planet.id === "saturn"
    ? "Voyager 1 flew past Saturn on Nov. 12, 1980. The current local mission record does not yet include that event in its timeline; NASA's mission history confirms the flyby."
    : "Showing related missions from the current local archive; this is not a complete record of every spacecraft encounter.";
}

function renderDetailActions(planet) {
  const actions = document.querySelector("#detail-explore-tools");
  actions.innerHTML = `<button class="button button-primary" type="button" data-compare-world="${planet.id}">Compare ${planet.name} <span aria-hidden="true">⇄</span></button>
    <a class="button button-outline" href="#planet-missions">Explore missions for ${planet.name} <span aria-hidden="true">↓</span></a>`;
}

document.querySelector("#detail-explore-tools").addEventListener("click", (event) => {
  const button = event.target.closest("[data-compare-world]");
  if (!button) return;
  const first = document.querySelector("#compare-planet-a");
  const second = document.querySelector("#compare-planet-b");
  first.value = button.dataset.compareWorld;
  second.value = first.value === "earth" ? "mars" : "earth";
  document.querySelector("#comparison-form").requestSubmit();
  document.querySelector("#comparison-results").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
});

function renderMarsGallery(planet) {
  const section = document.querySelector("#mars-gallery");
  const grid = document.querySelector("#rover-gallery-grid");
  section.hidden = planet.id !== "mars";
  if (section.hidden) return;

  grid.innerHTML = roverImages.map((image) => `
    <figure class="rover-image-card">
      <div class="rover-image-link">
        <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async">
        <span class="planet-image-placeholder" aria-hidden="true">✦</span>
        <div class="rover-hotspots" role="group" aria-label="Interactive points in ${image.title}">${image.hotspots.map((spot, index) => `<button type="button" class="rover-hotspot${index === 0 ? " is-active" : ""}" data-hotspot-title="${spot.title}" data-hotspot-text="${spot.text}" style="--hotspot-x:${spot.left}%;--hotspot-y:${spot.top}%" aria-label="${spot.title}" aria-pressed="${index === 0}">${index + 1}</button>`).join("")}</div>
      </div>
      <figcaption><strong>${image.title}</strong><span>${image.credit}</span><span class="rover-hotspot-note" aria-live="polite">${image.hotspots[0].title}: ${image.hotspots[0].text}</span><a href="${image.source}" target="_blank" rel="noopener noreferrer">NASA source ↗</a></figcaption>
    </figure>`).join("");
  grid.querySelectorAll("img").forEach(addImageFallback);
}

document.querySelector("#rover-gallery-grid").addEventListener("click", (event) => {
  const hotspot = event.target.closest(".rover-hotspot");
  if (!hotspot) return;
  const card = hotspot.closest(".rover-image-card");
  card.querySelectorAll(".rover-hotspot").forEach((button) => {
    const active = button === hotspot;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  card.querySelector(".rover-hotspot-note").textContent = `${hotspot.dataset.hotspotTitle}: ${hotspot.dataset.hotspotText}`;
});

function renderDiameterScale(selectedId = "earth") {
  const track = document.querySelector("#diameter-scale-track");
  if (!track) return;
  const maxDiameter = Math.max(...planets.map((planet) => planet.diameterKm));
  track.innerHTML = planets.map((planet) => {
    const size = Math.max(9, Math.round((planet.diameterKm / maxDiameter) * 132));
    return `<button class="diameter-world${planet.id === selectedId ? " is-selected" : ""}" type="button" data-scale-planet="${planet.id}" aria-label="Explore ${planet.name}, equatorial diameter ${planet.diameter}">
      <span class="diameter-orb" aria-hidden="true" style="--diameter-size:${size}px"></span><strong>${planet.name}</strong><small>${planet.diameter}</small>
    </button>`;
  }).join("");
}

function setupSolarMap() {
  const track = document.querySelector("#solar-map-track");
  if (!track) return;
  const radar = document.querySelector("#planet-radar");

  track.innerHTML = planets.map((planet) => `
    <button class="solar-map-planet planet-${planet.visual}" type="button" data-map-planet="${planet.id}" aria-label="Explore ${planet.name}" aria-pressed="false">
      <span class="solar-map-orb"><img src="${planet.image}" alt="" loading="lazy" decoding="async"></span>
      <span class="solar-map-name">${planet.name}</span><span class="solar-map-distance">${planet.distance}</span>
    </button>`).join("");
  track.querySelectorAll("img").forEach((image) => image.addEventListener("error", () => {
    image.hidden = true;
    image.closest(".solar-map-orb")?.classList.add("image-unavailable");
  }));
  const radarPositions = {
    mercury: [50, 24], venus: [68, 30], earth: [78, 49], mars: [69, 69],
    jupiter: [49, 79], saturn: [29, 68], uranus: [21, 48], neptune: [31, 29]
  };
  radar.innerHTML += planets.map((planet) => {
    const [x, y] = radarPositions[planet.id];
    return `<button type="button" class="radar-target${planet.id === "earth" ? " is-selected" : ""}" data-map-planet="${planet.id}" aria-label="Radar target: ${planet.name}" aria-pressed="${planet.id === "earth"}" style="--target-x:${x}%;--target-y:${y}%"><img src="${planet.image}" alt="" loading="lazy"><span>${planet.name}</span></button>`;
  }).join("");
  radar.querySelectorAll("img").forEach((image) => image.addEventListener("error", () => { image.hidden = true; }));

  document.querySelector(".solar-map").addEventListener("click", (event) => {
    const button = event.target.closest("[data-map-planet]");
    if (!button) return;
    const planetId = button.dataset.mapPlanet;
    showFeaturedPlanet(planetId);
    showPlanetDetails(planetId);
  });
}

document.querySelector("#diameter-scale-track").addEventListener("click", (event) => {
  const button = event.target.closest("[data-scale-planet]");
  if (button) showPlanetDetails(button.dataset.scalePlanet);
});

function showAllPlanets() {
  detailPanel.hidden = true;
  detailPanel.classList.remove("is-opening");
  planetGrid.hidden = false;
  document.querySelector("#explorer-title").innerHTML = 'Choose a world <span>to explore.</span>';
  planetGrid.querySelector(".planet-select")?.focus();
}

function setupPlanetComparison() {
  const form = document.querySelector("#comparison-form");
  const firstSelect = document.querySelector("#compare-planet-a");
  const secondSelect = document.querySelector("#compare-planet-b");
  const results = document.querySelector("#comparison-results");

  if (!form || !firstSelect || !secondSelect || !results) return;

  const options = planets.map((planet) => `<option value="${planet.id}">${planet.name}</option>`).join("");
  firstSelect.innerHTML = options;
  secondSelect.innerHTML = options;
  firstSelect.value = "earth";
  secondSelect.value = "mars";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstPlanet = planets.find((planet) => planet.id === firstSelect.value);
    const secondPlanet = planets.find((planet) => planet.id === secondSelect.value);

    if (!firstPlanet || !secondPlanet) return;
    results.hidden = false;

    if (firstPlanet.id === secondPlanet.id) {
      results.innerHTML = '<p class="comparison-message" role="status">Choose two different worlds to compare their facts.</p>';
      return;
    }

    const metrics = [
      { label: "Diameter", key: "diameterKm", display: "diameter" },
      { label: "Distance from the Sun", key: "distanceMillionKm", display: "distance" },
      { label: "Length of a year", key: "yearDays", display: "year" },
      { label: "Length of one rotation", key: "dayEarthDays", display: "day" },
      { label: "Gravity", key: "gravityValue", display: "gravity" },
      { label: "Mean temperature", key: "temperatureValue", display: "temperature" }
    ];

    const comparisonValues = (planet) => ({
      ...planet,
      gravityValue: Number.parseFloat(planetFacts[planet.id].gravity),
      gravity: planetFacts[planet.id].gravity,
      temperatureValue: Number.parseFloat(planetFacts[planet.id].temperature.replace("−", "-")),
      temperature: planetFacts[planet.id].temperature
    });
    const firstValues = comparisonValues(firstPlanet);
    const secondValues = comparisonValues(secondPlanet);

    results.innerHTML = `
      <div class="comparison-worlds" aria-label="Selected planets">
        <span><i class="comparison-dot comparison-dot-a" aria-hidden="true"></i>${firstPlanet.name}</span>
        <span><i class="comparison-dot comparison-dot-b" aria-hidden="true"></i>${secondPlanet.name}</span>
      </div>
      <div class="comparison-metrics">
        ${metrics.map((metric) => {
          const firstValue = firstValues[metric.key];
          const secondValue = secondValues[metric.key];
          const maxValue = Math.max(Math.abs(firstValue), Math.abs(secondValue));
          const firstWidth = (Math.abs(firstValue) / maxValue) * 100;
          const secondWidth = (Math.abs(secondValue) / maxValue) * 100;
          const formatDistance = (value) => value >= 1000
            ? `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} billion km`
            : `${value.toLocaleString()} million km`;
          const firstLabel = metric.key === "distanceMillionKm" ? formatDistance(firstValue) : firstValues[metric.display];
          const secondLabel = metric.key === "distanceMillionKm" ? formatDistance(secondValue) : secondValues[metric.display];

          return `
            <div class="comparison-metric">
              <h3>${metric.label}</h3>
              <div class="comparison-value"><span>${firstPlanet.name}</span><strong>${firstLabel}</strong></div>
              <div class="comparison-track"><span class="comparison-bar comparison-bar-a" style="width:${firstWidth}%"></span></div>
              <div class="comparison-value"><span>${secondPlanet.name}</span><strong>${secondLabel}</strong></div>
              <div class="comparison-track"><span class="comparison-bar comparison-bar-b" style="width:${secondWidth}%"></span></div>
            </div>`;
        }).join("")}
      </div>`;
  });
}

planetGrid.addEventListener("click", (event) => {
  const selectButton = event.target.closest(".planet-select");

  if (selectButton) {
    showPlanetDetails(selectButton.dataset.planet);
  }
});

backButton.addEventListener("click", showAllPlanets);

createPlanetCards();
setupSolarMap();
renderDiameterScale();
setupPlanetComparison();

const planetPicker = document.querySelector("#planet-picker");
const showcasePhoto = document.querySelector("#showcase-photo");
addImageFallback(showcasePhoto);

planetPicker.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.hidden = true;
    image.closest(".planet-pick")?.classList.add("thumbnail-unavailable");
  });
});

planetPicker.addEventListener("click", (event) => {
  const planetButton = event.target.closest(".planet-pick");
  if (planetButton) showFeaturedPlanet(planetButton.dataset.heroPlanet);
});

setupScrollReveal();

// Allow Journey links to open a planet's detail card directly.
const requestedPlanetId = new URLSearchParams(window.location.search).get("planet");
if (planets.some((planet) => planet.id === requestedPlanetId)) {
  showFeaturedPlanet(requestedPlanetId);
  showPlanetDetails(requestedPlanetId);
}

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
