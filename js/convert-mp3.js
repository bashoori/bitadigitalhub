document.addEventListener("DOMContentLoaded", async () => {
  const { createFFmpeg, fetchFile } = FFmpeg;
  const ffmpeg = createFFmpeg({ log: true });
  const fileInput = document.getElementById("fileInput");
  const convertBtn = document.getElementById("convertBtn");
  const outputBox = document.getElementById("outputBox");
  const statusMsg = document.getElementById("statusMsg");
  const downloadLink = document.getElementById("downloadLink");

  convertBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Please choose a video or audio file.");

    outputBox.classList.remove("hidden");
    statusMsg.textContent = "Loading FFmpeg...";

    await ffmpeg.load();

    statusMsg.textContent = "Converting to MP3...";
    const inputFileName = file.name;
    const outputFileName = "output.mp3";

    ffmpeg.FS("writeFile", inputFileName, await fetchFile(file));

    await ffmpeg.run("-i", inputFileName, "-vn", "-ar", "44100", "-ac", "2", "-b:a", "192k", outputFileName);

    const data = ffmpeg.FS("readFile", outputFileName);
    const blob = new Blob([data.buffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
    statusMsg.textContent = "✅ Conversion complete!";
  });
});
