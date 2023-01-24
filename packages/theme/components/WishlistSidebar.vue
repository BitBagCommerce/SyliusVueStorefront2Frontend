<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      :button="false"
      :title="sidebarTitle"
      @close="toggleWishlistSidebar"
      class="sidebar sf-sidebar--right"
    >
      <template #bar>
        <div class="desktop-only">
          &nbsp;
        </div>
      </template>

      <template #title>
        <div v-if="currentView === views.items" class="heading__wrapper">
          <SfButton
            aria-label="back"
            class="sf-button--pure"
            type="button"
            @click="toggleListView"
          >
            <SfIcon
              icon="chevron_left"
              size="0.875rem"
              class="heading__wrapper--icon"
            />
          </SfButton>

          <div class="heading__wrapper--center">
            <SfHeading :level="3" :title="sidebarTitle"/>

            <SfButton @click="toggleEditView" class="sf-button--pure">
              <SfIcon icon="more" size="0.875rem" />
            </SfButton>
          </div>

          <SfButton
            class="heading__close-button sf-button--pure"
            aria-label="Wishlist sidebar close button"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              icon="cross"
              size="14px"
              color="gray-primary"
              class="heading__wrapper--icon"
            />
          </SfButton>
        </div>

        <div v-else class="heading__wrapper">
          <div class="heading__wrapper--content">
            <SfHeading :level="3" :title="sidebarTitle" />
          </div>

          <SfButton
            class="heading__close-button sf-button--pure"
            aria-label="Wishlist sidebar close button"
            @click="toggleWishlistSidebar"
          >
            <SfIcon icon="cross" size="14px" color="gray-primary"/>
          </SfButton>
        </div>
      </template>

      <transition name="sf-fade" mode="out-in">
        <WishlistsList
          v-if="currentView === views.list"
          :wishlists="wishlists"
          @click="toggleItemsView"
          @click:create="toggleCreateView"
        />

        <WishlistItems
          v-else-if="currentView === views.items"
          :wishlistId="currentWishlistId"
          @change="selectedProducts = $event"
        />

        <WishlistForm
          v-else-if="(currentView === views.create || currentView === views.edit)"
          :isEdit="currentView === views.edit"
          :wishlistId="currentWishlistId"
          @click:create="handleCreateWishlist"
          @click:edit="handleEditWishlist"
          @click:cancel="toggleListView"
        />
      </transition>

      <template #content-bottom>
        <SfButton
          v-if="(currentView === views.list)"
          aria-label="back"
          class="add-wishlist"
          type="button"
          @click="toggleCreateView"
        >
          <SfIcon icon="plus" color="white" class="add-wishlist__icon" />

          <span>Add new wishlist</span>
        </SfButton>

        <div v-else-if="(currentView === views.items)" class="bottom">
          <SfButton
            aria-label="back"
            class="bottom__button"
            type="button"
            @click="handleAddToCart"
            :disabled="!selectedProducts.length"
          >
            Add to cart
          </SfButton>

          <SfButton
            aria-label="back"
            class="color-danger bottom__button"
            type="button"
            @click="handleClearWishlist(currentWishlistId)"
            :disabled="wishlistGetters.getTotalItems(currentWishlist) === 0"
          >
            Clear
          </SfButton>
        </div>
      </template>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfList,
  SfCircleIcon,
  SfInput
} from '@storefront-ui/vue';
import { computed, onUpdated, ref, watch } from '@nuxtjs/composition-api';
import { useWishlists, useUser, useCart, wishlistGetters } from '@vue-storefront/sylius';
import { useUiState } from '~/composables';
import WishlistsList from '~/components/Wishlist/WishlistsList.vue';
import WishlistItems from './Wishlist/WishlistItems.vue';
import WishlistForm from './Wishlist/WishlistForm.vue';
import { useUiNotification } from '~/composables';

