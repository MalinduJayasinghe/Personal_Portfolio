// ---- Header scroll ----
const header   = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Active nav link ----
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(section => navObserver.observe(section));

// ---- Mobile menu ----
const menu   = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    navbar.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        navbar.classList.remove('open');
    });
});

const navbarClose = document.getElementById('navbar-close');

navbarClose.addEventListener('click', () => {
    menu.classList.remove('open');
    navbar.classList.remove('open');
});

// ---- Scroll reveal ----
const revealSelectors = [
    '.reveal',
    '.about-content',
    '.education-content',
    '.skills-content',
    '.gallery-content',
    '.projects-content',
    '.contact-content',
    '.skill-card',
    '.timeline-item',
    '.gallery-item',
];

const revealEls = document.querySelectorAll(revealSelectors.join(','));

revealEls.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
});

// Stagger siblings inside grids
document.querySelectorAll('.skills-grid, .gallery-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
    });
});

document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Typing effect on home h3 ----
const h3 = document.querySelector('.home-content > h3');
if (h3) {
    const phrases   = ['Software Engineer', 'Backend Developer'];
    let phraseIndex = 0;
    let charIndex   = 0;
    let deleting    = false;

    // Wait for the CSS reveal animation to finish before starting
    setTimeout(() => {
        h3.textContent = '';
        h3.style.minWidth = '320px';

        function type() {
            const current = phrases[phraseIndex];

            if (deleting) {
                charIndex--;
                h3.textContent = current.slice(0, charIndex);
            } else {
                charIndex++;
                h3.textContent = current.slice(0, charIndex);
            }

            let speed = deleting ? 50 : 90;

            if (!deleting && charIndex === current.length) {
                speed = 1800; // pause at end
                deleting = true;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400;
            }

            setTimeout(type, speed);
        }

        type();
    }, 2400); // after home reveal animations complete
}

// ---- Hero image subtle parallax ----
const heroImg = document.querySelector('.home-image img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const offset = window.scrollY;
        heroImg.style.transform = `translateY(${offset * 0.12}px)`;
    }, { passive: true });
}

// ---- Skill card tilt on hover ----
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) *  6;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ---- Project card tilt on hover ----
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect    = card.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const cx      = rect.width  / 2;
        const cy      = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -5;
        const rotateY = ((x - cx) / cx) *  5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ---- Gold cursor glow dot ----
const dot = document.createElement('div');
dot.id = 'cursor-dot';
document.body.appendChild(dot);

let mouseX = 0, mouseY = 0;
let dotX   = 0, dotY   = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

(function animateDot() {
    dotX += (mouseX - dotX) * 0.14;
    dotY += (mouseY - dotY) * 0.14;
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
    requestAnimationFrame(animateDot);
})();

// Enlarge dot on interactive elements
document.querySelectorAll('a, button, .skill-card, .gallery-item, .card').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => dot.classList.remove('cursor-grow'));
});

// ---- Swiper ----
new Swiper('.projects-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768:  { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
    },
});

// ---- Gallery Swiper ----
new Swiper('.gallery-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    pagination: {
        el: '.gallery-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev',
    },
    breakpoints: {
        600:  { slidesPerView: 2, spaceBetween: 16 },
        900:  { slidesPerView: 3, spaceBetween: 20 },
        1100: { slidesPerView: 3, spaceBetween: 24 },
    },
});
