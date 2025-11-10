/* =========================================================
🌓 Bita Digital Hub – Theme Manager
Handles dark/light toggle with persistence
========================================================= */

export function initThemeToggle() {
  const themeToggle = document.querySelector("#theme-toggle");
  if (!themeToggle) return;

  // Load user preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateToggleIcon(savedTheme);

  // Toggle listener
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateToggleIcon(next);
  });
}

/* --------------------------
Helper: Change icon/text
--------------------------- */
function updateToggleIcon(theme) {
  const icon = document.querySelector("#theme-icon");
  if (!icon) return;
  icon.textContent = theme === "dark" ? "🌙" : "☀️";
}
