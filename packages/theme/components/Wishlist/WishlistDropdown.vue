<template>
  <SfDropdown
    v-if="isAuthenticated"
    :isOpen="isOpen"
    class="dropdown"
    :class="{ 'no-icon': !icon, active: isOpen, 'dropdown--top': isTop }"
    ref="dropdown"
  >
    <template #opener>
      <template v-if="icon == 'icon'">
        <SfButton
          class="sf-button--pure ignore-click"
          @click="isOpen = !isOpen"
          data-toggle-btn="ignore"
        >
          <SfIcon
            v-if="isInAnyWishlist(product)"
            class="sf-header__icon"
            icon="heart_fill"
            size="1.25rem"
          />
          <SfIcon v-else class="sf-header__icon" icon="heart" size="1.25rem" />
        </SfButton>
      </template>

      <template v-else-if="icon == 'circleIcon'">
        <SfCircleIcon
          v-if="isInAnyWishlist(product)"
          aria-label="Remove filter"
          icon="heart_fill"
          class="sf-circle-icon__icon color-danger ignore-click"
          @click="isOpen = !isOpen"
          data-toggle-btn="ignore"
        />
        <SfCircleIcon
          v-else
          aria-label="Remove filter"
          icon="heart"
          class="sf-circle-icon__icon color-danger ignore-click"
          @click="isOpen = !isOpen"
          data-toggle-btn="ignore"
        />
      </template>

      <SfButton
        v-else
        @click="isOpen = !isOpen"
        class="sf-button ignore-click"
        data-toggle-btn="ignore"
      >
        <span>{{ $t('Add to wishlist') }}</span>
      </SfButton>
    </template>

    {{ isTop }}
    <SfList
      class="dropdown__list"
      v-click-outside="(e) => handleClickOutside(e)"
    >
      <SfListItem v-for="(wishlist, i) in wishlists" :key="'wishlist' + i">
        <SfButton
          class="sf-button--pure list__item-button"
          @click="handleWishlistAction(product, wishlist)"
          :class="{
            'is-disabled--button': isWishlistActionInProgress(wishlist.id),
            danger: isInWishlist(product, wishlist),
          }"
        >
          <span class="list__item-text">
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

    <template #cancel>
      <span />
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
  SfLoader,
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
    SfLoader,
  },
  directives: { clickOutside },
  props: {
    wishlists: Array,
    product: Object,
    visible: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { isInWishlist, addItem, removeItem, error } = useWishlists();
    const { isAuthenticated } = useUser();
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

    // automatically close dropdown on products grid view, when mouse leaves item
    watch(
      () => props.visible,
      (newVal) => {
        if (newVal === false) isOpen.value = false;
      }
    );

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
      isAuthenticated,
      handleClickOutside,
    };
  },
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

    @include for-desktop {
      width: max-content;
      right: 0;
      left: auto;
      max-width: 320px;
    }
  }

  &--top {
    ::v-deep .sf-dropdown__container {
      top: unset;
      bottom: calc(100% + var(--spacer-xs));
    }
  }

  @include for-mobile {
    ::v-deep {
      .sf-overlay {
        background-color: unset;
      }

      .sf-dropdown__container {
        position: fixed;
        top: unset;
        width: 100%;
        left: 0;
        bottom: 58px;
        max-width: unset;
        z-index: 1;
        box-shadow: 0px 0px 16px rgba(29, 31, 34, 0.2);
      }

      .list__item-button {
        flex-direction: row-reverse;
        justify-content: flex-end;
      }
    }
  }

  &__list {
    max-height: 35vh;
    min-width: 10rem;
    padding: var(--spacer-sm);
    overflow-y: auto;

    .list__item {
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
        text-align: left;
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

.wishlist-action-loader {
  width: 20px;
  flex-shrink: 0;

  ::v-deep .sf-loader__overlay {
    background-color: unset;
  }
}

.ignore-click * {
  pointer-events: none;
}
</style>
