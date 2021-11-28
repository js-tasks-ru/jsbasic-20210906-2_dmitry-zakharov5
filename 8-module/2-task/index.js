import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.allProd = products;
    this.products = products;
    this.filters = {};
    this.template = this.createTemplate();
    this.productsInner = this.template.querySelector('.products-grid__inner');
    this.renderCards(this.products);
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

  renderCards(cards) {
    for (let product of cards) {
      let card = new ProductCard(product);
      this.productsInner.append(card.elem);
    }
  }

  clearProductsInner() {
    while (this.productsInner.firstChild) {
      this.productsInner.removeChild(this.productsInner.firstChild);
    }
  }

  enabledFilter(array, filter) {

    const sortingByCategory = array.filter((product) => {

      if (filter.noNuts) {
        return !product.hasOwnProperty('nuts');
      }
            
      if (filter.vegeterianOnly) {
        return product.vegeterian;
      }
            
      if (filter.maxSpiciness < 4) {
        return product.spiciness <= filter.maxSpiciness; 
      }
            
      if (filter.category !== '') {
        return product.category === filter.category;
      }

    });
    return sortingByCategory;
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters };
    
    if (this.filters.noNuts || this.filters.vegeterianOnly || this.filters.maxSpiciness < 4 || this.filters.category !== '') {
      this.products = this.enabledFilter(this.products, filters);
      this.clearProductsInner(); 
      this.renderCards(this.products); 
    }

    if (this.filters.noNuts === false || this.filters.vegeterianOnly === false || this.filters.maxSpiciness >= 4 || this.filters.category === '') {
      this.products = this.enabledFilter(this.allProd, this.filters);
      this.clearProductsInner(); 
      this.renderCards(this.products); 
    }

    if (this.filters.noNuts === false && this.filters.vegeterianOnly === false && this.filters.maxSpiciness >= 4 && this.filters.category === '') {
      this.products = this.allProd;
      this.clearProductsInner();
      this.renderCards(this.products); 
    }
  }
      
}


  


