/* =========================================================
📜 Bita Digital Hub – Global Script
Handles header/footer injection, language toggle,
smooth scrolling, and mobile navigation.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
     🧭 Load Header
  ========================== */
  fetch("components/header.html")
    .then(res => res.text())
    .then(html => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (!headerPlaceholder) return;

      headerPlaceholder.innerHTML = html;

      /* 🌍 Language Dropdown */
      const langBtn = document.getElementById("lang-btn");
      const langMenu = document.getElementById("lang-menu");

      if (langBtn && langMenu) {
        langBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          langMenu.classList.toggle("show");
        });
        document.addEventListener("click", (e) => {
          if (!langBtn.contains(e.target)) langMenu.classList.remove("show");
        });
      }

      /* 🌀 Smooth Scroll for Nav Links */
      document.querySelectorAll('.nav-links a[href^="#"], .get-started[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }

          // Close mobile menu after clicking a link
          const navLinks = document.querySelector(".nav-links");
          const menuToggle = document.querySelector(".menu-toggle");
          if (navLinks && menuToggle) {
            navLinks.classList.remove("show");
            menuToggle.classList.remove("open");
          }
        });
      });

      /* 📱 Mobile Menu Toggle */
      const menuToggle = document.querySelector(".menu-toggle");
      const navLinks = document.querySelector(".nav-links");

      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("show");
          menuToggle.classList.toggle("open");
        });
      }
    })
    .catch(err => console.error("Header load error:", err));


  /* ==========================
     🦶 Load Footer
  ========================== */
  fetch("components/footer.html")
    .then(res => res.text())
    .then(html => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (!footerPlaceholder) return;

      footerPlaceholder.innerHTML = html;

      // Smooth scroll for footer anchor links
      document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute("href"));
          if (target) target.scrollIntoView({ behavior: "smooth" });
        });
      });
    })
    .catch(err => console.error("Footer load error:", err));
});
