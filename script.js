// ------------------------------
//   TYPEWRITER (AUTO-TYPING)
// ------------------------------
const roles = [
  "Software Student",
  "Photographer",
  "Graphic Designer"
];

let typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let typing = true;

// Speed Controls
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const HOLD_TIME = 1500;

function typeLoop() {
  const current = roles[roleIndex];

  if (typing) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      typing = false;
      setTimeout(typeLoop, HOLD_TIME);
      return;
    }

    setTimeout(typeLoop, TYPING_SPEED);
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 300);
      return;
    }

    setTimeout(typeLoop, DELETING_SPEED);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeLoop();
});


// ------------------------------------
//    AUTO SCROLL BETWEEN SECTIONS
// ------------------------------------
const sections = [
  "home",
  "about",
  "certificates",
  "portfolio",
  "contact"
].map(id => document.getElementById(id));

let scrollIndex = 0;
let autoScrollEnabled = true;

function autoScroll() {
  if (!autoScrollEnabled) return;

  scrollIndex = (scrollIndex + 1) % sections.length;
  sections[scrollIndex].scrollIntoView({ behavior: "smooth" });
}

// Scroll every 6 seconds
let scrollInterval = setInterval(autoScroll, 6000);

// If user touches, scrolls, or presses keys — stop auto-scroll
["wheel", "touchstart", "keydown", "mousedown"].forEach(event => {
  window.addEventListener(event, () => {
    autoScrollEnabled = false;
    clearInterval(scrollInterval);
  });
});
// ------- Scroll reveal animation -------
const revealElements = document.querySelectorAll(".fade-in, .timeline-item");

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
// Theme Toggle Button
const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load saved theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeIcon.classList.replace("bx-moon", "bx-sun");
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  // Add animation classes
  toggleBtn.classList.add("clicked", "pulse");

  // Remove animation classes after animation completes
  setTimeout(() => {
    toggleBtn.classList.remove("clicked", "pulse");
  }, 600);

  // Toggle theme
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.replace("bx-moon", "bx-sun");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.replace("bx-sun", "bx-moon");
    localStorage.setItem("theme", "dark");
  }
});

// ------------------------------------
//    CUSTOM CURSOR ANIMATION
// ------------------------------------
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  // Check if cursor elements exist
  if (!cursor || !cursorFollower) {
    console.warn('Cursor elements not found');
    return; // Exit if elements don't exist
  }

  // Hide cursor on mobile devices immediately
  if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  // Initialize cursor positions to center of screen
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';

  // Update cursor position
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  };

  document.addEventListener('mousemove', handleMouseMove);

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .social-media a, .navbar a, .portfolio-box, .certificate-box, input, textarea, .theme-toggle');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    });
  });

  // Click effect
  document.addEventListener('click', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.8)';
    setTimeout(() => {
      cursor.style.transform = '';
      cursorFollower.style.transform = '';
    }, 100);
  });

  // Update cursor position on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
      document.body.style.cursor = 'auto';
    } else {
      cursor.style.display = '';
      cursorFollower.style.display = '';
      document.body.style.cursor = 'none';
    }
  });
}

// Initialize cursor after DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
  // DOM is already loaded
  initCustomCursor();
}

// ------------------------------------
//    NAVIGATION ACTIVE LINK HANDLING
// ------------------------------------
const navLinks = document.querySelectorAll('.navbar a');

// Function to set active link
function setActiveLink(clickedLink) {
  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Add active class to clicked link
  if (clickedLink) {
    clickedLink.classList.add('active');
  }
}

// Add click event listeners to all nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Get the href attribute (e.g., "#home", "#about")
    const href = link.getAttribute('href');

    // Only handle hash links (internal navigation)
    if (href.startsWith('#')) {
      // Set this link as active immediately
      setActiveLink(link);
    }
  });
});

// Update active link based on scroll position
function updateActiveLinkOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150; // Offset for header
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (correspondingLink) {
        setActiveLink(correspondingLink);
      }
    }
  });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveLinkOnScroll);

// Call on page load to set initial active state
updateActiveLinkOnScroll();

// ------------------------------------
//    LOADING SCREEN
// ------------------------------------
(function () {
  const loader = document.getElementById('loader-wrapper');
  const body = document.body;
  const startTime = Date.now();
  const minDisplayTime = 1800; // Minimum 1.8 seconds
  const maxDisplayTime = 2500; // Maximum 2.5 seconds

  if (!loader) return;

  // Add loading class to body
  body.classList.add('loading');

  // Hide loader after optimal time
  function hideLoader() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

    setTimeout(() => {
      loader.classList.add('hidden');
      body.classList.remove('loading');
      body.classList.add('loaded');

      // Remove loader from DOM after fade out
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, remainingTime);
  }

  // Wait for page to fully load, then hide loader
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
})();
