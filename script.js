
"use strict";

// Automatically update the copyright year.
const year = document.getElementById("current-year");

if (year) {
    year.textContent = String(new Date().getFullYear());
}


// Mobile navigation menu.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}

if (menuToggle && navLinks) {

    // Open and close the menu.
    menuToggle.addEventListener("click", () => {

        const open = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(open)
        );

        menuToggle.setAttribute(
            "aria-label",
            open
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

    // Close the menu when a navigation link is clicked.
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }

    });

    // Close the menu when switching to desktop width.
    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {
            closeMenu();
        }

    });
}


// Reveal elements as they enter the viewport.
const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".project-card, " +
    ".skill-list-card, " +
    ".education-card, " +
    ".resume-card, " +
    ".about-moments"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
) {

    document.documentElement.classList.add("js-ready");

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    currentObserver.unobserve(entry.target);

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
