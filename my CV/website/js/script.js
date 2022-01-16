const menu = document.querySelector('.nav'),
    burger = document.querySelector('.burger'),
    overlay = document.querySelector('.overlay'),
    navLinks = document.querySelectorAll('.nav__link');


function toggleMenu() {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    overlay.classList.toggle('open');

    overlay.onclick = () => {
        menu.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function closeMenu(event) {
    if (event.target.classList.contains('nav__link')) {
        overlay.classList.remove('open');
        burger.classList.remove('open');
        menu.classList.remove('open');
    }
}

burger.addEventListener('click', toggleMenu);
navLinks.forEach(elem => elem.addEventListener('click', closeMenu));

