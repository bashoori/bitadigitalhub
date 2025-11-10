/* =========================================================
🌐 Bita Digital Hub – Internationalization (i18n)
========================================================= */

import { qs } from "./utils.js";

export async function initI18n() {
  const storedLang = localStorage.getItem("lang") || "en";
  await loadLanguage(storedLang);

  // Listen for toggle clicks
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    const lang = btn.getAttribute("data-lang");
    changeLanguage(lang);
  });
}

/* --------------------------
Load translation JSON
--------------------------- */
async function loadLanguage(lang) {
  try {
    const res = await fetch("../lang/site-text.json");
    const data = await res.json();
    applyTranslations(data[lang]);
    setLanguageDir(lang);
    localStorage.setItem("lang", lang);
  } catch (err) {
    console.error("❌ Failed to load translations:", err);
  }
}

/* --------------------------
Apply translations by [data-i18n] keys
--------------------------- */
function applyTranslations(dict) {
  if (!dict) return;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n").split(".");
    let value = dict;
    keys.forEach((k) => (value = value?.[k]));
    if (value) el.textContent = value;
  });
}

/* --------------------------
Switch direction + font
--------------------------- */
function setLanguageDir(lang) {
  document.body.dir = lang === "fa" ? "rtl" : "ltr";
  document.body.style.fontFamily =
    lang === "fa"
      ? "Vazirmatn, system-ui, sans-serif"
      : "system-ui, -apple-system, Roboto, sans-serif";
}

/* --------------------------
Public function for switching language
--------------------------- */
export function changeLanguage(lang) {
  loadLanguage(lang);
}
