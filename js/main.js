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

  // Modal de Noticias
  const newsContent = {
    1: {
      title: "Historias que inspiran",
      image: "img/5. FOTOS/WhatsApp Image 2025-08-09 at 10.09.24 AM (5).jpeg",
      description: `
        <p>En Latinoamérica Comparte, cada historia es una prueba de que la transformación personal conduce a la transformación empresarial. Nuestros programas han impactado a más de 1,200 familias en toda la región, ayudándolas a recuperar su productividad y esperanza.</p>
        
        <h4>Emprendedores que transforman</h4>
        <p>Conoce las historias de personas que, después de enfrentar pérdidas significativas, encontraron en nuestros programas el apoyo necesario para reconstruir sus vidas y emprendimientos. Desde pequeños negocios familiares hasta empresas que hoy emplean a decenas de personas, cada caso es único y motivador.</p>
        
        <h4>Impacto real en comunidades</h4>
        <p>Nuestros emprendedores no solo reconstruyen sus propias vidas, sino que también generan empleo y desarrollo en sus comunidades. A través de:</p>
        <ul>
          <li>Programas de capacitación en emprendimiento con propósito</li>
          <li>Acompañamiento personalizado por 12 meses</li>
          <li>Acceso a redes de mentores y empresarios exitosos</li>
          <li>Financiamiento inicial para proyectos sostenibles</li>
        </ul>
        
        <p>Cada mes compartimos nuevas historias de éxito que demuestran que cuando una persona encuentra su propósito, puede transformar no solo su vida, sino toda su comunidad.</p>
      `,
    },
    2: {
      title: "Noticias corporativas",
      image: "img/5. FOTOS/Evento ACRIP.jpeg",
      description: `
        <p>Latinoamérica Comparte continúa expandiendo su red de impacto a través de nuevas alianzas estratégicas con empresas líderes en la región. Nuestro compromiso con el bienestar empresarial y la productividad con propósito nos ha llevado a establecer colaboraciones innovadoras.</p>
        
        <h4>Nuevas alianzas estratégicas</h4>
        <p>Este año hemos sumado a nuestra red más de 15 empresas comprometidas con el bienestar de sus colaboradores. Estas alianzas nos permiten:</p>
        <ul>
          <li>Implementar programas de bienestar corporativo personalizados</li>
          <li>Desarrollar cultura organizacional orientada al propósito</li>
          <li>Ofrecer acompañamiento a colaboradores en situaciones de duelo o pérdida</li>
          <li>Crear redes de apoyo entre empresas de diferentes sectores</li>
        </ul>
        
        <h4>Expansión regional</h4>
        <p>Después del éxito en Colombia, Ecuador, Chile y Argentina, estamos evaluando expandir nuestras operaciones a Perú y México en el próximo año. Cada país que se suma a esta red multiplica el impacto positivo en la región.</p>
        
        <h4>Reconocimientos</h4>
        <p>Recientemente fuimos reconocidos por ACRIP como uno de los programas más innovadores en bienestar corporativo en Latinoamérica, destacando nuestro enfoque integral que combina el desarrollo personal con la productividad empresarial.</p>
      `,
    },
    3: {
      title: "Eventos y conferencias",
      image: "img/5. FOTOS/people-taking-part-high-protocol-event.jpg",
      description: `
        <p>Nuestros eventos "Red que Transforma" se han convertido en espacios de inspiración, aprendizaje y conexión para líderes empresariales, emprendedores y profesionales de toda Latinoamérica.</p>
        
        <h4>Red que Transforma 2025</h4>
        <p>Nuestro evento insignia reunirá en cada país a más de 500 líderes empresariales para compartir experiencias, estrategias y casos de éxito sobre:</p>
        <ul>
          <li>Liderazgo con propósito en tiempos de cambio</li>
          <li>Cultura organizacional que prioriza el bienestar</li>
          <li>Innovación en programas de desarrollo humano</li>
          <li>Resiliencia empresarial y transformación personal</li>
        </ul>
        
        <h4>Top Speakers internacionales</h4>
        <p>Contamos con la participación de reconocidos conferencistas y líderes de pensamiento de toda la región, incluyendo CEOs de empresas Fortune 500, emprendedores sociales y expertos en desarrollo humano y organizacional.</p>
        
        <h4>Próximos eventos</h4>
        <p><strong>Bogotá, Colombia:</strong> 15 de marzo, 2025<br>
        <strong>Quito, Ecuador:</strong> 22 de abril, 2025<br>
        <strong>Santiago, Chile:</strong> 10 de junio, 2025<br>
        <strong>Buenos Aires, Argentina:</strong> 18 de agosto, 2025</p>
        
        <p>Cada evento incluye talleres prácticos, sesiones de networking y oportunidades de crear alianzas estratégicas con empresas y líderes de diferentes sectores.</p>
      `,
    },
  };

  // Modal de Noticias - Abrir y cerrar
  const modal = document.getElementById("newsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.querySelector(".modal-close");

  // Abrir modal al hacer click en "Ver más"
  document.querySelectorAll(".read-more").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const newsId = btn.getAttribute("data-news");
      const content = newsContent[newsId];

      if (content && modal) {
        modalTitle.textContent = content.title;
        modalImage.src = content.image;
        modalImage.alt = content.title;
        modalDescription.innerHTML = content.description;

        modal.style.display = "flex";
        anime({
          targets: modal,
          opacity: [0, 1],
          duration: 300,
          easing: "easeOutQuad",
        });
        anime({
          targets: ".modal-content",
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 400,
          easing: "easeOutBack",
        });
      }
    });
  });

  // Cerrar modal al hacer click en X
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      anime({
        targets: modal,
        opacity: [1, 0],
        duration: 300,
        easing: "easeInQuad",
        complete: () => {
          modal.style.display = "none";
        },
      });
    });
  }

  // Cerrar modal al hacer click fuera del contenido
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        anime({
          targets: modal,
          opacity: [1, 0],
          duration: 300,
          easing: "easeInQuad",
          complete: () => {
            modal.style.display = "none";
          },
        });
      }
    });
  }

  // Cerrar modal con la tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "flex") {
      anime({
        targets: modal,
        opacity: [1, 0],
        duration: 300,
        easing: "easeInQuad",
        complete: () => {
          modal.style.display = "none";
        },
      });
    }
  });

  // Mostrar campos adicionales del formulario para empresas
  const empresaBtn = document.getElementById("empresaInfoBtn");
  const camposEmpresa = document.getElementById("camposEmpresa");

  if (empresaBtn && camposEmpresa) {
    empresaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Scroll al formulario
      document
        .getElementById("contacto")
        .scrollIntoView({ behavior: "smooth" });

      // Mostrar campos adicionales después de un pequeño delay
      setTimeout(() => {
        camposEmpresa.style.display = "block";
        anime({
          targets: camposEmpresa,
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 600,
          easing: "easeOutQuad",
        });
      }, 800);
    });
  }

  // Envío del formulario
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Gracias por contactarnos. Pronto nos pondremos en contacto contigo."
      );
      contactForm.reset();
      if (camposEmpresa) camposEmpresa.style.display = "none";
    });
  }

  // Duplicar elementos del carrusel para efecto infinito
  const teamCarousel = document.querySelector(".team-carousel");
  if (teamCarousel) {
    const cards = teamCarousel.innerHTML;
    teamCarousel.innerHTML = cards + cards;
  }
});
