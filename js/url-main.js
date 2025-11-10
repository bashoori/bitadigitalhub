import { t } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const shortenBtn = document.getElementById("shortenBtn");
  const urlInput = document.getElementById("urlInput");
  const output = document.getElementById("output");
  const resultMsg = document.getElementById("resultMsg");
  const shortLink = document.getElementById("shortLink");

  shortenBtn.addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL starting with http or https.");
      return;
    }

    // Simple short-link simulation
    const randomSlug = Math.random().toString(36).substring(2, 8);
    const shortUrl = `https://bitadigitalhub.link/${randomSlug}`;

    // Update UI
    output.classList.remove("hidden");
    resultMsg.textContent = t("tools.urlShortener.success");
    shortLink.href = shortUrl;
    shortLink.textContent = shortUrl;
  });
});
