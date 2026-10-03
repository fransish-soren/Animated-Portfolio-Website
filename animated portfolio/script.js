
// Page Loader
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hide");
    }
  }, 500);
});

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
});
// ==========================================
// Mobile Navigation
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking a navigation link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.classList.remove("active");
    });
  });
}
// ==========================================
// Typing Animation
// ==========================================
const words = [
  "Frontend Developer",
  "UI Creator",
  "Creative Coder",
  "Web Experience Builder"
];

const typing = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typing) return;

  const currentWord = words[wordIndex];

  // Display text
  typing.textContent = currentWord.slice(0, charIndex);

  let delay = isDeleting ? 55 : 95;

  // Finished typing
  if (!isDeleting && charIndex === currentWord.length) {
    delay = 1300;
    isDeleting = true;
  }

  // Finished deleting
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 350;
  }

  // Add or remove characters
  else {
    charIndex += isDeleting ? -1 : 1;
  }

  setTimeout(type, delay);
}

// Start typing animation
type();
// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll(".reveal, .skills");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// ==========================================
// PROJECT FILTER
// ==========================================

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

if (filters.length && projects.length) {
  filters.forEach((button) => {
    button.addEventListener("click", () => {

      // Remove active class
      filters.forEach((filter) => {
        filter.classList.remove("active");
      });

      // Add active class
      button.classList.add("active");

      const filterValue = button.dataset.filter;

      projects.forEach((project) => {
        const category = project.dataset.category;

        const shouldHide =
          filterValue !== "all" && category !== filterValue;

        project.classList.toggle("hide", shouldHide);
      });
    });
  });
}


// ==========================================
// CUSTOM CURSOR
// ==========================================

const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

if (cursor && cursorDot) {

  window.addEventListener("mousemove", (event) => {

    const x = event.clientX;
    const y = event.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
  });


  // Cursor hover effect
  const cursorTargets = document.querySelectorAll(
    "a, button, .service-card, .project"
  );

  cursorTargets.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.style.width = "52px";
      cursor.style.height = "52px";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.width = "34px";
      cursor.style.height = "34px";
    });

  });
}


// ==========================================
// HERO MOUSE PARALLAX
// ==========================================

const hero = document.querySelector(".hero");

if (hero) {

  const heroVisual = hero.querySelector(".hero-visual");

  if (heroVisual) {

    window.addEventListener("mousemove", (event) => {

      // Disable parallax on smaller screens
      if (window.innerWidth <= 900) {
        heroVisual.style.transform = "";
        return;
      }

      const x =
        (event.clientX / window.innerWidth - 0.5) * 10;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 8;

      heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;
    });

  }
}