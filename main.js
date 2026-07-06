const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sections = document.querySelectorAll(".content-section");
const descriptionToggles = document.querySelectorAll(
  ".description-toggle[data-description]",
);
const pronunciationTrigger = document.getElementById("pronunciationTrigger");
const pronunciationSound = document.getElementById("pronunciationSound");

function showSection(sectionId) {
  sections.forEach((section) => {
    section.hidden = section.id !== sectionId;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === sectionId);
  });

  // Lazy-load the PDF iframe on first open
  if (sectionId === "resume-section") {
    const iframe = document.querySelector("#resume-section .pdf");
    if (iframe && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
      delete iframe.dataset.src;
    }
  }
}

// Navigation link click event listeners
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const sectionId = link.dataset.section;
    const isActive = link.classList.contains("is-active");

    if (isActive) {
      showSection(null);
      return;
    }

    showSection(sectionId);
  });
});

// Pronunciation trigger click event listener
if (pronunciationTrigger && pronunciationSound) {
  pronunciationTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    pronunciationSound.play();
  });
}

// Description toggle click event listeners
descriptionToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.preventDefault();

    const descriptionId = toggle.dataset.description;
    const description = document.getElementById(descriptionId);

    if (!description) return;

    const isExpanded = description.classList.toggle("is-clamped") === false;
    toggle.textContent = isExpanded ? "[Read less]" : "[Read more]";
    toggle.classList.toggle("is-active", isExpanded);
  });
});

//---------------------------------------------------------------
// SETTINGS PANEL EVENT LISTENERS
//---------------------------------------------------------------

const settingsPanel = document.getElementById("settings-panel");
const settingsToggle = document.getElementById("settingsToggle");
const settingsSection = document.getElementById("settings");

if (settingsPanel) {
  settingsPanel.addEventListener("hover", (event) => {
    event.stopPropagation();
    settingsPanel.classList.add("is-open");
  });
}

if (settingsToggle && settingsSection) {
  settingsToggle.addEventListener("click", (event) => {
    event.preventDefault();
    const isHidden = settingsSection.hidden;
    settingsSection.hidden = !isHidden;
    settingsPanel.classList.toggle("is-open", isHidden);
    settingsToggle.innerHTML = isHidden
      ? '[<span class="toggle-symbol">−</span>] Accessibility'
      : '[<span class="toggle-symbol">+</span>] Accessibility';
    settingsToggle.classList.toggle("is-active", isHidden);
  });
}

const colourModeToggle = document.getElementById("colourModeToggle");
const animationsToggle = document.getElementById("animationsToggle");
const sailorVenusImg = document.querySelector(
  'img[src="assets/sailor-venus.gif"]',
);

colourModeToggle.addEventListener("click", (event) => {
  event.preventDefault();
  const isDark = document.body.classList.toggle("is-dark");
  colourModeToggle.textContent = isDark ? "[Light mode]" : "[Dark mode]";
  colourModeToggle.classList.toggle("is-active", isDark);
});
animationsToggle.addEventListener("click", (event) => {
  event.preventDefault();
  const isPaused = document.body.classList.toggle("animations-paused");

  if (isPaused) {
    sailorVenusImg.src = "assets/sailor-venus.jpeg";
    animationsToggle.textContent = "[Play GIF]";
    animationsToggle.classList.add("is-active");
  } else {
    sailorVenusImg.src = "assets/sailor-venus.gif";
    animationsToggle.textContent = "[Pause GIF]";
    animationsToggle.classList.remove("is-active");
  }
});

//---------------------------------------------------------------
// SCREENSAVER
//---------------------------------------------------------------

const screensaver = document.getElementById("screensaver");

let idleTime = 41000;
let idleTimer = setTimeout(activateScreensaver, idleTime);

let circleTime = 1000;
let circleTimer = null;

function activateScreensaver() {
  document.body.classList.add("idle");
  circleTimer = setTimeout(() => {
    drawRandomCircle();
    resetCircleTimer();
  }, circleTime);
}

["mousemove", "click", "scroll"].forEach((event) => {
  document.addEventListener(event, clearSaver);
});

function clearSaver() {
  clearTimeout(idleTimer);
  clearTimeout(circleTimer);
  circleTimer = null;

  document.body.classList.remove("idle");
  clearCircles();

  idleTimer = setTimeout(activateScreensaver, idleTime);
}

function resetCircleTimer() {
  clearTimeout(circleTimer);
  circleTimer = setTimeout(() => {
    drawRandomCircle();
    resetCircleTimer();
  }, circleTime);
}

const maxCircles = 100;

function drawRandomCircle() {
  if (screensaver.children.length >= maxCircles) {
    console.log("Max circles...");
    return;
  }

  const circle = document.createElement("img");
  circle.src = "assets/stuck_out_tongue_apple.png";
  circle.classList.add("circle");

  const size = 50;

  const x = Math.random() * (window.innerWidth - size);
  const y = Math.random() * (window.innerHeight - size);

  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.left = x + "px";
  circle.style.top = y + "px";

  screensaver.appendChild(circle);
}

function clearCircles() {
  if (screensaver.firstChild) {
    screensaver.removeChild(screensaver.firstChild);
    setTimeout(clearCircles, 25);
  }
}
