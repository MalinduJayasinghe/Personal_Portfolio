
// ---- Header scroll ----
const header   = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Add "scrolled" class to header for background effect
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ---- Active nav link ----
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Remove active from all links, then set the matching one
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, {
    // Fire when a section crosses into the middle band of the viewport
    rootMargin: '-30% 0px -60% 0px'
});

sections.forEach(section => navObserver.observe(section));

// ---- Mobile menu ----
const menu = document.getElementById('mobile-menu');
const navbar    = document.querySelector('.navbar');

menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    navbar.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        navbar.classList.remove('open');
    });
});