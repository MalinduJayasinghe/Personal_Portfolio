
// ---- Active nav link on scroll ----
const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('.navbar a');
const header    = document.querySelector('.header');

window.addEventListener('scroll', () => {

    // Add "scrolled" class to header
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Highlight the matching nav link based on scroll position
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    }
    );

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    }
    );
}
);

// ---- Mobile menu ----
const menu = document.getElementById('mobile-menu');
const navbar    = document.querySelector('.navbar');

menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    navbar.classList.toggle('open');
});