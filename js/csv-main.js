import { t } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const btnClean = document.getElementById("btnClean");
  const outputBox = document.getElementById("output");
  const resultMsg = document.getElementById("resultMsg");
  const downloadLink = document.getElementById("downloadLink");

  btnClean.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      let rows = [];
      const data = e.target.result;

      if (file.name.endsWith(".csv")) {
        rows = data.split("\n").map(r => r.split(","));
      } else {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      }

      const trim = document.getElementById("trimSpaces").checked;
      const drop = document.getElementById("dropEmpty").checked;
      const dupes = document.getElementById("removeDupes").checked;

      if (trim) rows = rows.map(r => r.map(v => (typeof v === "string" ? v.trim() : v)));
      if (drop) rows = rows.filter(r => r.join("").trim() !== "");
      if (dupes) {
        const unique = new Set(rows.map(r => JSON.stringify(r)));
        rows = Array.from(unique).map(r => JSON.parse(r));
      }

      const csvContent = rows.map(r => r.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      resultMsg.textContent = t("tools.csv.success");
      outputBox.classList.remove("hidden");
    };

    if (file.name.endsWith(".csv")) reader.readAsText(file);
    else reader.readAsBinaryString(file);
  });
});
