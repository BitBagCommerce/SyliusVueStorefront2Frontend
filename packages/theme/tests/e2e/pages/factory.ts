import category from './category';
import checkout from './checkout';
import cart from './components/cart-sidebar';
import home from './home';
import product from './product';

class Page {
  get cart() {
    return cart;
  }

  get category() {
    return category;
  }

  get checkout() {
    return checkout;
  }

  get home() {
    return home;
  }

  get product() {
    return product;
  }
}

export default new Page();
