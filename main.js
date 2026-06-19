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