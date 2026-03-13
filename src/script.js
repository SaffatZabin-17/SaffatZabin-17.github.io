// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function getEffectiveTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return getSystemTheme();
}

function applyTheme(theme) {
    if (theme === getSystemTheme() && !localStorage.getItem('theme')) {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', theme);
    }
}

// Apply on load
applyTheme(getEffectiveTheme());

themeToggle.addEventListener('click', () => {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    root.setAttribute('data-theme', next);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
        root.removeAttribute('data-theme');
    }
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('.section, .hero');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ===== Fade-in animation on scroll =====
const fadeElements = document.querySelectorAll(
    '.timeline-item, .project-card, .skill-category, .learning-card, .research-area, .contact-card, .detail-card, .about-text, .cv-section, .publications-placeholder, .research-statement'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
});

fadeElements.forEach(el => fadeObserver.observe(el));
