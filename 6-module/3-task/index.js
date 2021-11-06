import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.rootElement = this.createRootElement(slides);
    this.initAddEventListener();
    this.addProductInCart();
  }
  createRootElement(slides) {
    return createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${slides.map((slide) => `
        <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `).join('')}
      </div>
    </div>
    `);  
  }
  get elem() {
    return this.rootElement;
  }

  initAddEventListener() {
    const forwardArrow = this.rootElement.querySelector('.carousel__arrow_right');
    const backArrow = this.rootElement.querySelector('.carousel__arrow_left');
    const carouselSlide = this.rootElement.querySelectorAll('.carousel__slide');
    let position = 0;
    let counter = 1;
    if (counter === 1) {
      backArrow.style.display = 'none';
    }
    function moveTapeForward() {
      const carouselTape = document.querySelector('.carousel__inner');
      let tapeOffsetWidh = carouselTape.offsetWidth;
      counter++;
      position += tapeOffsetWidh;
      carouselTape.style.transform = 'translateX(-' + position + 'px)';
      if (counter > 1) {
        backArrow.style.display = '';
      }
      if (counter === carouselSlide.length) {
        forwardArrow.style.display = 'none';
      }
    }
    function moveTapeBack() {
      const carouselTape = document.querySelector('.carousel__inner');
      let tapeOffsetWidh = carouselTape.offsetWidth;
      --counter;
      position -= tapeOffsetWidh;
      carouselTape.style.transform = 'translateX(-' + position + 'px)';
      if (counter > 1) {
        backArrow.style.display = '';
      }
      if (counter === 1) {
        backArrow.style.display = 'none';
      }
      if (counter < carouselSlide.length) {
        forwardArrow.style.display = '';
      }
    }
    forwardArrow.addEventListener('click', moveTapeForward, false);
    backArrow.addEventListener('click', moveTapeBack, false);
  }

  addProductInCart() {
    this.rootElement.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('carousel__button') || target.closest('.carousel__button')) {
        let currentSlide = target.closest('.carousel__slide');
        let customEvent = new CustomEvent('product-add', {
          detail: currentSlide.dataset.id,
          bubbles: true,
        });
        this.rootElement.dispatchEvent(customEvent);
      }
    });
  }
}