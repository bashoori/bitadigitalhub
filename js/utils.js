/* =========================================================
🧩 Bita Digital Hub – Utility Helpers
========================================================= */

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

export async function fetchHTML(url, targetSelector) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const target = qs(targetSelector);
    if (target) target.innerHTML = html;
  } catch (err) {
    console.error(`❌ Failed to load ${url}:`, err);
  }
}
