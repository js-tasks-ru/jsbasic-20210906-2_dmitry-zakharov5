export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItem = {};
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}