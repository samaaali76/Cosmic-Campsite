// Mobile navigation: keep the menu state available to assistive technology.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

// The intro control opens a short, keyboard-accessible tour of the main pages.
const watchIntroButton = document.querySelector("#watch-intro");
const introDialog = document.querySelector("#home-intro-dialog");
const introCloseButton = introDialog?.querySelector(".intro-close");

if (watchIntroButton && introDialog && introCloseButton) {
  watchIntroButton.addEventListener("click", () => {
    if (typeof introDialog.showModal === "function") {
      introDialog.showModal();
      introCloseButton.focus();
    }
  });

  introCloseButton.addEventListener("click", () => introDialog.close());
  introDialog.addEventListener("click", (event) => {
    if (event.target === introDialog) introDialog.close();
  });
}

// Replace a failed NASA image with the matching CSS space placeholder.
document.querySelectorAll(".real-space-image").forEach((image) => {
  const showImageFallback = () => {
    if (image.classList.contains("hero-photo")) {
      // Support both a frontend-root server and a repository-root server.
      // The local NASA asset remains the same; only its public URL changes.
      if (!image.dataset.rootPathTried) {
        image.dataset.rootPathTried = "true";
        image.addEventListener("error", showImageFallback, { once: true });
        image.src = "/frontend/assets/home/apollo15-astronaut-seated-rover.jpg";
        return;
      }

      const caption = image.closest("figure")?.querySelector(".hero-photo-caption");
      image.hidden = true;
      image.closest("figure")?.classList.add("image-unavailable");
      if (caption) {
        caption.querySelector(".hero-photo-caption-label").textContent = "NASA EARTH + LUNAR ORBITER IMAGERY";
        caption.querySelector('[data-image-source="apollo15"]')?.remove();
      }
      return;
    }

    image.hidden = true;
    image.closest("figure")?.classList.add("image-unavailable");
  };

  image.addEventListener("error", showImageFallback, { once: true });

  // The deferred script may run after the browser has already reported a failure.
  if (image.complete && image.naturalWidth === 0) {
    showImageFallback();
  }
});

// A curated NASA field note changes daily and can also be advanced by the visitor.
const nasaDiscoveries = [
  {
    subject: "Venus has a remarkably long day.",
    fact: "One Venus rotation takes 243 Earth days—longer than its 225-Earth-day trip around the Sun.",
    image: "https://images-assets.nasa.gov/image/PIA00072/PIA00072~small.jpg",
    imageAlt: "Galileo spacecraft view of Venus's cloud patterns, colorized and filtered from spacecraft data.",
    imageCredit: "NASA/JPL · Galileo colorized and filtered image",
    imageSource: "https://images.nasa.gov/details/PIA00072",
    factSource: "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    subject: "Mars is home to a giant volcano.",
    fact: "Olympus Mons rises more than 25 miles (40 kilometers) from base to summit, making it the largest volcano in the solar system.",
    image: "https://images-assets.nasa.gov/image/PIA00407/PIA00407~small.jpg",
    imageAlt: "Viking-era global color view of Mars assembled from spacecraft imaging data.",
    imageCredit: "NASA/JPL/USGS · global color view",
    imageSource: "https://images.nasa.gov/details/PIA00407",
    factSource: "https://science.nasa.gov/mars/facts/"
  },
  {
    subject: "Jupiter's Great Red Spot is a giant storm.",
    fact: "NASA describes the Great Red Spot as a storm bigger than Earth that has raged for hundreds of years.",
    image: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~small.jpg",
    imageAlt: "Juno spacecraft color-enhanced image showing Jupiter's Great Red Spot and turbulent clouds.",
    imageCredit: "NASA/JPL-Caltech/SwRI/MSSS · color-enhanced",
    imageSource: "https://images.nasa.gov/details/PIA22946",
    factSource: "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    subject: "Neptune has the fastest winds in the solar system.",
    fact: "Clouds on Neptune can race at more than 1,200 miles per hour (2,000 kilometers per hour).",
    image: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~small.jpg",
    imageAlt: "Voyager 2 whole-planet image of Neptune assembled from green and orange filter exposures.",
    imageCredit: "NASA/JPL · Voyager 2 filter composite",
    imageSource: "https://images.nasa.gov/details/PIA01492",
    factSource: "https://science.nasa.gov/neptune/neptune-facts/"
  }
];

