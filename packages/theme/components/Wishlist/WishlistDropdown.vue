<template>
  <SfList class="dropdown" v-click-outside="(e) => handleClickOutside(e)">
    <SfListItem v-for="(wishlist, i) in wishlists" :key="'wishlist' + i">
      <SfButton
        class="sf-button--pure dropdown__item-button"
        @click="handleWishlistAction(product, wishlist)"
        :class="{
          'is-disabled--button': isWishlistActionInProgress(wishlist.id),
          danger: isInWishlist(product, wishlist),
        }"
      >
        <span class="dropdown__item-text">
          {{ wishlist.name }}
        </span>

        <SfLoader
          v-if="isWishlistActionInProgress(wishlist.id)"
          class="wishlist-action-loader"
          :loading="isWishlistActionInProgress(wishlist.id)"
        />
        <SfIcon
          v-else-if="isInWishlist(product, wishlist)"
          icon="heart_fill"
          size="1.25rem"
        />
        <SfIcon v-else icon="heart" size="1.25rem" />
      </SfButton>
    </SfListItem>
  </SfList>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfList,
  SfDropdown,
  SfCircleIcon,
  SfHeading,
  SfLoader,
} from '@storefront-ui/vue';
import { ref, watch } from '@nuxtjs/composition-api';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { useWishlists } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables';
import useDropdown from '~/composables/useDropdown';

export default {
  name: 'WishlistDropdown',
  components: {
    SfButton,
    SfIcon,
    SfList,
    SfDropdown,
    SfCircleIcon,
    SfHeading,
    SfLoader,
  },
  directives: { clickOutside },
  props: {
    wishlists: Array,
    product: Object,
    icon: {
      type: String,
      default: null,
    },
  },
  setup(props, { root }) {
    const { isInWishlist, addItem, removeItem, error } = useWishlists();
    const { toggle } = useDropdown();
    const { send } = useUiNotification();
    const isOpen = ref(false);
    const wishlistsWithActionInProgressId = ref([]);
    const dropdown = ref(null);
    const isTop = ref(false);

    const isInAnyWishlist = (product) => {
      if (!props.wishlists) return false;
      return props.wishlists.some((wishlist) =>
        isInWishlist(product, wishlist)
      );
    };

    const isWishlistActionInProgress = (wishlistId) => {
      return wishlistsWithActionInProgressId.value.includes(wishlistId);
    };

    const handleRemoveFromWishlist = async (itemId, wishlistId) => {
      await removeItem(itemId, wishlistId);

      if (error.value.removeItem) {
        send({ type: 'danger', message: error.value.removeItem.message });

        return;
      }

      send({
        type: 'info',
        message: root.$t('Item has been removed from wishlist'),
      });
    };

    const handleAddToWishlist = async (itemId, wishlistId) => {
      await addItem(itemId, wishlistId);

      if (error.value.addItem) {
        send({ type: 'danger', message: error.value.addItem.message });

        return;
      }

      toggle();

      send({
        type: 'info',
        message: root.$t('Item has been added to wishlist'),
      });
    };

    const handleWishlistAction = async (product, wishlist) => {
      const itemId = product.selectedVariant.id;
      const wishlistId = wishlist.id;

      wishlistsWithActionInProgressId.value = [
        ...wishlistsWithActionInProgressId.value,
        wishlistId,
      ];

      isInWishlist(product, wishlist)
        ? await handleRemoveFromWishlist(itemId, wishlistId)
        : await handleAddToWishlist(itemId, wishlistId);

      wishlistsWithActionInProgressId.value =
        wishlistsWithActionInProgressId.value.filter((id) => id !== wishlistId);
    };

    const handleClickOutside = (e) => {
      if (e?.target?.dataset.toggleBtn) return;

      isOpen.value = false;
    };

    watch(
      () => isOpen.value,
      () => {
        const y = dropdown.value.$el.getBoundingClientRect().top;
        const height = window.innerHeight;

        isTop.value = y > height / 2;
      }
    );

    return {
      isOpen,
      dropdown,
      isTop,
      isInWishlist,
      isInAnyWishlist,
      isWishlistActionInProgress,
      handleWishlistAction,
      handleClickOutside,
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  max-height: 35vh;
  min-width: 10rem;
  padding: var(--spacer-sm);
  overflow-y: auto;
  background-color: var(--c-white);
  box-shadow: 0px 0px 16px rgba(29, 31, 34, 0.2);

  @include for-desktop {
    max-width: 15rem;
    margin: var(--spacer-xs) 0;
  }

  &__item {
    &-button {
      width: 100%;
      padding: var(--spacer-sm);
      display: flex;
      gap: var(--spacer-sm);
      border-bottom: 1px solid var(--c-light);
      justify-content: space-between;
      transition-duration: 0.5s;

      &:hover {
        background-color: var(--c-light);
      }

      &.danger:hover {
        --icon-color: var(--c-danger);

        background-color: var(--c-danger-variant);
        color: var(--c-danger);
      }
    }

    &-text {
      width: 100%;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
    }
  }
}

.wishlist-action-loader {
  width: 20px;
  flex-shrink: 0;

  ::v-deep .sf-loader__overlay {
    background-color: unset;
  }
}
</style>
