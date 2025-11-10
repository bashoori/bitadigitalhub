/* =========================================================
🌐 Bita Digital Hub – Main JS
========================================================= */

import { qs, qsa, fetchHTML } from "./utils.js";
import { initThemeToggle } from "./theme.js";
import { initI18n } from "./i18n.js";

document.addEventListener("DOMContentLoaded", async () => {
  await fetchHTML("../components/header.html", "#header");
  await fetchHTML("../components/footer.html", "#footer");

  highlightActiveNav();
  setupDropdowns();
  initThemeToggle();
  initI18n(); // 💬 bilingual magic
});

function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop();
  qsa(".nav-links a").forEach((link) => {
    if (link.getAttribute("href")?.includes(current)) {
      link.classList.add("active");
    }
  });
}

function setupDropdowns() {
  qsa(".dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector(".dropbtn");
    const menu = dropdown.querySelector(".dropdown-content");
    if (!button || !menu) return;
    dropdown.addEventListener("mouseenter", () => (menu.style.display = "block"));
    dropdown.addEventListener("mouseleave", () => (menu.style.display = "none"));
  });
}
