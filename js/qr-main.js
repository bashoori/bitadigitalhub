<!DOCTYPE html>
<html lang="en" data-page="tools">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QR Generator | Bita Digital Hub</title>
  <meta name="description" content="Generate custom QR codes instantly — perfect for links, campaigns, and products." />

  <link rel="icon" type="image/svg+xml" href="../assets/taskhub-logo.svg" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/theme.css" />
  <link rel="stylesheet" href="../css/components.css" />
  <link rel="stylesheet" href="../css/responsive.css" />
</head>

<body>
  <div id="header-placeholder"></div>
  <script>
    fetch("../components/header-tools.html")
      .then(res => res.text())
      .then(html => { document.getElementById("header-placeholder").innerHTML = html; });
  </script>

  <main class="tool-layout">
    <aside class="ad-side"></aside>

    <section class="tool-center">
      <div class="tool-card gradient-yellow">
        <h2>QR Generator 🟨</h2>
        <p>Create QR codes for URLs or text — download instantly as PNG.</p>

        <form class="tool-form" onsubmit="return false;">
          <label for="qrText">Enter text or URL:</label>
          <input type="text" id="qrText" class="text-input" placeholder="https://bitadigitalhub.com" />

          <button type="button" id="generateQRBtn" class="primary-btn">Generate QR</button>

          <div id="output" class="output-box hidden">
            <canvas id="qrCanvas"></canvas>
            <a id="downloadLink" class="secondary-btn" download="bita-qr.png">Download PNG</a>
          </div>
        </form>
      </div>
    </section>

    <aside class="ad-side"></aside>
  </main>

  <div id="footer-placeholder"></div>
  <script>
    fetch("../components/footer-tools.html")
      .then(res => res.text())
      .then(html => { document.getElementById("footer-placeholder").innerHTML = html; });
  </script>

  <!-- QR library -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js" defer></script>
  <!-- your script (below one depends on the library) -->
  <script src="../js/qr-main.js" defer></script>
</body>
</html>