const discoveryDate = document.querySelector("#discovery-date");
const discoveryImage = document.querySelector("#discovery-image");
const discoveryArt = document.querySelector("#discovery-art");
const refreshDiscovery = document.querySelector("#refresh-discovery");

// The Golden Record story switches between short, locally stored field notes.
const capsuleNotes = {
  record: "Each Voyager carries a 12-inch, gold-plated copper phonograph record with sounds and images from Earth.",
  cover: "The protective cover includes etched playback instructions and diagrams that explain where the record came from.",
  message: "The record was designed as a message for any future finder, sharing a small portrait of life and culture on Earth."
};
const capsuleArt = document.querySelector("#capsule-art");
const capsuleImage = document.querySelector(".capsule-image");
if (capsuleImage && capsuleArt) {
  capsuleImage.addEventListener("error", () => {
    capsuleImage.hidden = true;
    capsuleArt.classList.add("image-unavailable");
  }, { once: true });
  if (capsuleImage.complete && capsuleImage.naturalWidth === 0) {
    capsuleImage.hidden = true;
    capsuleArt.classList.add("image-unavailable");
  }
}
document.querySelector(".capsule-tabs")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-capsule-part]");
  if (!button) return;
  document.querySelectorAll(".capsule-tab").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#capsule-detail").textContent = capsuleNotes[button.dataset.capsulePart];
});

function renderDiscovery(index) {
  const discovery = nasaDiscoveries[index];
  if (!discovery || !discoveryImage || !discoveryArt) return;

  document.querySelector("#discovery-subject").textContent = discovery.subject;
  document.querySelector("#discovery-fact").textContent = discovery.fact;
  document.querySelector("#discovery-fact-source").href = discovery.factSource;
  document.querySelector("#discovery-image-credit").textContent = discovery.imageCredit;
  document.querySelector("#discovery-image-source").href = discovery.imageSource;
  discoveryArt.classList.remove("image-unavailable");
  discoveryImage.hidden = false;
  discoveryImage.alt = discovery.imageAlt;
  discoveryImage.classList.remove("is-changing");
  void discoveryImage.offsetWidth;
  discoveryImage.classList.add("is-changing");
  discoveryImage.src = discovery.image;
}

if (discoveryDate && discoveryImage && discoveryArt && refreshDiscovery) {
  discoveryDate.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long", month: "long", day: "numeric"
  }).format(new Date());

  // Keep a visual fallback if a NASA image is unavailable, including after refresh.
  discoveryImage.addEventListener("error", () => {
    discoveryImage.hidden = true;
    discoveryArt.classList.add("image-unavailable");
  });

  const today = new Date();
  const dayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const dailySeed = [...dayKey].reduce((total, character) => total + character.charCodeAt(0), 0);
  let discoveryIndex = dailySeed % nasaDiscoveries.length;
  renderDiscovery(discoveryIndex);
  refreshDiscovery.addEventListener("click", () => {
    discoveryIndex = (discoveryIndex + 1) % nasaDiscoveries.length;
    renderDiscovery(discoveryIndex);
  });
}

// Reveal page sections as they enter view without hiding content when motion is reduced.
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
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

// A restrained pointer glow makes the destination cards respond to desktop visitors.
const canUsePointerGlow = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUsePointerGlow && !prefersReducedMotion) {
  document.querySelectorAll(".destination-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      card.style.setProperty("--pointer-x", `${x}%`);
      card.style.setProperty("--pointer-y", `${y}%`);
    });
  });
}

// Give the Home launch link a short, optional take-off transition before navigation.
const heroLaunchLink = document.querySelector(".hero-actions .button-primary");
if (heroLaunchLink) {
  heroLaunchLink.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = heroLaunchLink.href;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(".hero")?.classList.add("is-launching");
    window.setTimeout(() => window.location.assign(destination), reducedMotion ? 0 : 480);
  });
}

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu"
    );
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  // Close the mobile menu after a visitor chooses a page.
  primaryNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    }
  });

  // Return to the desktop navigation layout when the viewport grows.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    }
  });
}

