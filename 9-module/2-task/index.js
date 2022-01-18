import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.slider = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3, });
    this.icon = new CartIcon();
    this.cart = new Cart(this.icon);
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.slider.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.icon.elem);

    this.stepSlider.defaultStep(5, 3);

    let response = await fetch('products.json');
    let products = await response.json();

    const gridHolder = document.querySelector('[data-products-grid-holder]');
    gridHolder.removeChild(gridHolder.firstElementChild);
    const productsGrid = new ProductsGrid(products);
    gridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
      let eventDetail = event.detail;
      products.forEach(product => {
        if (product.id === eventDetail) {
          this.cart.addProduct(product);
        }
      });
    });

    document.body.addEventListener('slider-change', (event) => {
      productsGrid.updateFilter({ maxSpiciness: event.detail, });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      productsGrid.updateFilter({ category: event.detail, });
    });

    document.body.addEventListener('change', () => {
      productsGrid.updateFilter({ noNuts: document.getElementById('nuts-checkbox').checked, });
    });

    document.body.addEventListener('change', () => {
      productsGrid.updateFilter({ vegeterianOnly: document.getElementById('vegeterian-checkbox').checked, });
    });
  }
}

