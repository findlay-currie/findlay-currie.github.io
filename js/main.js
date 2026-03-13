/* ============================================================
   FINDLAY CURRIE — PORTFOLIO JAVASCRIPT
   ============================================================ */

// ---- State ----
const App = {
    theme: 'dark',
    menuOpen: false,
    loaded: false
};

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadTheme();
    initThemeToggle();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initProfilePhoto();
    initContactForm();
    initProjectFilters();
    generateParticles();
    App.loaded = true;
}

// ---- Loader ----
window.addEventListener('load', () => {
    setTimeout(runLoader, 100);
});

function runLoader() {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loaderBar');
    const pct = document.getElementById('loaderPct');
    if (!loader) return;

    let progress = 0;
    const iv = setInterval(() => {
        progress += Math.random() * 18 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(iv);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(initPageAnimations, 200);
            }, 300);
        }
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = Math.floor(progress) + '%';
    }, 80);
}

// ---- Page Animations ----
function initPageAnimations() {
    initHeroAnimations();
    initSkillAnimations();
    initTimelineAnimations();
    initProjectAnimations();
    initSectionAnimations();
    animateStats();
    startTypingEffect();
}

// ---- Typing Effect ----
function startTypingEffect() {
    const el = document.getElementById('typedTitle');
    if (!el) return;

    const titles = [
        'Graduate Engineer @ Veolia',
        'Google Apps Script Developer',
        'Mechanical Engineer',
        'Process Digitisation Enthusiast'
    ];

    let titleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTime = 0;

    function tick() {
        const current = titles[titleIdx];

        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                pauseTime = 2000;
                deleting = true;
            } else {
                pauseTime = 50 + Math.random() * 40;
            }
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                titleIdx = (titleIdx + 1) % titles.length;
                pauseTime = 400;
            } else {
                pauseTime = 30;
            }
        }
        setTimeout(tick, pauseTime);
    }

    setTimeout(tick, 1000);
}

// ---- Hero Animations ----
function initHeroAnimations() {
    if (typeof anime === 'undefined') return;

    // Name type-in
    const nameVal = document.querySelector('.hn-val');
    if (nameVal) {
        const text = nameVal.textContent;
        nameVal.textContent = '';
        anime({
            targets: { v: 0 },
            v: text.length,
            duration: 1200,
            delay: 400,
            easing: 'easeInOutQuad',
            update(a) { nameVal.textContent = text.substring(0, Math.floor(a.animatables[0].target.v)); }
        });
    }

    // Stagger hero elements
    anime({ targets: '.hero-title', opacity: [0, 1], translateX: [-20, 0], delay: 700, duration: 800, easing: 'easeOutExpo' });
    anime({ targets: '.hero-desc', opacity: [0, 1], translateY: [15, 0], delay: 1000, duration: 800, easing: 'easeOutExpo' });
    anime({ targets: '.hero-buttons .btn', opacity: [0, 1], scale: [0.85, 1], delay: anime.stagger(100, { start: 1200 }), duration: 600, easing: 'easeOutBack' });
    anime({ targets: '.hero-social .social-icon', opacity: [0, 1], scale: [0, 1], delay: anime.stagger(80, { start: 1500 }), duration: 600, easing: 'easeOutBack' });

    // Profile image
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        anime({ targets: profileImg, opacity: [0, 1], scale: [0.8, 1], delay: 800, duration: 1000, easing: 'easeOutElastic(1, .8)' });
    }

    // Badges
    document.querySelectorAll('.floating-badge').forEach((badge, i) => {
        anime({ targets: badge, opacity: [0, 1], scale: [0, 1], delay: 1200 + i * 200, duration: 700, easing: 'easeOutBack' });
    });
}

// ---- Skill Animations ----
function initSkillAnimations() {
    const items = document.querySelectorAll('.skill-item');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const fill = el.querySelector('.skill-fill');
            const pctEl = el.querySelector('.skill-pct');
            const pct = parseInt(el.dataset.percent || 0);

            if (fill && typeof anime !== 'undefined') {
                anime({ targets: fill, width: ['0%', pct + '%'], duration: 1800, easing: 'easeOutExpo', delay: 200 });
                anime({
                    targets: { v: 0 }, v: pct, duration: 1800, easing: 'easeOutExpo', delay: 200,
                    update(a) { if (pctEl) pctEl.textContent = Math.floor(a.animatables[0].target.v) + '%'; }
                });
            }
            obs.unobserve(el);
        });
    }, { threshold: 0.4 });
    items.forEach(it => obs.observe(it));
}

// ---- Timeline Animations ----
function initTimelineAnimations() {
    const items = document.querySelectorAll('.timeline-item');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (typeof anime !== 'undefined') {
                anime({
                    targets: entry.target,
                    opacity: [0, 1], translateX: [-30, 0],
                    duration: 800, easing: 'easeOutExpo'
                });
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.2 });
    items.forEach(it => { it.style.opacity = 0; obs.observe(it); });
}

