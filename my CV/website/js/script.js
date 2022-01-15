const menu = document.querySelector('.nav'),
    burger = document.querySelector('.burger'),
    overlay = document.querySelector('.overlay'),
    btnCloseMenu = menu.querySelector('.menu__close');

/* Burger */
burger.onclick = () => {
    menu.classList.add('open');
    overlay.classList.add('open');
}

overlay.onclick = () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    unlockScroll();
}

btnCloseMenu.onclick = () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
}