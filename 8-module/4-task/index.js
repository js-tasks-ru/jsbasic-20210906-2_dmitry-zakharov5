import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItem = {};

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {
    const cartItem = {
      product: {},
      count: 0,
    };

    if (product === null || product === undefined) {
      return;
    }
   
    if (!this.isEmpty()) {
      let sameItemInCart = this.cartItems.find(item => product.id === item.product.id);

      if (sameItemInCart === undefined) {
        cartItem.product = product;
        cartItem.count = 1;
        this.cartItems.push(cartItem);
      }

      if (sameItemInCart !== undefined) {
        sameItemInCart.count += 1;
      }
    }

    if (this.isEmpty()) {
      cartItem.product = product;
      cartItem.count = 1;
      this.cartItems.push(cartItem);
    }
    
    this.getTotalCount();
    this.getTotalPrice();
    this.cartItem = cartItem;
    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    let selectedItemInCartForChangeQuantity = this.cartItems.find(item => item.product.id === productId);

    if (selectedItemInCartForChangeQuantity.count > 0) {
      selectedItemInCartForChangeQuantity.count += amount;
    } 

    if (selectedItemInCartForChangeQuantity.count === 0) {
      let itemIndex = this.cartItems.findIndex(item => item.count === 0);
      this.cartItems.splice(itemIndex, 1);
    }
    this.cartItem = selectedItemInCartForChangeQuantity;
    this.getTotalCount();
    this.getTotalPrice();
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    }
    return false;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(item => totalCount += item.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.product.price * item.count);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
    <h5 class="cart-form__title">Delivery</h5>
    <div class="cart-form__group cart-form__group_row">
      <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
      <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
      <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
    </div>
    <div class="cart-form__group">
      <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
    </div>
    <div class="cart-buttons">
      <div class="cart-buttons__buttons btn-group">
        <div class="cart-buttons__info">
          <span class="cart-buttons__info-text">total</span>
          <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
        </div>
        <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
      </div>
    </div>
  </form>`);

  }
  
  renderModal() {
    this.modal.open();
    this.modal.setTitle('Your order');
    this.modal.setBody(createElement(`<div></div>`));

    const modalDiv = document.querySelector('.modal__body').firstChild;

    this.cartItems.forEach(item => {
      modalDiv.append(this.renderProduct(item.product, item.count));
    });
    
    modalDiv.append(this.renderOrderForm());
    const modalBody = document.querySelector('.modal__body');
    const form = modalBody.querySelector('form');
    
    modalBody.addEventListener('click', (event) => {
      const target = event.target;
      const plusOrMinusBtn = target.closest('.cart-counter__button');
      let btnParent = target.closest('.cart-product');

      if (!plusOrMinusBtn) {
        return;
      }

      if (plusOrMinusBtn.classList.contains('cart-counter__button_plus')) {
        let productID = btnParent.dataset.productId;
        this.updateProductCount(productID, 1);
      }

      if (plusOrMinusBtn.classList.contains('cart-counter__button_minus')) {
        let productID = btnParent.dataset.productId;
        this.updateProductCount(productID, -1);
      }
    });

    form.addEventListener('submit', (event)=> {
      this.onSubmit(event);
    });

  }
  
  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    
    if (document.body.classList.contains('is-modal-open')) {
      const modalBody = document.querySelector('.modal__body');
      let productId = cartItem.product.id;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      let totalPrice = 0;

      let getTotalPrice = () => {

        for (const item of this.cartItems) {
          totalPrice += (item.count * item.product.price);
        }
        return (totalPrice).toFixed(2);
      };

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${getTotalPrice()}`;

      if (cartItem.count === 0) {
        let modalDIV = modalBody.firstChild;
        let cartItemForRemoving = modalDIV.querySelector(`[data-product-id="${productId}"]`);
        cartItemForRemoving.remove();
      }

      if (totalPrice === 0) {
        document.body.classList.remove('is-modal-open');
        this.modal.close();
      }
    }

  }

  onSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('.cart-form');
    const submitBtn = document.querySelector('.btn-group__button');
    
    submitBtn.classList.add('is-loading');
  
    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    });

    response.then(() => {
      this.modal.setTitle('Success!');

      this.cartItems = [];

      this.modal.setBody(createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`));
    })

    .catch(()=> {
      alert('whooopps :((');
    });
    
  }


  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

