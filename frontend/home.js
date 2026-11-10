// Mobile navigation: keep the menu state available to assistive technology.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

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
