<template>
  <SfTabs :open-tab="1">
    <SfTab :title="$t('My orders')">
      <div v-if="currentOrder">
        <SfButton
          class="sf-button--text all-orders"
          @click="currentOrder = null"
          >{{ $t('All Orders') }}</SfButton
        >
        <div class="highlighted highlighted--total">
          <SfProperty
            :name="$t('Order ID')"
            :value="orderGetters.getId(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Order Date')"
            :value="orderGetters.getDate(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Payment Status')"
            :value="orderGetters.getPaymentStatus(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Shipping Status')"
            :value="orderGetters.getShippingStatus(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Shipping Total')"
            :value="$n(orderGetters.getShippingTotal(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Total')"
            :value="$n(orderGetters.getPrice(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
        </div>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">{{
              $t('Product')
            }}</SfTableHeader>
            <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="(item, i) in orderGetters.getItems(currentOrder)"
            :key="i"
          >
            <SfTableData class="products__name">
              <nuxt-link
                :to="
                  localePath(
                    `/p/${productGetters.getId(
                      item.variant.product
                    )}/${productGetters.getSlug(item.variant.product)}`
                  )
                "
              >
                {{ orderGetters.getItemName(item) }}
              </nuxt-link>
            </SfTableData>
            <SfTableData>{{ orderGetters.getItemQty(item) }}</SfTableData>
            <SfTableData>{{
              $n(orderGetters.getItemPrice(item), 'currency')
            }}</SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
      <div v-else>
        <p class="message">
          {{ $t('Details and status orders') }}
        </p>
        <SfLoader :class="{ loading }" :loading="loading">
          <div v-if="!loading">
            <div v-if="orders.length === 0" class="no-orders">
              <p class="no-orders__title">
                {{ $t('You currently have no orders') }}
              </p>
              <SfButton class="no-orders__button" link="/">{{
                $t('Start shopping')
              }}</SfButton>
            </div>
            <SfTable v-else class="orders">
              <SfTableHeading>
                <SfTableHeader
                  v-for="tableHeader in tableHeaders"
                  :key="tableHeader"
                >
                  {{ tableHeader }}
                </SfTableHeader>
                <SfTableHeader class="orders__element--right">
                  <span class="orders__view-details">{{
                    $t('View details')
                  }}</span>
                </SfTableHeader>
              </SfTableHeading>
              <SfTableRow
                v-for="order in orders"
                :key="orderGetters.getId(order)"
              >
                <SfTableData data-e2e="order-number">{{
                  orderGetters.getId(order)
                }}</SfTableData>
                <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
                <SfTableData>{{
                  $n(orderGetters.getPrice(order), 'currency')
                }}</SfTableData>
                <SfTableData>
                  <span :class="getStatusTextClass(order)">{{
                    $t(orderGetters.getPaymentStatus(order))
                  }}</span>
                </SfTableData>
                <SfTableData>
                  <span :class="getStatusTextClass(order)">{{
                    $t(orderGetters.getShippingStatus(order))
                  }}</span>
                </SfTableData>
                <SfTableData class="orders__view orders__element--right">
                  <SfButton
                    class="sf-button--text smartphone-only"
                    @click="currentOrder = order"
                  >
                    {{ $t('View details') }}
                  </SfButton>
                  <SfButton
                    class="sf-button--text desktop-only"
                    @click="currentOrder = order"
                  >
                    {{ $t('View details') }}
                  </SfButton>
                </SfTableData>
              </SfTableRow>
            </SfTable>
            <p v-show="totalOrders > 0">
              {{ $t('Total orders') }} - {{ totalOrders }}
            </p>
          </div>
        </SfLoader>
      </div>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfProperty,
  SfLoader,
} from '@storefront-ui/vue';
import { computed, ref, onMounted } from '@nuxtjs/composition-api';
import {
  useUserOrder,
  orderGetters,
  productGetters,
} from '@vue-storefront/sylius';
import { AgnosticOrderStatus } from '@vue-storefront/core';

export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton,
    SfProperty,
    SfLoader,
  },
  setup(_, { root }) {
    const { orders, search, loading } = useUserOrder();
    const currentOrder = ref(null);

    const tableHeaders = [
      root.$t('Order ID'),
      root.$t('Order Date'),
      root.$t('Amount'),
      root.$t('Payment State'),
      root.$t('Shipping State'),
    ];

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    const downloadFile = (file, name) => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';

      const url = window.URL.createObjectURL(file);
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    const downloadOrders = async () => {
      downloadFile(
        new Blob([JSON.stringify(orders.value)], { type: 'application/json' }),
        'orders.json'
      );
    };

    const downloadOrder = async (order) => {
      downloadFile(
        new Blob([JSON.stringify(order)], { type: 'application/json' }),
        'order ' + orderGetters.getId(order) + '.json'
      );
    };

    onMounted(async () => {
      await search();
    });

    return {
      tableHeaders,
      orders: computed(() => (orders ? orders.value.results : [])),
      totalOrders: computed(() => orderGetters.getOrdersTotal(orders.value)),
      getStatusTextClass,
      orderGetters,
      productGetters,
      downloadOrder,
      downloadOrders,
      currentOrder,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17, 5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 0;
        text-align: right;
      }
    }
    &__view-details {
      white-space: nowrap;
    }
  }
}
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}
</style>
