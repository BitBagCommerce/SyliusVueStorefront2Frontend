<template>
  <div v-if="totalItems" class="my-wishlist" key="my-wishlist">
    <div class="my-wishlist__total-items">
      <SfCheckbox @change="toggleAll" :selected="isEverythingSelected()" />

      <span
        >Total items: <strong>{{ totalItems }}</strong></span
      >
    </div>
    <div class="collected-product-list">
      <transition-group name="fade" tag="div">
        <ProductItem
          v-for="product in renderedProducts"
          :key="wishlistGetters.getItemSku(product)"
          :image="wishlistGetters.getItemImage(product)"
          :title="wishlistGetters.getItemName(product)"
          :regular-price="
            $n(wishlistGetters.getItemPrice(product).regular, 'currency')
          "
          :special-price="
            wishlistGetters.getItemPrice(product).special &&
            $n(wishlistGetters.getItemPrice(product).special, 'currency')
          "
          :stock="99999"
          image-width="180"
          image-height="200"
          :isRemovingInProgress="isRemovingInProgress(product.id)"
          @click:remove="handleRemoveItemFromWishlist(product.id, wishlistId)"
          class="collected-product"
        >
          <template #configuration>
            <div class="collected-product__properties">
              <SfProperty
                v-for="(attribute, key) in wishlistGetters.getItemAttributes(
                  product,
                  ['color', 'size']
                )"
                :key="key"
                :name="key"
                :value="attribute"
              />
            </div>
          </template>

          <template #input>
            <div class="collected-product__input">
              <SfCheckbox
                @change="toggleSelection(product)"
                :selected="product.selected"
                class="collected-product__input--checkbox"
              />

              <SfQuantitySelector
                v-model="product.selectedVariant.quantity"
                class="collected-product__input--quantity"
              />
            </div>
          </template>

          <template #actions>&nbsp;</template>
        </ProductItem>
      </transition-group>
    </div>
  </div>

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
import Vue from 'vue';
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
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { useWishlists, wishlistGetters } from '@vue-storefront/sylius';
import ProductItem from '../CartSidebar/ProductItem.vue';

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
  },
  props: ['wishlistId'],
  setup(props, { emit }) {
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
    const renderedProducts = ref(
      products.value?.map((prod) => ({ ...prod, selected: false }))
    );
    const wishlistsItemRemovingInProgressId = ref([]);

    const isRemovingInProgress = (productId) => {
      return wishlistsItemRemovingInProgressId.value.includes(productId);
    };

    const handleRemoveItemFromWishlist = async (productId, wishlistId) => {
      wishlistsItemRemovingInProgressId.value = [
        ...wishlistsItemRemovingInProgressId.value,
        productId,
      ];

      await removeItem(productId, wishlistId);

      wishlistsItemRemovingInProgressId.value =
        wishlistsItemRemovingInProgressId.value.filter(
          (id) => id !== productId
        );
    };

    const getSelected = () =>
      renderedProducts.value
        .filter((prod) => prod.selected === true)
        .map((prod) => {
          prod.selectedVariant.quantity = prod.selectedVariant.quantity || 1;

          return prod;
        });

    const toggleSelection = (product) => {
      const index = renderedProducts.value.findIndex(
        (prod) => prod.id === product.id
      );

      renderedProducts.value[index].selected =
        !renderedProducts.value[index].selected;
      emit('change', getSelected());
    };

    const isEverythingSelected = () =>
      getSelected().length === renderedProducts.value.length;

    const toggleAll = () => {
      if (isEverythingSelected()) {
        renderedProducts.value.map((prod) => (prod.selected = false));
        emit('change', getSelected());

        return;
      }

      renderedProducts.value.map((prod) => (prod.selected = true));
      emit('change', getSelected());
    };

    const initQuantities = () =>
      renderedProducts.value.forEach((_, i) =>
        Vue.set(renderedProducts.value[i].selectedVariant, 'quantity', 1)
      );
    initQuantities();

    watch(
      () => products.value,
      () => {
        renderedProducts.value = products.value?.map((prod) => ({
          ...prod,
          selected: false,
        }));
        initQuantities();
      }
    );

    return {
      removeItem,
      products,
      totals,
      totalItems,
      wishlistGetters,
      renderedProducts,
      toggleSelection,
      toggleAll,
      isEverythingSelected,
      handleRemoveItemFromWishlist,
      isRemovingInProgress,
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
