<template>
  <div
    @mouseover="isDropdownVisible = true"
    @mouseleave="isDropdownVisible = false"
    class="product-card"
  >
    <!--  change style index to product index  -->
    <SfProductCard
      data-e2e="product-card"
      :style="{ '--index': index }"
      :title="productGetters.getName(product)"
      :image="productGetters.getCoverImage(product)"
      imageHeight="260"
      imageWidth="260"
      :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
      :special-price="
        productGetters.getPrice(product).special &&
        $n(productGetters.getPrice(product).special, 'currency')
      "
      :max-rating="5"
      :score-rating="productGetters.getAverageRating(product)"
      :show-add-to-cart-button="true"
      :is-added-to-cart="isInCart({ product })"
      :wishlist-icon="false"
      :link="
        localePath(
          `/p/${productGetters.getId(product)}/${productGetters.getSlug(
            product
          )}`
        )
      "
      :addToCartDisabled="
        product.selectedVariant.tracked &&
        !productGetters.isInStock(product.selectedVariant) &&
        !productGetters.hasMultipleVariants(product)
      "
      @click:add-to-cart="open(product)"
    />

    <WishlistDropdown
      class="wishlist"
      :wishlists="wishlists"
      :product="product"
      :visible="isDropdownVisible"
      :icon="'circleIcon'"
    />
  </div>
</template>

<script>
import { productGetters, useCart, useWishlists } from '@vue-storefront/sylius';
import useVariantSelector from '~/composables/useVariantSelector';
import { SfProductCard } from '@storefront-ui/vue';
import WishlistDropdown from '~/components/Wishlist/WishlistDropdown.vue';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  setup() {
    const { isInCart } = useCart();
    const { open } = useVariantSelector();
    const { wishlists } = useWishlists();
    const isDropdownVisible = false;
    return {
      isDropdownVisible,
      isInCart,
      open,
      productGetters,
      wishlists,
    };
  },
  components: {
    WishlistDropdown,
    SfProductCard,
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;

  .wishlist {
    display: none;
    position: absolute;
    top: calc(1rem + var(--spacer-sm));
    right: calc(1rem + var(--spacer-sm));
  }

  @include for-mobile {
    .wishlist {
      display: flex;
      z-index: 1;

      &.active {
        z-index: 2;
      }
    }
  }

  @include for-desktop {
    &:hover {
      --product-card-add-button-opacity: 1;
      --product-card-z-index: 1;
      --product-card-box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);

      .wishlist {
        display: flex;
        z-index: 10;
      }
    }
  }
}
</style>