// Read featured mission and hardware stories from the existing local mission archive.
const missionArchive = Array.isArray(window.COSMIC_MISSIONS) ? window.COSMIC_MISSIONS : [];
const hardwareGrid = document.querySelector("#home-hardware-grid");
const featuredMissionImage = document.querySelector("#featured-mission-image");
const featuredMissionArt = document.querySelector("#featured-mission-art");
const nextFeaturedMission = document.querySelector("#next-featured-mission");
let currentFeaturedMissionId = "";

function getMissionImageUrl(mission) {
  if (mission.imageUrl) return mission.imageUrl;
  const imageId = encodeURIComponent(mission.imageId || "");
  return `https://images-assets.nasa.gov/image/${imageId}/${imageId}~medium.jpg`;
}

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function addSafeExternalLink(parent, href, label, className = "") {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  if (className) link.className = className;
  parent.append(link);
  return link;
}

function renderForgottenHardware() {
  if (!hardwareGrid || missionArchive.length === 0) return;

  const entries = missionArchive.flatMap((mission) => {
    const leftBehindItems = (mission.hardware || []).filter((item) =>
      item.status === "left-behind" && item.id !== "sample-tubes"
    );
    if (leftBehindItems.length === 0) return [];
    const selectedItem = leftBehindItems[Math.floor(Math.random() * leftBehindItems.length)];
    return [{ mission, item: selectedItem }];
  });

  shuffleItems(entries).slice(0, 3).forEach(({ mission, item }) => {
    const card = document.createElement("article");
    card.className = "hardware-card";

    const icon = document.createElement("span");
    icon.className = "hardware-card-mark";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✦";

    const status = document.createElement("p");
    status.className = "hardware-status";
    status.textContent = item.status === "left-behind" ? "LEFT AT DESTINATION" : "MISSION HARDWARE";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const missionName = document.createElement("p");
    missionName.className = "hardware-mission-name";
    missionName.textContent = `${mission.title} · ${mission.year}`;

    const description = document.createElement("p");
    description.className = "hardware-description";
    description.textContent = item.description;

    const links = document.createElement("div");
    links.className = "hardware-links";
    addSafeExternalLink(links, item.sourceUrl, "NASA source ↗");

    const missionLink = document.createElement("a");
    missionLink.href = `missions.html?mission=${encodeURIComponent(mission.id)}`;
    missionLink.textContent = "Mission story →";
    links.append(missionLink);

    card.append(icon, status, title, missionName, description, links);
    hardwareGrid.append(card);
  });
}

function renderFeaturedMission(mission) {
  if (!mission || !featuredMissionImage || !featuredMissionArt) return;

  currentFeaturedMissionId = mission.id;
  document.querySelector("#featured-mission-year").textContent = `${mission.year} · ${mission.categoryLabel}`;
  document.querySelector("#featured-mission-title").textContent = mission.title;
  document.querySelector("#featured-mission-summary").textContent = mission.summary;
  document.querySelector("#featured-mission-link").href = `missions.html?mission=${encodeURIComponent(mission.id)}`;
  document.querySelector("#featured-mission-credit").textContent = mission.imageCredit || "NASA";
  document.querySelector("#featured-mission-source").href = mission.imageSourceUrl || "https://images.nasa.gov/";
  featuredMissionArt.classList.remove("image-unavailable");
  featuredMissionImage.hidden = false;
  featuredMissionImage.alt = mission.imageAlt || `NASA image for ${mission.title}.`;
  featuredMissionImage.classList.remove("is-changing");
  void featuredMissionImage.offsetWidth;
  featuredMissionImage.classList.add("is-changing");
  featuredMissionImage.src = getMissionImageUrl(mission);
}

if (featuredMissionImage && featuredMissionArt) {
  featuredMissionImage.addEventListener("error", () => {
    featuredMissionImage.hidden = true;
    featuredMissionArt.classList.add("image-unavailable");
  });
}

renderForgottenHardware();

if (missionArchive.length > 0 && nextFeaturedMission) {
  const initialMission = missionArchive[Math.floor(Math.random() * missionArchive.length)];
  renderFeaturedMission(initialMission);

  nextFeaturedMission.addEventListener("click", () => {
    const choices = missionArchive.filter((mission) => mission.id !== currentFeaturedMissionId);
    const nextMission = choices[Math.floor(Math.random() * choices.length)];
    renderFeaturedMission(nextMission);
  });
}
