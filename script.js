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
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.replace("bx-moon", "bx-sun");
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.classList.replace("bx-sun", "bx-moon");
        localStorage.setItem("theme", "dark");
    }
});

