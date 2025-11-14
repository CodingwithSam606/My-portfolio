// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.createElement("div");
menuToggle.className = "menu-toggle";
menuToggle.innerHTML = "☰";
document.querySelector("header").appendChild(menuToggle);

const navMenu = document.querySelector("header nav ul");
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Close menu on link click (for mobile)
window.addEventListener("load", function() {
  const loader = document.getElementById("loader");

  // Add fade-out effect
  loader.style.transition = "opacity 1.5s ease";
  loader.style.opacity = "0";

  // Remove loader from DOM after fade
  setTimeout(() => {
    loader.style.display = "none";
  }, 500); 
});


// =======================
// ✨ SECTION FADE-IN ANIMATION
// =======================
document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Hero & About Text Fade-In
  // ==========================
  const textElements = document.querySelectorAll(
    ".hero .intro .greeting, .hero .intro p, .hero .intro h1, .hero .intro h3, .about h2, .about p"
  );

  const textObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          textObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  textElements.forEach(el => textObserver.observe(el));

  // ==========================
  // Sections Fade-In (Skills, Portfolio, Contact, Footer)
  // ==========================
  const sections = document.querySelectorAll("#skills, #portfolio, #contact, #footer");

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-fade");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 } // triggers even if slightly visible
  );

  sections.forEach(section => sectionObserver.observe(section));

  // ==========================
  // Staggered Hero Intro Fade-In (optional timing for greeting + lines)
  // ==========================
  const heroElements = document.querySelectorAll('.hero .intro .greeting, .hero .intro p, .hero .intro h1, .hero .intro h3');

  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('fade-in');
    }, index * 300); // 300ms gap between lines
  });
});

// ============================
// ✨ Fade animation for Hero & About text only
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const textElements = document.querySelectorAll(
    ".hero .intro p, .hero .intro h1, .hero .intro h3, .about h2, .about p"
  );

  const observerText = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observerText.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  textElements.forEach(el => observerText.observe(el));

  // ============================
  // ✨ Fade animation for entire sections (Skills, Portfolio, Contact, footer)
  // ============================
  const fullSections = document.querySelectorAll(
    "#skills, #portfolio, #contact, #footer"
  );

  const observerSection = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-fade");
          observerSection.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fullSections.forEach(sec => observerSection.observe(sec));
});

// ============================
// 🎨 Portfolio Clickable Projects
// ============================
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    const link = project.getAttribute('data-link');
    if (link) window.open(link, '_blank');
  });
});

// ============================
// 📧 Contact Form Submission with Confirmation
// ============================
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const proceed = confirm(
    "Note: This form only sends your message to my email. No information is collected or stored.\n\nClick OK to continue."
  );

  if (!proceed) return;

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      alert("Your message has been sent successfully!");
      form.reset();
    } else {
      response.json().then(data => {
        console.error('Formspree error:', data);
        alert('Oops! There was a problem submitting your form.');
      });
    }
  })
  .catch(error => {
    console.error('Network error:', error);
    alert('Oops! There was a problem submitting your form.');
  });
});

// ============================
// 🌗 Dark/Light Mode Toggle
// ============================

document.addEventListener("DOMContentLoaded", () => {
  // 🌗 DARK MODE TOGGLE
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const twitterIcon = document.getElementById("twitter-icon");

function updateTwitterIcon(isDark) {
  const width = window.innerWidth;
  if (!twitterIcon) return;

  const isPhone = width <= 480;
  const isIpadPro = width >= 992 && width <= 1024;

  if (isPhone) {
    twitterIcon.src = isDark
      ? "/static/icons8-twitter-50 (1).png"     // white icon on dark
      : "/static/icons8-twitter-50.png"; // black icon on light
  } else if (isIpadPro) {
    twitterIcon.src = isDark
      ? "/static/icons8-twitter-50 (1).png" // black icon on dark
      : "/static/icons8-twitter-50.png";   // white icon on light
  } else {
    twitterIcon.src = isDark
      ? "/static/icons8-twitter-50.png"     // white icon on dark
      : "/static/icons8-twitter-50 (1).png"; // black icon on light
  }
}

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.src = "/static/icons8-toggle-on-24.png";
    updateTwitterIcon(true);
  } else {
    updateTwitterIcon(false);
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    themeIcon.src = isDark
      ? "/static/icons8-toggle-on-24.png"
      : "/static/icons8-toggle-off-24.png";

    updateTwitterIcon(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  window.addEventListener("resize", () => {
    const isDark = document.body.classList.contains("dark-mode");
    updateTwitterIcon(isDark);
  });

  // 🧾 CV DOWNLOAD MODAL
  const modal = document.getElementById("cvModal");
  const downloadBtn = document.querySelector(".download-btn");
  const closeModal = document.querySelector(".close");
  const confirmDownload = document.querySelector(".confirm-download");

  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  if (confirmDownload) {
    confirmDownload.addEventListener("click", () => {
      modal.style.display = "none";
      // ✅ Let browser handle download via <a download>
    });
  }
});
