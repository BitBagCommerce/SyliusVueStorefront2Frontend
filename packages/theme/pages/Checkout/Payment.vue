<template>
  <div>
    <div class="checkout-title-container">
      <SfHeading
        :level="3"
        :title="$t('Payment')"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <EditCartButton />
    </div>
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">{{
          $t('Item')
        }}</SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description' }"
        >
          {{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
      <SfLoader :class="{ loading: cartLoading }" :loading="cartLoading" />
      <SfTableRow
        v-for="(product, index) in products"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage
            height="82"
            width="82"
            :src="cartGetters.getItemImage(product)"
            :alt="cartGetters.getItemName(product)"
          />
        </SfTableData>
        <SfTableData class="table__data table__description table__data">
          <div class="product-title">
            {{ cartGetters.getItemName(product) }}
          </div>
          <div class="product-sku">{{ cartGetters.getItemSku(product) }}</div>
          <div class="product-attributes">
            <SfProperty
              v-for="(attribute, key) in cartGetters.getItemAttributes(
                product,
                ['color', 'size']
              )"
              :key="key"
              :name="key"
              :value="attribute"
            />
          </div>
        </SfTableData>
        <SfTableData class="table__data">{{
          cartGetters.getItemQty(product)
        }}</SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
            :special="
              cartGetters.getItemPrice(product).special &&
              $n(cartGetters.getItemPrice(product).special, 'currency')
            "
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group" v-if="totals">
        <div class="summary__total">
          <SfProperty
            :name="$t('Subtotal')"
            :value="
              $n(
                totals.special > 0 ? totals.special : totals.subtotal,
                'currency'
              )
            "
            class="sf-property--full-width property"
          />
        </div>

        <div class="summary__total" v-if="totals.shipping">
          <SfProperty
            :name="$t('Shipping')"
            :value="$n(totals.shipping, 'currency')"
            class="sf-property--full-width property"
          />
        </div>

        <SfDivider />

        <SfProperty
          :name="$t('Total price')"
          :value="$n(totals.total, 'currency')"
          class="sf-property--full-width sf-property--large summary__property-total"
        />

        <VsfPaymentProvider @status="isPaymentReady = true" />

        <SfLoader :class="{ loading: cartLoading }" :loading="cartLoading" />

        <div class="summary__action">
          <SfButton
            type="button"
            class="sf-button color-secondary summary__back-button"
            @click="$router.push('/checkout/shipping')"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'make-an-order'"
            :disabled="isRedirecting || !isPaymentReady || !products.length"
            class="summary__action-button"
            @click="processOrder"
          >
            {{ $t('Make an order') }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfLink,
  SfLoader,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  watch,
  useRouter,
  onMounted,
} from '@nuxtjs/composition-api';
import {
  useMakeOrder,
  useCart,
  cartGetters,
  orderGetters,
} from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables/';
import EditCartButton from '~/components/Checkout/EditCartButton.vue';

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfLink,
    SfLoader,
    EditCartButton,
    VsfPaymentProvider: () =>
      import('~/components/Checkout/VsfPaymentProvider'),
  },
  setup(props, context) {
    const { cart, load, setCart, loading: cartLoading } = useCart();
    const tokenValue = cartGetters.getCartTokenValue(cart.value);
    const { order, make, loading, error } = useMakeOrder();
    const { send } = useUiNotification();
    const t = (key) => context.root.$i18n.t(key);
    const router = useRouter();

    const products = computed(() => cartGetters.getItems(cart.value));

    const isRedirecting = ref(false);
    const isPaymentReady = ref(false);

    const processOrder = async () => {
      isRedirecting.value = true;
      await make();

      const { make: makeError } = error.value;

      if (makeError) {
        send({ type: 'danger', message: makeError.message });

        return;
      }

      send({ type: 'info', message: t('Your order has been placed') });
      const { locales, locale } = context.root.$i18n;

      let redirected = false;

      for (const localeIndex in locales) {
        if (locales[localeIndex].code === locale) {
          redirected = true;
          const redirectHost =
            context.root.context.$config.theme.payment.redirectHost;
          window.location.href = `${redirectHost}/${locales[localeIndex].sylius}/order/${tokenValue}/pay`;
          setCart(null);
        }
      }

      if (!redirected) {
        const thankYouPath = {
          name: 'thank-you',
          query: { order: orderGetters.getId(order.value) },
        };
        context.root.$router.push(context.root.localePath(thankYouPath));
      }
    };

    const redirectToHome = () => {
      if (!products.value?.length && !isRedirecting.value) {
        router.push({ path: router.app.localePath('/') });
      }
    };

    watch([cartLoading, products], redirectToHome);

    onMounted(async () => {
      await load();
    });

    return {
      isPaymentReady,
      isRedirecting,
      loading,
      cartLoading,
      products,
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: [t('Description'), t('Quantity'), t('Amount')],
      cartGetters,
      processOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color: var(--c-white);
    &:hover {
      color: var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}
.loading {
  height: var(--spacer-2xl);
}
</style>
