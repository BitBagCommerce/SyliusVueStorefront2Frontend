<template>
  <div
    @mouseover="isDropdownVisible = true"
    @mouseleave="isDropdownVisible = false"
    class="product-card"
  >
    <SfProductCard
      data-e2e="product-card"
      :style="{ '--index': index }"
      :title="productGetters.getName(product)"
      :image="productGetters.getCoverImage(product)"
      imageHeight="260"
      imageWidth="260"
      :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
      :special-price="specialPrice"
      :max-rating="5"
      :score-rating="productGetters.getAverageRating(product)"
      :show-add-to-cart-button="true"
      :is-added-to-cart="isInCart({ product })"
      :wishlist-icon="false"
      :link="link"
      :addToCartDisabled="disableAddToCart"
      @click:add-to-cart="open(product)"
    />

    <WishlistButton class="wishlist" :product="product" buttonStyle="circle" />
  </div>
</template>

<script>
import { productGetters, useCart, useWishlists } from '@vue-storefront/sylius';
import useVariantSelector from '~/composables/useVariantSelector';
import { SfProductCard } from '@storefront-ui/vue';
import WishlistDropdown from '~/components/Wishlist/WishlistDropdown.vue';
import WishlistButton from '~/components/Wishlist/WishlistButton.vue';
import { computed, useRouter } from '@nuxtjs/composition-api';

export default {
  name: 'ProductCard',
  components: {
    WishlistDropdown,
    SfProductCard,
    WishlistButton,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { root }) {
    const { isInCart } = useCart();
    const router = useRouter();
    const { open } = useVariantSelector();
    const { wishlists } = useWishlists();
    const isDropdownVisible = false;

    const specialPrice = computed(
      () =>
        productGetters.getPrice(props.product).special &&
        root.$n(productGetters.getPrice(props.product).special, 'currency')
    );
    const link = computed(() =>
      router.app.localePath(
        `/p/${productGetters.getId(props.product)}/${productGetters.getSlug(
          props.product
        )}`
      )
    );
    const disableAddToCart = computed(
      () =>
        props.product.selectedVariant.tracked &&
        !productGetters.isInStock(props.product.selectedVariant) &&
        !productGetters.hasMultipleVariants(props.product)
    );

    return {
      disableAddToCart,
      isDropdownVisible,
      isInCart,
      link,
      open,
      productGetters,
      specialPrice,
      wishlists,
    };
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

  ::v-deep .sf-image--placeholder {
    width: 100%;
    height: auto;
  }

  @include for-desktop {
    &:hover {
      --product-card-add-button-opacity: 1;
      --product-card-add-button-bottom: -1rem;
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