// ---- Project Animations ----
function initProjectAnimations() {
    const cards = document.querySelectorAll('.project-card');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (typeof anime !== 'undefined') {
                anime({
                    targets: entry.target,
                    opacity: [0, 1], translateY: [30, 0], scale: [0.95, 1],
                    duration: 700, easing: 'easeOutExpo'
                });
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.15 });
    cards.forEach(c => { c.style.opacity = 0; obs.observe(c); });
}

// ---- Section header animations ----
function initSectionAnimations() {
    const headers = document.querySelectorAll('.section-header');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (typeof anime !== 'undefined') {
                anime({
                    targets: entry.target,
                    opacity: [0, 1], translateY: [-15, 0],
                    duration: 600, easing: 'easeOutExpo'
                });
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3 });
    headers.forEach(h => { h.style.opacity = 0; obs.observe(h); });
}

// ---- Stat Counter Animation ----
function animateStats() {
    const stats = document.querySelectorAll('.stat-num');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count || 0);
            if (typeof anime !== 'undefined') {
                anime({
                    targets: { v: 0 }, v: target, duration: 2000, easing: 'easeOutExpo',
                    update(a) { el.textContent = Math.floor(a.animatables[0].target.v); }
                });
            }
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    stats.forEach(s => obs.observe(s));
}

// ---- Theme ----
function loadTheme() {
    const saved = localStorage.getItem('fc-theme');
    if (saved) App.theme = saved;
    applyTheme();
}

function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    App.theme = App.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('fc-theme', App.theme);
    applyTheme();
}

function applyTheme() {
    document.body.setAttribute('data-theme', App.theme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = App.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ---- Navigation ----
function initNavigation() {
    const links = document.querySelectorAll('.nav-link[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = document.querySelector('.main-header').offsetHeight;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                setActiveLink(link);
                if (App.menuOpen) toggleMenu();
            }
        });
    });

    window.addEventListener('scroll', () => {
        updateActiveOnScroll();
        updateHeaderScroll();
    });
}

function setActiveLink(clicked) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (clicked) clicked.classList.add('active');
}

function updateActiveOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
            const id = sec.id;
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.toggle('active', l.getAttribute('data-section') === id);
            });
        }
    });
}

function updateHeaderScroll() {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const btn = document.getElementById('menuToggle');
    if (btn) btn.addEventListener('click', toggleMenu);

    document.addEventListener('click', (e) => {
        const menu = document.getElementById('navMenu');
        const btn = document.getElementById('menuToggle');
        if (App.menuOpen && menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
            toggleMenu();
        }
    });
}

function toggleMenu() {
    App.menuOpen = !App.menuOpen;
    const menu = document.getElementById('navMenu');
    const btn = document.getElementById('menuToggle');
    if (menu) menu.classList.toggle('active', App.menuOpen);
    if (btn) btn.classList.toggle('active', App.menuOpen);
}

// ---- Scroll Effects ----
function initScrollEffects() {
    // Parallax on profile image
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const grid = document.querySelector('.grid-bg');
                if (grid) grid.style.transform = `translateY(${scrolled * 0.15}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ---- Profile Photo ----
function initProfilePhoto() {
    const image = document.getElementById('profileImage');
    const upload = document.getElementById('photoUpload');
    const photo = document.getElementById('profilePhoto');
    const placeholder = document.getElementById('profilePlaceholder');

    if (!image || !upload) return;

    // Load saved photo
    const saved = localStorage.getItem('fc-profile-photo');
    if (saved) {
        showPhoto(saved);
    }

    // Click to upload
    image.addEventListener('click', () => upload.click());

    upload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            showPhoto(dataUrl);
            // Save to localStorage (works for GitHub Pages since there's no server)
            try {
                localStorage.setItem('fc-profile-photo', dataUrl);
            } catch (err) {
                console.warn('Photo too large for localStorage. It will display but not persist.');
            }
        };
        reader.readAsDataURL(file);
    });

    function showPhoto(src) {
        if (photo) { photo.src = src; photo.style.display = 'block'; }
        if (placeholder) placeholder.style.display = 'none';
    }
}

// ---- Project Filters ----
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = 0;
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: card,
                            opacity: [0, 1], translateY: [20, 0], scale: [0.95, 1],
                            duration: 500, easing: 'easeOutExpo'
                        });
                    } else {
                        card.style.opacity = 1;
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ---- Contact Form ----
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Since this is a static GitHub Pages site, we'll show a message
        // In production, you'd connect this to Formspree, EmailJS, etc.
        alert('Thanks for your message! Since this is a static site, please email me directly at findlaycurrie1@gmail.com');
        form.reset();
    });
}

// ---- Particles ----
function generateParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const symbols = ['{', '}', '<', '>', '/', '=', '+', ';', ':', '(', ')', '*', '#', '&'];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 18 + 's';
        p.style.animationDuration = (12 + Math.random() * 10) + 's';
        container.appendChild(p);
    }
}
