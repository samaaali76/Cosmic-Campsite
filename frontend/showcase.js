(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  // A slim flight-path line mirrors the visitor's position on longer pages.
  const pageProgress = document.createElement("div");
  pageProgress.className = "cosmic-page-progress";
  pageProgress.setAttribute("aria-hidden", "true");
  document.body.append(pageProgress);

  let scrollFrame = 0;
  const updateScrollEffects = () => {
    scrollFrame = 0;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    document.documentElement.style.setProperty("--cosmic-page-progress", String(Math.min(1, Math.max(0, progress))));

    const planetArtwork = document.querySelector(".planet-showcase-wrap");
    if (planetArtwork && !reducedMotion.matches) {
      planetArtwork.style.setProperty("--cosmic-scroll-drift", `${Math.min(14, window.scrollY * .025).toFixed(1)}px`);
    }
  };
  const requestScrollEffects = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener("scroll", requestScrollEffects, { passive: true });
  window.addEventListener("resize", requestScrollEffects, { passive: true });
  requestScrollEffects();

  // Reveal each content chapter as it enters view; keep the hero artwork visible
  // at load and leave all content immediately available when motion is reduced.
  const main = document.querySelector("main");
  const contentSections = main ? [...main.children].filter((element) =>
    element.matches("section") && !element.matches(".hero, .page-hero, .journey-hero, .progress-hero, .auth-main") && !element.hidden
  ) : [];
  if (contentSections.length && !reducedMotion.matches && "IntersectionObserver" in window) {
    document.body.classList.add("cinematic-motion-ready");
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-cinematic-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    contentSections.forEach((section, index) => {
      section.classList.add("cinematic-reveal");
      section.dataset.cinematicOrder = String(index % 5);
      sectionObserver.observe(section);
    });
  } else {
    contentSections.forEach((section) => section.classList.add("is-cinematic-visible"));
  }

  const tiltTargets = [
    ".destination-card", ".hardware-card", ".mission-card", ".planet-card",
    ".related-mission-card", ".journey-mission-card", ".journey-stop",
    ".clearance-card", ".badge-card", ".summary-card", ".mission-log-card",
    ".attempt-card", ".planet-pick", ".auth-card"
  ].join(",");

  function closeFlightDeck() {
    const menu = document.querySelector("#primary-navigation");
    const toggle = document.querySelector(".menu-toggle");
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }

  document.querySelector("#primary-navigation")?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeFlightDeck();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFlightDeck();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeFlightDeck();
  }, { passive: true });

  if (!finePointer.matches || reducedMotion.matches) return;

  let activeCard = null;
  document.addEventListener("pointermove", (event) => {
    const card = event.target instanceof Element ? event.target.closest(tiltTargets) : null;
    if (!card) return;
    activeCard = card;
    const bounds = card.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;
    card.classList.add("cosmic-tilt-card");
    card.style.setProperty("--cosmic-x", `${Math.round(horizontal * 100)}%`);
    card.style.setProperty("--cosmic-y", `${Math.round(vertical * 100)}%`);
    card.style.setProperty("--cosmic-tilt-x", `${((.5 - vertical) * 4).toFixed(2)}deg`);
    card.style.setProperty("--cosmic-tilt-y", `${((horizontal - .5) * 4).toFixed(2)}deg`);
  }, { passive: true });

  document.addEventListener("pointerout", (event) => {
    if (!activeCard || (event.relatedTarget instanceof Node && activeCard.contains(event.relatedTarget))) return;
    activeCard.style.removeProperty("--cosmic-tilt-x");
    activeCard.style.removeProperty("--cosmic-tilt-y");
    activeCard.classList.remove("cosmic-tilt-card");
    activeCard = null;
  }, { passive: true });

  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches && activeCard) {
      activeCard.style.removeProperty("--cosmic-tilt-x");
      activeCard.style.removeProperty("--cosmic-tilt-y");
      activeCard.classList.remove("cosmic-tilt-card");
      activeCard = null;
    }
  });
})();
