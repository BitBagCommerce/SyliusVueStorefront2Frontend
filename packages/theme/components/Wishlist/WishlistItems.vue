<template>
  <BulkActionsList
    v-if="totalItems"
    :items="products"
    :getters="wishlistGetters"
    :removalsInProgress="wishlistsItemRemovingInProgressId"
    uniqueKey="id"
    v-model="selectedItems"
    @update:modelValue="$emit('change', selectedItems)"
    @remove="handleRemoveItemFromWishlist"
  />

  <div v-else class="empty-wishlist" key="empty-wishlist">
    <div class="empty-wishlist__banner">
      <SfImage
        src="/icons/empty-cart.svg"
        alt="Empty bag"
        class="empty-wishlist__icon"
      />

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
  SfHeading,
  SfCheckbox,
  SfQuantitySelector,
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { useWishlists, wishlistGetters } from '@vue-storefront/sylius';
import ProductItem from '../CartSidebar/ProductItem.vue';
import BulkActionsList from '../BulkActionsList.vue';

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
    SfHeading,
    SfCheckbox,
    SfQuantitySelector,
    ProductItem,
    BulkActionsList,
  },
  props: ['wishlistId'],
  setup(props) {
    const { wishlists, removeItem } = useWishlists();
    const wishlist = computed(() =>
      wishlistGetters.getWishlist(props.wishlistId, wishlists.value)
    );
    const products = computed(
      () => wishlistGetters.getItems(wishlist.value) || []
    );
    const totals = computed(
      () => wishlistGetters.getTotals(wishlist.value) || 0
    );
    const totalItems = computed(
      () => wishlistGetters.getTotalItems(wishlist.value) || 0
    );
    const selectedItems = ref([]);
    const wishlistsItemRemovingInProgressId = ref([]);

    const isRemovingInProgress = (productId) => {
      return wishlistsItemRemovingInProgressId.value.includes(productId);
    };

    const handleRemoveItemFromWishlist = async (product) => {
      const { wishlistId } = props;

      wishlistsItemRemovingInProgressId.value = [
        ...wishlistsItemRemovingInProgressId.value,
        product.id,
      ];

      await removeItem(product.id, wishlistId);

      wishlistsItemRemovingInProgressId.value =
        wishlistsItemRemovingInProgressId.value.filter(
          (id) => id !== product.id
        );
    };

    return {
      removeItem,
      products,
      totals,
      totalItems,
      wishlistGetters,
      selectedItems,
      handleRemoveItemFromWishlist,
      isRemovingInProgress,
      wishlistsItemRemovingInProgressId,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__total-items {
    display: flex;
    align-items: center;
    gap: var(--spacer-xs);
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6
      var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }

  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);

    margin: 0 0 var(--spacer-xl) 0;

    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6
        var(--font-family--secondary);
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

  .collected-product {
    --borer-spacer: var(--spacer-xs);

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      &--checkbox {
        position: absolute;
        top: var(--borer-spacer);
        left: var(--borer-spacer);
        background-color: var(--c-light);

        ::v-deep .sf-checkbox__message {
          display: none;
        }
      }

      &--quantity {
        position: absolute;
        bottom: var(--borer-spacer);
        left: 50%;
        transform: translateX(-50%);
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
