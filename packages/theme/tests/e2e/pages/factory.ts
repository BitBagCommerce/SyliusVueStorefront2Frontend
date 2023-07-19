import category from './category';
import checkout from './checkout';
import cartSidebar from './components/cart-sidebar';
import home from './home';
import product from './product';
import productModal from './components/product-modal';

class Page {
  get cartSidebar() {
    return cartSidebar;
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

  get productModal() {
    return productModal;
  }
}

export default new Page();
