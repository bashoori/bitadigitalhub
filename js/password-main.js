import { t } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnGenerate = document.getElementById("btnGenerate");
  const btnCopy = document.getElementById("btnCopy");
  const lengthInput = document.getElementById("length");
  const output = document.getElementById("output");
  const pwdText = document.getElementById("pwdText");
  const copyMsg = document.getElementById("copyMsg");

  function generatePassword() {
    const length = parseInt(lengthInput.value, 10) || 12;
    const lower = document.getElementById("lower").checked;
    const upper = document.getElementById("upper").checked;
    const nums = document.getElementById("nums").checked;
    const syms = document.getElementById("syms").checked;

    let chars = "";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (nums) chars += "0123456789";
    if (syms) chars += "!@#$%^&*()_-+=[]{};:,.?/";

    if (!chars) {
      alert("Select at least one option.");
      return "";
    }

    let pwd = "";
    for (let i = 0; i < Math.min(length, 40); i++) {
      const idx = Math.floor(Math.random() * chars.length);
      pwd += chars[idx];
    }
    return pwd;
  }

  btnGenerate.addEventListener("click", () => {
    const pwd = generatePassword();
    if (!pwd) return;
    pwdText.textContent = pwd;
    output.classList.remove("hidden");
    copyMsg.style.display = "none";
  });

  btnCopy.addEventListener("click", async () => {
    const text = pwdText.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyMsg.textContent = t("tools.password.copied");
      copyMsg.style.display = "block";
    } catch {
      copyMsg.textContent = "Copy failed.";
      copyMsg.style.display = "block";
    }
  });
});
