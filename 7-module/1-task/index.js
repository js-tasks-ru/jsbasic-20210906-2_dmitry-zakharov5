import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.template = this.createTemplate();
    this.initAddEventListener();
    this.choosingCategory();

  }
  createTemplate() {
    return createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
      <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
      <a href="#" class="ribbon__item" data-id="salads">Salads</a>
      <a href="#" class="ribbon__item" data-id="soups">Soups</a>
      <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
      <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
      <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
      <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
      <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
      <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);
  }
  get elem() {
    return this.template;
  }

  initAddEventListener() {
    const forwardArrow = this.template.querySelector('.ribbon__arrow_right');
    const backArrow = this.template.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.template.querySelector('.ribbon__inner');
    let scrollLeft = 0;

    if (scrollLeft === 0) {
      backArrow.classList.remove('ribbon__arrow_visible');
    }

    forwardArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    }, false);

    backArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    }, false);

    ribbonInner.addEventListener('scroll', () => {
      scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft > 0) {
        backArrow.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        forwardArrow.classList.remove('ribbon__arrow_visible');
      }
      if (scrollLeft < 1) {
        backArrow.classList.remove('ribbon__arrow_visible');
      }
    }, false);
  }

  choosingCategory() {
    this.template.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      let ribbonItems = Array.from(document.querySelectorAll('.ribbon__item'));
      if (!target.classList.contains('ribbon__item')) {
        return;
      }
      ribbonItems.forEach((item) => {
        item.classList.remove('ribbon__item_active');
      });
      target.classList.add('ribbon__item_active');
      let customEvent = new CustomEvent('ribbon-select', {
        detail: target.dataset.id,
        bubbles: true 
      });
      this.template.dispatchEvent(customEvent);
    }, false);
  }
}