export default {
  name: 'Wishlist',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfList,
    SfCircleIcon,
    WishlistsList,
    WishlistItems,
    WishlistForm,
    SfInput
  },
  setup() {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const { wishlists, createWishlist, clearWishlist, editWishlist, error } = useWishlists();
    const { isAuthenticated } = useUser();
    const { addItem, error: useCartError } = useCart();
    const { send } = useUiNotification();

    const views = {
      list: 'list',
      items: 'items',
      create: 'create',
      edit: 'edit'
    };

    const isEditOpen = ref(false);
    const currentView = ref(views.list);
    const currentWishlistId = ref('');
    const selectedProducts = ref([]);

    const currentWishlist = computed(() => wishlistGetters.getWishlist(currentWishlistId.value, wishlists.value) || {});
    const sidebarTitle = computed(() => {
      switch (currentView.value) {
        case views.list:
          return 'Select wishlist';
        case views.items:
          return currentWishlist.value.name || 'unknown';
        case views.create:
          return 'Add new wishlist';
        case views.edit:
          return 'Change wishlist name';
      }
    });

    const toggleListView = () => {
      currentWishlistId.value = '';
      currentView.value = views.list;
    };

    const toggleItemsView = (wishlistId) => {
      currentWishlistId.value = wishlistId;
      currentView.value = views.items;
    };

    const toggleCreateView = () => {
      currentWishlistId.value = '';
      currentView.value = views.create;
    };

    const toggleEditView = () => {
      currentView.value = views.edit;
    };

    const handleCreateWishlist = async (wishlistName) => {
      await createWishlist(wishlistName);

      if (error.value.createWishlist) {
        send({ type: 'danger', message: error.value.createWishlist.message });

        return;
      }

      send({ type: 'info', message: 'Wishlist was created successfully' });
      toggleListView();
    };

    const handleEditWishlist = async (wishlistId, wishlistName) => {
      await editWishlist(wishlistId, wishlistName);

      if (error.value.editWishlist) {
        send({ type: 'danger', message: error.value.editWishlist.message });

        return;
      }

      send({ type: 'info', message: 'Wishlist was edited successfully' });
      toggleItemsView(wishlistId);
    };

    const handleClearWishlist = async (wishlistId) => {
      await clearWishlist(wishlistId);

      if (error.value.clearWishlist) {
        send({ type: 'danger', message: error.value.clearWishlist.message });

        return;
      }

      send({ type: 'info', message: 'Wishlist cleared successfully' });
    };

    const handleAddToCart = async () => {
      await addItem({ product: selectedProducts.value, quantity: 1 });

      const cartError = Object.values(useCartError.value).find(err => err !== null);

      if (cartError) {
        send({ type: 'danger', message: cartError.message });

        return;
      }

      send({ type: 'success', message: 'Product has been added to the cart' });
    };

    watch(() => isWishlistSidebarOpen.value, () => toggleListView());

    watch(() => currentWishlistId.value, () => selectedProducts.value = []);

    return {
      isAuthenticated,
      wishlists,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      wishlistGetters,
      views,
      currentView,
      currentWishlistId,
      selectedProducts,
      currentWishlist,
      sidebarTitle,
      toggleListView,
      toggleItemsView,
      toggleCreateView,
      toggleEditView,
      handleCreateWishlist,
      handleEditWishlist,
      handleClearWishlist,
      isEditOpen,
      handleAddToCart
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  --sidebar-top-padding: var(--spacer-sm) var(--spacer-base) 0 var(--spacer-base);
  --sidebar-bottom-padding: var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.heading {
  &__wrapper {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    justify-content: space-between;

    &--center {
      display: flex;
      align-items: center;
      gap: var(--spacer-xs);
    }

    &--content {
      display: flex;
      gap: var(--spacer-xs);
    }
  }
}

.sidebar-bottom {
  margin: auto 0 0 0;
}

.collected-product {
  margin: var(--spacer-base) 0;
  &__properties {
    margin: var(--spacer-sm) 0 0 0;
  }
}

.add-wishlist {
  --button-padding: var(--spacer-sm) 0;

  width: 100%;
  gap: var(--spacer-sm);
}

.bottom {
  display: flex;
  gap: var(--spacer-sm);

  &__button {
    --button-padding: var(--spacer-sm) 0;

    width: 100%;
  }
}
</style>
