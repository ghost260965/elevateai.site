"use strict";

// Theme Toggle Module
(() => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize from localStorage or default theme
    const savedTheme = localStorage.getItem('theme') || '';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        setTheme(isLight ? '' : 'light');
    });
})();

// Mobile Navigation Toggle Module
(() => {
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }
})();

// Scroll-Reveal Module using IntersectionObserver
(() => {
    const sections = document.querySelectorAll('.section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease-out';
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver(revealSection, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        observer.observe(section);
    });
})();

// Explosion Image Lazy Load
document.addEventListener("DOMContentLoaded", function() {
    const explosionImg = document.querySelector(".explosion-img");
    if (explosionImg) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.onload = () => img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        });

        imgObserver.observe(explosionImg);
    }
});

// Lazy Loading Images Module
(() => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const loadImage = (entry) => {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
})();