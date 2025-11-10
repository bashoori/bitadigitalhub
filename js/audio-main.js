import { t } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const audioFile = document.getElementById("audioFile");
  const outputText = document.getElementById("outputText");
  const resultBox = document.getElementById("resultBox");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = audioFile.files[0];
    if (!file) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("audio", file);

    outputText.textContent = t("tools.audio.loading");
    resultBox.classList.remove("hidden");

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Transcription failed");
      const text = await res.text();
      outputText.textContent = text || "(No text detected)";
    } catch (err) {
      outputText.textContent = "⚠️ Error: Unable to process transcription.";
      console.error(err);
    }
  });
});
