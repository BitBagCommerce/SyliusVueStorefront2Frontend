import { Customer } from '../types/customer';

class Shipping {
  get firstName(): Cypress.Chainable {
    return cy.el('shipping-firstName');
  }

  get lastName(): Cypress.Chainable {
    return cy.el('shipping-lastName');
  }

  get streetName(): Cypress.Chainable {
    return cy.el('shipping-streetName');
  }

  get city(): Cypress.Chainable {
    return cy.el('shipping-city');
  }

  get provinceName(): Cypress.Chainable {
    return cy.el('shipping-provinceName');
  }

  get country(): Cypress.Chainable {
    return cy.el('shipping-country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return cy.el('shipping-zipcode');
  }

  get phone(): Cypress.Chainable {
    return cy.el('shipping-phone');
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return cy.el('continue-to-payment');
  }

  get heading(): Cypress.Chainable {
    return cy.el('shipping-heading', undefined, { timeout: 10000 });
  }

  get selectShippingButton(): Cypress.Chainable {
    return cy.el('select-shipping');
  }

  get copyBillingAddress(): Cypress.Chainable {
    return cy.el('copy-billing-address');
  }

  get shippingMethods(): Cypress.Chainable {
    return cy.el('shipping-method', 'label', { timeout: 10000 });
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
    return cy.el('billing-firstName');
  }

  get lastName(): Cypress.Chainable {
    return cy.el('billing-lastName');
  }

  get streetName(): Cypress.Chainable {
    return cy.el('billing-streetName');
  }

  get city(): Cypress.Chainable {
    return cy.el('billing-city');
  }

  get provinceName(): Cypress.Chainable {
    return cy.el('billing-provinceName');
  }

  get country(): Cypress.Chainable {
    return cy.el('billing-country', 'select');
  }

  get zipcode(): Cypress.Chainable {
    return cy.el('billing-zipcode');
  }

  get phone(): Cypress.Chainable {
    return cy.el('billing-phone');
  }

  get email(): Cypress.Chainable {
    return cy.el('billing-email');
  }

  get continueToShippingButton(): Cypress.Chainable {
    return cy.el('continue-to-shipping');
  }

  get heading(): Cypress.Chainable {
    return cy.el('billing-heading');
  }

  public fillForm(customer: Customer, loggedIn = false) {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address?.billing.streetName);
    this.city.type(customer.address?.billing.city);
    this.country.select(customer.address?.billing.country);
    this.provinceName.type(customer.address?.billing.provinceName);
    this.zipcode.type(customer.address?.billing.zipcode);
    this.phone.type(customer.address?.billing.phone);

    if (!loggedIn) {
      this.email.type(
        customer.address?.billing.email.replace(
          '{random}',
          Date.now().toString()
        )
      );
    }
  }
}

class Coupons {
  get couponCode(): Cypress.Chainable {
    return cy.vsfUiEl('promoCode');
  }

  get applyCouponCodeButton(): Cypress.Chainable {
    return cy.el('apply-promo-code');
  }

  get appliedCouponCode(): Cypress.Chainable {
    return cy.el('applied-promo-code');
  }

  public applyCouponCode(code: string) {
    this.couponCode.type(code);
    this.applyCouponCodeButton.click();
  }
}

class Payment {
  get makeAnOrderButton(): Cypress.Chainable {
    return cy.el('make-an-order');
  }

  get paymentMethods(): Cypress.Chainable {
    return cy.el('payment-method', undefined, { timeout: 10000 });
  }
}

class ThankYou {
  get heading(): Cypress.Chainable {
    return cy.el('thank-you-banner', 'h2');
  }
}

export default {
  shipping: new Shipping(),
  billing: new Billing(),
  coupons: new Coupons(),
  payment: new Payment(),
  thankyou: new ThankYou(),
};
