document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initComparisonSlider();
  initYandexMap();
});

// 1. Логика бургер-меню
function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      burger.classList.toggle('burger--active');
    });
  }
}

// 2. Логика слайдера До/После
function initComparisonSlider() {
  const slider = document.getElementById('comparison-slider');
  if (!slider) return;

  const afterImage = document.getElementById('after-image');
  const handle = document.getElementById('slider-handle');
  
  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    
    afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    handle.style.left = `${position}%`;
  };

  const startDrag = (e) => {
    isDragging = true;
    e.preventDefault();
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSlider(clientX);
  };

  slider.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onMove);

  slider.addEventListener('touchstart', startDrag, { passive: false });
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('touchmove', onMove, { passive: false });
}

// 3. Логика Яндекс.Карты
function initYandexMap() {
  if (typeof ymaps === 'undefined') return;

  ymaps.ready(() => {
    const myMap = new ymaps.Map('yandex-map', {
      center: [55.751574, 37.573856], // Координаты Москвы (замени на свои)
      zoom: 15,
      controls: ['zoomControl']
    });

    const myPlacemark = new ymaps.Placemark([55.751574, 37.573856], {
      hintContent: 'Cat Energy',
      balloonContent: 'г. Москва, ул. Примерная, д. 1'
    }, {
      preset: 'islands#greenDotIcon'
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  });
}