import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.template = this.createTemplate();
    this.productsInner = this.template.querySelector('.products-grid__inner');
    this.renderCards();
  }

  createTemplate() {
    return createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"> 
      </div>
    </div>
`);
  }

  get elem() {
    return this.template;
  }

  renderCards() {
    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {continue;} 
      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;} 
      if (this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) {continue;} 
      if (this.filters.category && product.category !== this.filters.category) {continue;}
      let card = new ProductCard(product);
      this.productsInner.append(card.elem);
    }
  }

  clearProductsInner() {
    while (this.productsInner.firstChild) {
      this.productsInner.removeChild(this.productsInner.firstChild);
    }
  }
  
  updateFilter(filters) {
    this.filters = {...this.filters, ...filters };
    this.clearProductsInner();
    this.renderCards();
  } 
}
