<template>
  <div v-if="totalItems" class="my-wishlist" key="my-wishlist">
    <div class="my-wishlist__total-items">Total items: <strong>{{ totalItems }}</strong></div>
    <div class="collected-product-list">
      <transition-group name="fade" tag="div">
        <SfCollectedProduct
          v-for="(product, i) in products"
          :key="wishlistGetters.getItemSku(product) + i"
          :image="wishlistGetters.getItemImage(product)"
          :title="wishlistGetters.getItemName(product)"
          :regular-price="$n(wishlistGetters.getItemPrice(product).regular, 'currency')"
          :special-price="wishlistGetters.getItemPrice(product).special && $n(wishlistGetters.getItemPrice(product).special, 'currency')"
          :stock="99999"
          image-width="180"
          image-height="200"
          @click:remove="removeItem({ product })"
          class="collected-product"
        >
          <template #configuration>
            <div class="collected-product__properties">
              <SfProperty v-for="(attribute, key) in wishlistGetters.getItemAttributes(product, ['color', 'size'])" :key="key" :name="key" :value="attribute"/>
            </div>
          </template>

          <template #input="{}">&nbsp;</template>

          <template #actions>&nbsp;</template>
        </SfCollectedProduct>
      </transition-group>
    </div>
  </div>

  <div v-else class="empty-wishlist" key="empty-wishlist">
    <div class="empty-wishlist__banner">
      <SfImage src="/icons/empty-cart.svg" alt="Empty bag" class="empty-wishlist__icon" />

      <SfHeading
        title="Your wishlist is empty"
        description="Looks like you haven’t added any items to the wishlist yet. Start
        shopping to fill it in."
        class="empty-wishlist__label"
        :level="3"
      />
    </div>
  </div>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfList,
  SfHeading
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import { useWishlists, wishlistGetters } from '@vue-storefront/sylius';

export default {
  name: 'WishlistItems',
  components: {
    SfButton,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfList,
    SfHeading
  },
  props: ['wishlistId'],
  setup(props) {
    const { wishlists, removeItem } = useWishlists();
    const wishlist = computed(() => wishlists.value.length ? wishlistGetters.getWishlist(props.wishlistId, wishlists.value) : {});
    const products = computed(() => wishlistGetters.getItems(wishlist.value) || []);
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value) || 0);
    const totalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value) || 0);

    return {
      removeItem,
      products,
      totals,
      totalItems,
      wishlistGetters
    };
  }
};
</script>

<style lang="scss" scoped>
.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__total-items {
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6 var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }

  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);

    margin: 0 0 var(--spacer-xl) 0;

    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6 var(--font-family--secondary);
      color: var(--c-link);
    }
  }

  ::v-deep .sf-collected-product {
    &__aside {
      max-width: 45%;
    }

    &__image {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
}

.empty-wishlist {
  display: flex;
  flex: 1;
  flex-direction: column;

  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__label,
  &__description {
    text-align: center;
  }

  &__label {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: var(--c-primary);
    --heading-title-font-weight: var(--font-weight--semibold);

      @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
    }
  }

  &__icon {
    --image-width: 16rem;

    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
}
</style>
