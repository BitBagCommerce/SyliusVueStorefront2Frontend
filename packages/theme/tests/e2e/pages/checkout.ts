import { Customer } from '../types/customer';
import { el, vsfUiEl } from './utils/element';

class Shipping {
  get firstName(): Cypress.Chainable {
    return el('shipping-firstName');
  }

  get lastName(): Cypress.Chainable {
    return el('shipping-lastName');
  }

  get streetName(): Cypress.Chainable {
    return el('shipping-streetName');
  }

  get city(): Cypress.Chainable {
    return el('shipping-city');
  }

  get provinceName(): Cypress.Chainable {
    return el('shipping-provinceName');
  }

  get country(): Cypress.Chainable {
    return el('shipping-country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el('shipping-zipcode');
  }

  get phone(): Cypress.Chainable {
    return el('shipping-phone');
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return el('continue-to-payment');
  }

  get heading(): Cypress.Chainable {
    return el('shipping-heading', undefined, { timeout: 10000 });
  }

  get selectShippingButton(): Cypress.Chainable {
    return el('select-shipping');
  }

  get copyBillingAddress(): Cypress.Chainable {
    return el('copy-billing-address');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method', 'label', { timeout: 10000 });
  }

  public fillForm(customer: Customer) {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.shipping.streetName);
    this.city.type(customer.address.shipping.city);
    this.country.select(customer.address.shipping.country);
    this.provinceName.type(customer.address.shipping.provinceName);
    this.zipcode.type(customer.address.shipping.zipcode);
    this.phone.type(customer.address.shipping.phone);
  }
}

class Billing {
  get firstName(): Cypress.Chainable {
    return el('billing-firstName');
  }

  get lastName(): Cypress.Chainable {
    return el('billing-lastName');
  }

  get streetName(): Cypress.Chainable {
    return el('billing-streetName');
  }

  get city(): Cypress.Chainable {
    return el('billing-city');
  }

  get provinceName(): Cypress.Chainable {
    return el('billing-provinceName');
  }

  get country(): Cypress.Chainable {
    return el('billing-country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el('billing-zipcode');
  }

  get phone(): Cypress.Chainable {
    return el('billing-phone');
  }

  get email(): Cypress.Chainable {
    return el('billing-email');
  }

  get continueToShippingButton(): Cypress.Chainable {
    return el('continue-to-shipping');
  }

  get heading(): Cypress.Chainable {
    return el('billing-heading');
  }

  public fillForm(customer: Customer) {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address?.billing.streetName);
    this.city.type(customer.address?.billing.city);
    this.country.select(customer.address?.billing.country);
    this.provinceName.type(customer.address?.billing.provinceName);
    this.zipcode.type(customer.address?.billing.zipcode);
    this.phone.type(customer.address?.billing.phone);
    this.email.type(
      customer.address?.billing.email.replace('{random}', Date.now().toString())
    );
  }
}

class PromoCode {
  get promoCode(): Cypress.Chainable {
    return vsfUiEl('promoCode');
  }

  get applyPromoCodeButton(): Cypress.Chainable {
    return el('apply-promo-code');
  }

  get appliedCouponCode(): Cypress.Chainable {
    return el('applied-promo-code');
  }

  public applyPromoCode(code: string) {
    this.promoCode.type(code);
    this.applyPromoCodeButton.click();
  }
}

class Payment {
  get makeAnOrderButton(): Cypress.Chainable {
    return el('make-an-order');
  }

  get paymentMethods(): Cypress.Chainable {
    return el('payment-method', undefined, { timeout: 10000 });
  }
}

class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }
}

export default {
  shipping: new Shipping(),
  billing: new Billing(),
  promocode: new PromoCode(),
  payment: new Payment(),
  thankyou: new ThankYou(),
};
