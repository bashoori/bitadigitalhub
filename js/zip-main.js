// zip-main.js
document.addEventListener("DOMContentLoaded", () => {
  const modeSelect   = document.getElementById("modeSelect");
  const fileInput    = document.getElementById("fileInput");
  const processBtn   = document.getElementById("processBtn");
  const outputBox    = document.getElementById("output");
  const resultMsg    = document.getElementById("resultMsg");
  const downloadLink = document.getElementById("downloadLink");

  if (!window.JSZip) {
    console.error("JSZip not loaded");
    return;
  }

  async function handleZip(files) {
    if (!files || files.length === 0) {
      alert("Please select at least one file to compress.");
      return;
    }

    const zip = new JSZip();
    // add all files
    Array.from(files).forEach(file => {
      zip.file(file.name, file);
    });

    resultMsg.textContent = "Creating ZIP…";
    outputBox.classList.remove("hidden");

    const blob = await zip.generateAsync({ type: "blob" });
    const url  = URL.createObjectURL(blob);
    downloadLink.href     = url;
    downloadLink.download = "archive_file.zip";
    resultMsg.textContent = `✅ Compressed ${files.length} file(s). Click download.`;
  }

  async function handleUnzip(file) {
    if (!file) {
      alert("Please select a ZIP file to extract.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".zip")) {
      alert("This is not a .zip file.");
      return;
    }

    resultMsg.textContent = "Extracting ZIP…";
    outputBox.classList.remove("hidden");

    const zip = new JSZip();
    const content = await zip.loadAsync(file);

    // for demo: repackage extracted files into a new zip so user can download
    const outZip = new JSZip();
    const fileNames = [];

    await Promise.all(
      Object.keys(content.files).map(async (name) => {
        const entry = content.files[name];
        if (!entry.dir) {
          const data = await entry.async("blob");
          outZip.file(name, data);
          fileNames.push(name);
        }
      })
    );

    const outBlob = await outZip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(outBlob);
    downloadLink.href = url;
    downloadLink.download = "extracted-files.zip";

    resultMsg.textContent = `✅ Extracted ${fileNames.length} file(s). Click download.`;
  }

  processBtn.addEventListener("click", async () => {
    const mode = modeSelect.value;
    const files = fileInput.files;

    if (mode === "zip") {
      handleZip(files);
    } else {
      // unzip: we only care about the first file
      handleUnzip(files[0]);
    }
  });
});
