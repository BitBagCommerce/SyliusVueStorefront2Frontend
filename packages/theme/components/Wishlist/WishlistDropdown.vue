<template>
  <SfDropdown
    v-if="isAuthenticated"
    :isOpen="isOpen"
    :class="`dropdown ${circleIcon || icon ? '' : 'no-icon'}`"
  >
    <template #opener>
      <template v-if="icon">
        <SfButton
          class="sf-button--pure"
          @click="(isOpen = !isOpen)"
        >
          <SfIcon
            v-if="isInAnyWishlist(product)"
            class="sf-header__icon"
            icon="heart_fill"
            size="1.25rem"
          />
          <SfIcon
            v-else
            class="sf-header__icon"
            icon="heart"
            size="1.25rem"
          />
        </SfButton>
      </template>

      <template v-else-if="circleIcon">
        <SfCircleIcon
          v-if="isInAnyWishlist(product)"
          aria-label="Remove filter"
          icon="heart_fill"
          class="sf-circle-icon__icon color-danger"
          @click="(isOpen = !isOpen)"
        />
        <SfCircleIcon
          v-else
          aria-label="Remove filter"
          icon="heart"
          class="sf-circle-icon__icon color-danger"
          @click="(isOpen = !isOpen)"
        />
      </template>

      <SfButton
        v-else
        @click="(isOpen = !isOpen)"
        class="sf-button"
      >
        <span>Add to wishlist</span>
      </SfButton>
    </template>

    <SfList class="dropdown__list" v-click-outside="() => isOpen = false">
      <SfListItem
      v-for="(wishlist, i) in wishlists"
      :key="'wishlist'+i"
      >
        <SfButton
        class="sf-button--pure dropdown__list--item"
        @click="handleWishlistAction(product, wishlist)"
        :class="{ 'is-disabled--button': isWishlistActionInProgress(wishlist.id), 'danger': isInWishlist(product, wishlist) }"
        >
          <SfLoader class="wishlist-action-loader" :loading="isWishlistActionInProgress(wishlist.id)" size="xs" />

          <span>
            {{wishlist.name}}
          </span>

          <SfIcon v-if="isInWishlist(product, wishlist)" icon="heart_fill" size="1.25rem" />
          <SfIcon v-else icon="heart" size="1.25rem" />
        </SfButton>

      </SfListItem>
    </SfList>

    <template #cancel>
      &#8203;
    </template>
  </SfDropdown>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfList,
  SfDropdown,
  SfCircleIcon,
  SfHeading,
  SfLoader
} from '@storefront-ui/vue';
import { ref, watch } from '@nuxtjs/composition-api';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { useWishlists, useUser } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables';

export default {
  name: 'WishlistDropdown',
  components: {
    SfButton,
    SfIcon,
    SfList,
    SfDropdown,
    SfCircleIcon,
    SfHeading,
    SfLoader
  },
  directives: { clickOutside },
  props: {
    wishlists: Array,
    product: Object,
    visible: {
      type: Boolean,
      default: true
    },
    circleIcon: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { isInWishlist, addItem, removeItem, error } = useWishlists();
    const { isAuthenticated } = useUser();
    const { send } = useUiNotification();
    const isOpen = ref(false);
    const wishlistsWithActionInProgressId = ref([]);

    const isInAnyWishlist = (product) => {
      return props.wishlists.some((wishlist) => isInWishlist(product, wishlist));
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

      send({ type: 'info', message: 'Item has been removed from wishlist' });
    };

    const handleAddToWishlist = async (itemId, wishlistId) => {
      await addItem(itemId, wishlistId);

      if (error.value.addItem) {
        send({ type: 'danger', message: error.value.addItem.message });

        return;
      }

      send({ type: 'info', message: 'Item has been added to wishlist' });
    };

    const handleWishlistAction = async (product, wishlist) => {
      const itemId = product.selectedVariant.id;
      const wishlistId = wishlist.id;

      wishlistsWithActionInProgressId.value = [...wishlistsWithActionInProgressId.value, wishlistId];

      isInWishlist(product, wishlist) ? await handleRemoveFromWishlist(itemId, wishlistId) : await handleAddToWishlist(itemId, wishlistId);

      const removedIdAfterLoading = wishlistsWithActionInProgressId.value.filter((id) => id !== wishlistId);
      wishlistsWithActionInProgressId.value = removedIdAfterLoading;

      isOpen.value = false;
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    watch(() => props.visible, (newVal, oldVal) => {
      if (newVal === false) isOpen.value = false;
    });

    return {
      isOpen,
      isInWishlist,
      isInAnyWishlist,
      isWishlistActionInProgress,
      handleWishlistAction,
      isAuthenticated
    };
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  ::v-deep .sf-dropdown__container {
    position: absolute;
    top: calc(100% + var(--spacer-xs));
    right: 0;
    width: auto;
  }

  &__list {
    min-width: 10rem;
    padding: var(--spacer-sm);
    padding-bottom: 0;

    &--item {
      width: 100%;
      padding: var(--spacer-sm);
      display: flex;
      gap: var(--spacer-sm);
      border-bottom: 1px solid var(--c-light);
      justify-content: space-between;
      transition-duration: .5s;

      &:hover {
        background-color: var(--c-light);
      }

      &.danger:hover {
        --icon-color: var(--c-danger);

        background-color: var(--c-danger-variant);
        color: var(--c-danger);
      }
    }
  }
}

.dropdown.no-icon {
  padding-bottom: var(--spacer-sm);

  ::v-deep .sf-dropdown__container {
    min-width: 100%;

    @include for-desktop {
      top: calc(100% - var(--spacer-sm));
    }
  }
}

.wishlist-action-loader{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
