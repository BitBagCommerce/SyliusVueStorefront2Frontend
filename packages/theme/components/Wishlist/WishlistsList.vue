<template>
  <div class="wishlist">
    <SfList class="list">
      <SfListItem
        v-for="(wishlist) in wishlists"
        :key="wishlist.id"
        class="list__item"
      >
        <SfButton
          aria-label="back"
          class="sf-button--pure list__item--content"
          type="button"
          @click="$emit('click', wishlist.id)"
        >
          <div class="counter">
            <SfIcon
              icon="heart"
              class="counter__icon"
            />

            <SfBadge
              key="wishlist_badge"
              class="sf-badge--number counter__badge"
            >
              {{ wishlistGetters.getTotalItems(wishlist) }}
            </SfBadge>
          </div>

          <span>
            {{ wishlist.name }}
          </span>
        </SfButton>

        <div class="list__item--buttons">
          <Transition>
            <div v-if="(toggledConfirm === wishlist.id)" class="buttons__confirm">
                <span class="buttons__confirm--title">Are sure?</span>

                <SfButton
                  aria-label="Confirm wishlist"
                  class="sf-button--pure buttons__confirm--confirm"
                  @click="handleRemoveWishlist(wishlist.id)"
                >
                  <SfIcon
                    viewBox="0 0 512 512"
                    icon="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    class="icon--primary"
                  />
                </SfButton>

                <SfButton
                  aria-label="Cancel wishlist"
                  class="sf-button--pure buttons__confirm--cancel"
                  @click="toggledConfirm = ''"
                >
                  <SfIcon
                    viewBox="0 0 512 512"
                    icon="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                    class="icon--danger"
                  />
                </SfButton>
            </div>

            <SfButton
              v-else
              aria-label="Remove wishlist"
              class="sf-button--pure buttons__remove"
              @click="toggledConfirm = wishlist.id"
            >
              <SfIcon
                viewBox="0 0 512 512"
                icon="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                class="icon--danger"
              />
            </SfButton>
          </Transition>
        </div>
      </SfListItem>
    </SfList>
  </div>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfList,
  SfCircleIcon,
  SfImage,
  SfBadge
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { useWishlists, wishlistGetters } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables';

export default {
  name: 'WishlistsList',
  components: {
    SfButton,
    SfIcon,
    SfList,
    SfCircleIcon,
    SfImage,
    SfBadge
  },
  props: ['wishlists'],
  setup() {
    const { send } = useUiNotification();
    const { removeWishlist, error } = useWishlists();
    const toggledConfirm = ref('');

    const handleRemoveWishlist = async (wishlistId) => {
      await removeWishlist(wishlistId);
      toggledConfirm.value = '';

      if (error.value.removeWishlist) {
        send({ type: 'danger', message: error.value.removeWishlist.message });

        return;
      }

      send({ type: 'info', message: 'Wishlist has been removed' });
    };

    return {
      wishlistGetters,
      toggledConfirm,
      handleRemoveWishlist
    };
  }
};
</script>

<style lang="scss" scoped>
.wishlist {
  .list {
    &__item {
      padding: var(--spacer-sm);
      margin-bottom: var(--spacer-xs);
      display: flex;
      align-items: center;

      &:hover {
        background-color: var(--c-light);

        .buttons {
          &__remove {
            border-left: 1px solid var(--c-gray);
          }

          &__confirm {
            border-left: 1px solid var(--c-gray);
          }
        }
      }

      &--content {
        height: 100%;
        padding: var(--spacer-base) 0;
        flex: 1 0 auto;
        justify-content: flex-start;
        gap: var(--spacer-sm);

        .counter {
          position: relative;

          &__badge {
            position: absolute;
            top: -40%;
            right: -40%;
          }
        }
      }

      &--buttons {
        display: grid;
        justify-items: end;
        overflow: hidden;
        position: relative;

        .buttons {
          &__remove {
            padding: var(--spacer-base) 0 var(--spacer-base) var(--spacer-sm);
            grid-area: 1 / 1;

            &:hover .icon--danger {
              fill: var(--c-danger);
            }
          }

          &__confirm {
            padding: var(--spacer-base) 0 var(--spacer-base) var(--spacer-sm);
            display: flex;
            gap: var(--spacer-sm);
            grid-area: 1 / 1;

            &--title {
              margin: auto;
            }
          }
        }
      }
    }
  }

  .icon {
    &--primary:hover {
      fill: var(--c-primary);
    }

    &--danger:hover {
      fill: var(--c-danger);
    }
  }
}

.v-enter-active, .v-leave-active {
  transition: transform 0.75s ease, opacity 0.4s ease;
}

.v-enter {
  transform: translateY(-200%);
  opacity: 0;
}

.v-leave-to {
  transform: translateY(200%);
  opacity: 0;
}
</style>
