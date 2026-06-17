const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sections = document.querySelectorAll(".content-section");

function showSection(sectionId) {
    sections.forEach((section) => {
        section.hidden = section.id !== sectionId;
    });

    navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.section === sectionId);
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        showSection(link.dataset.section);
    });
});

function initProjectsCarousel() {
    const carousel = document.querySelector(".projects-carousel");
    if (!carousel) return;

    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    let index = 0;

    function goTo(nextIndex) {
        index = (nextIndex + slides.length) % slides.length;
        slides[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));
}

initProjectsCarousel();
