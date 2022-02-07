console.log("1.Смена изображений в секции portfolio +25\n при кликах по кнопкам Winter и т.д. в секции portfolio отображаются изображения из папки с соответствующим названием +20\n кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5\n 2.Перевод страницы на два языка +25\n при клике по надписи ru англоязычная страница переводится на русский язык +10\n при клике по надписи en русскоязычная страница переводится на английский язык +10\n надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5\n 3.Переключение светлой и тёмной темы +25\n тёмная тема приложения сменяется светлой +10\n светлая тема приложения сменяется тёмной +10\n после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице +5\n 4.Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5");

import i18Obj from './translate.js';

const burger = document.querySelector('.burger'),
      burgerLines = document.querySelectorAll('.burger__line'),
      menu = document.querySelector('.nav'),
      overlay = document.querySelector('.overlay'),
      navLinks = document.querySelectorAll('.nav__link'),
      navBox = document.querySelector('.nav'),
      header = document.querySelector('.header');



function toggleMenu() {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
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
        console.log(event.target);
    }
}

burger.addEventListener('click', toggleMenu);
navBox.addEventListener('click', closeMenu)
// navLinks.forEach((elem) => elem.addEventListener('click', closeMenu));

// Portfolio
const portfolioBtnsBox = document.querySelector('.portfolio__btns'),
      portfolioBtn = document.querySelector('.portfolio__btn'),
      portfolioImages = document.querySelectorAll('.portfolio__img'),
      seasons = ['winter', 'spring', 'summer', 'autumn'],
      portfolioBtns = document.querySelectorAll('.portfolio__btn');

function preloadSummerImages() {
    seasons.forEach((elem, index) => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${seasons[index]}-${i}.jpg`;
          }
    })
  }
  preloadSummerImages();

function changeImage(event) {
    if(event.target.classList.contains('portfolio__btn')) {
        let season = event.target.dataset.season;
        portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/${season}-${index + 1}.jpg`;
        })
    }
  }

  portfolioBtnsBox.addEventListener('click', changeImage);

// Portfolio btns
function changeClassActive(event) {
    portfolioBtns.forEach(elem => elem.classList.remove('active'));
    if(event.target.classList.contains('portfolio__btn')) {
        event.target.classList.toggle('active');
    }
}

portfolioBtnsBox.addEventListener('click', changeClassActive);

// Translation

const langBtns = document.querySelectorAll('.languages__link'),
      langBtnsBox = document.querySelector('.languages');

function getTranslate(event) {
    const dataValues = document.querySelectorAll("[data-i18n]"),
          lang = event.target.textContent;

    langBtns.forEach(elem => elem.classList.remove('languages__link--active'));
    event.target.classList.add('languages__link--active');

    dataValues.forEach(elem => {
        elem.textContent = i18Obj[lang][elem.dataset.i18n];
        
    if (elem.placeholder) {
        elem.placeholder = i18Obj[lang][elem.dataset.i18n];
        elem.textContent = '';
      }
    });
}

langBtnsBox.addEventListener('click', getTranslate);


// Change color-theme

const themeBtn = document.querySelector('.theme-btn'),
      skillsSection = document.querySelector('.skills'),
      portfolioSection = document.querySelector('.portfolio'),
      videoSection = document.querySelector('.video-section'),
      priceSection = document.querySelector('.price-list'),
      elemsChangeTheme = [skillsSection, portfolioSection, videoSection, priceSection];

function changeTheme(event) {
    event.target.classList.toggle('theme-btn--light');
    elemsChangeTheme.forEach(elem => elem.classList.toggle('light-theme'));
    portfolioBtns.forEach(btn => btn.classList.toggle('light-theme-btn'));
    // if (window.matchMedia("(max-width: 768px)").matches) {
    //     navBox.classList.add('light-theme');
    // }
}
themeBtn.addEventListener('click', changeTheme);


// Buttons
const animateHeroButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
const heroBtn = document.querySelector('.hero__btn');
heroBtn.addEventListener('click', animateHeroButton, false);










