<template>
  <SfDropdown
    :isOpen="isOpen"
    :class="`dropdown ${circleIcon ? '' : 'no-icon'}`"
  >
    <template #opener>
      <SfCircleIcon
        v-if="circleIcon"
        aria-label="Remove filter"
        icon="heart"
        class="sf-circle-icon__icon color-danger"
        @click="(isOpen = !isOpen)"
      />

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
          v-if="isInWishlist(product, wishlist)"
          class="sf-button--pure dropdown__list--item danger"
          @click="handleRemoveFromWishlist(product.id, wishlist.id)"
        >
          <span>
            {{wishlist.name}}
          </span>

          <SfIcon icon="heart_fill" size="1.25rem" />
        </SfButton>

        <SfButton
          v-else
          class="sf-button--pure dropdown__list--item"
          @click="handleAddToWishlist(product.id, wishlist.id)"
        >
          <span>
            {{wishlist.name}}
          </span>

          <SfIcon icon="heart" size="1.25rem" />
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
  SfHeading
} from '@storefront-ui/vue';
import { ref, watch } from '@nuxtjs/composition-api';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { useWishlists } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables';

export default {
  name: 'WishlistDropdown',
  components: {
    SfButton,
    SfIcon,
    SfList,
    SfDropdown,
    SfCircleIcon,
    SfHeading
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
      default: true
    }
  },
  setup(props) {
    const { isInWishlist, addItem, removeItem, error } = useWishlists();
    const { send } = useUiNotification();
    const isOpen = ref(false);

    const handleAddToWishlist = async (itemId, wishlistId) => {
      await addItem(itemId, wishlistId);
      isOpen.value = false;

      if (error.value.addItem) {
        send({ type: 'danger', message: error.value.addItem.message });

        return;
      }

      send({ type: 'info', message: 'Item has been added to wishlist' });
    };

    const handleRemoveFromWishlist = async (itemId, wishlistId) => {
      await removeItem(itemId, wishlistId);
      isOpen.value = false;

      if (error.value.removeItem) {
        send({ type: 'danger', message: error.value.removeItem.message });

        return;
      }

      send({ type: 'info', message: 'Item has been removed from wishlist' });
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    watch(() => props.visible, (newVal, oldVal) => {
      if (newVal === false) isOpen.value = false;
    });

    return {
      isOpen,
      isInWishlist,
      handleAddToWishlist,
      handleRemoveFromWishlist
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
</style>
