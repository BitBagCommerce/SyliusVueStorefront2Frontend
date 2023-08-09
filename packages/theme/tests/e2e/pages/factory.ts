import category from './category';
import checkout from './checkout';
import cartSidebar from './components/cart-sidebar';
import home from './home';
import product from './product';
import productModal from './components/product-modal';
import myAccount from './my-account';
import loginModal from './components/login-modal';

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

  get myAccount() {
    return myAccount;
  }

  get loginModal() {
    return loginModal;
  }
}

export default new Page();
