document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initComparisonSlider();
    initYandexMap();
});

// 1. Бургер-меню
function initBurgerMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        nav.classList.toggle('nav--open');
    });
}

// 2. Интерактивный слайдер «Было / Стало»
function initComparisonSlider() {
    const rangeInput = document.querySelector('.slider__range-hidden');
    const imgBefore = document.querySelector('.slider__img--before');
    const imgAfter = document.querySelector('.slider__img--after');
    const thumb = document.querySelector('.slider__thumb');

    if (!rangeInput || !imgBefore || !imgAfter || !thumb) return;

    const updateSlider = (value) => {
        // 1. Толстый кот ("Было"): от 0% (виден весь) до 100% (полностью скрыт)
        imgBefore.style.clipPath = `inset(0 ${value}% 0 0)`;
        
        // 2. Худой кот ("Стало"): от 100% (полностью скрыт) до 0% (виден весь)
        imgAfter.style.clipPath = `inset(0 0 0 ${100 - value}%)`;
        
        // 3. Синхронно двигаем кружочек по треку
        thumb.style.left = value + '%';
    };

    // Устанавливаем начальное положение (при value = 50)
    updateSlider(rangeInput.value);

    // Слушаем движение ползунка
    rangeInput.addEventListener('input', (event) => {
        updateSlider(event.target.value);
    });
}

// 3. Яндекс.Карта
function initYandexMap() {
    if (typeof ymaps === 'undefined') return;

    ymaps.ready(() => {
        const myMap = new ymaps.Map('yandex-map', {
            center: [59.938631, 30.323037], // Координаты СПб, Б. Конюшенная
            zoom: 16,
            controls: ['zoomControl']
        });

        const myPlacemark = new ymaps.Placemark([59.936666, 30.323555], {
            balloonContent: 'г. Санкт-Петербург, ул. Большая Конюшенная, д. 19/8'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/images/geometka.png', 
            iconImageSize: [36, 36]
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    });
}