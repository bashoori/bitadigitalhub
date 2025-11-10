import { t } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const qrCanvas = document.getElementById("qrCanvas");
  const qr = new QRious({ element: qrCanvas, size: 220 });
  const input = document.getElementById("qrText");
  const resultBox = document.getElementById("qrResult");
  const downloadBtn = document.getElementById("downloadBtn");
  const generateBtn = document.getElementById("generateBtn");

  generateBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) {
      alert(t("tools.qrGenerator.label"));
      return;
    }
    qr.value = value;
    resultBox.classList.remove("hidden");
    downloadBtn.href = qr.toDataURL("image/png");
  });
});

