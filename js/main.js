// Animaciones con Anime.js y comportamiento interactivo
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Hero entrance
  anime
    .timeline({})
    .add({
      targets: ".brand",
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutQuad",
    })
    .add(
      {
        targets: ".nav-links li",
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(80),
        easing: "easeOutQuad",
      },
      "-=600"
    )
    .add(
      {
        targets: ".hero-title",
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 900,
        easing: "easeOutExpo",
      },
      "-=400"
    )
    .add(
      {
        targets: ".hero-subtitle",
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 700,
        easing: "easeOutBack",
      },
      "-=500"
    )
    .add(
      {
        targets: ".hero-desc",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        easing: "easeOutQuad",
      },
      "-=400"
    )
    .add(
      {
        targets: ".hero-cta .btn",
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: "easeOutBack",
      },
      "-=300"
    );

  // Pulsing logo circle
  anime({
    targets: ".logo-circle.big",
    scale: [0.98, 1.02],
    duration: 2000,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true,
  });

  // Counters with Intersection Observer
  const counters = document.querySelectorAll(".counter");
  const observerOptions = { threshold: 0.5 };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        const target = +entry.target.dataset.target;
        anime({
          targets: entry.target,
          innerHTML: [0, target],
          round: 1,
          easing: "easeOutExpo",
          duration: 2000,
        });
      }
    });
  }, observerOptions);

  counters.forEach((c) => counterObserver.observe(c));

  // Simple smooth scroll for nav links - only for anchor links on same page
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      // Only prevent default for anchor links (starting with #)
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      // For other links (.html files), let the browser handle navigation normally
    });
  });

  // Mobile menu toggle
  const toggle = document.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const links = document.querySelector(".nav-links");
    links.style.display = links.style.display === "flex" ? "none" : "flex";
    links.style.flexDirection = "column";
  });

  // Auto-play carousel slowed via JavaScript (keeps CSS fallback)
  // make it continuous by translating track with anime
  const track = document.querySelector(".carousel-track");
  if (track) {
    anime({
      targets: track,
      translateX: ["0%", "-40%"],
      duration: 20000,
      easing: "linear",
      loop: true,
    });
  }

  // Country click handler - placeholder to redirect to country pages
  document.querySelectorAll(".country").forEach((c) => {
    c.addEventListener("click", (e) => {
      e.preventDefault();
      const country = c.dataset.country;
      // For now, show a small animation then navigate (placeholder)
      anime({
        targets: c,
        scale: [1, 1.05, 1],
        duration: 600,
        easing: "easeInOutQuad",
      });
      // In production, link to proper page: `/paises/${country}.html`
    });
  });

  // Section animations on scroll
  const sections = document.querySelectorAll(".section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: "easeOutQuad",
          });
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((s) => {
    s.style.opacity = "0";
    sectionObserver.observe(s);
  });
});
