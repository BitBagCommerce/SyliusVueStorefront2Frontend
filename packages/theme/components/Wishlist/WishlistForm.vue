<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }" class="wishlist-form">
    <form @submit.prevent="handleSubmit(submitForm(reset))">
      <SfCircleIcon icon="heart_fill" class="is-disabled--button" />

      <ValidationProvider
        rules="required"
        v-slot="{ errors }"
        vid="wishlistName"
      >
        <SfInput
          v-model="wishlistName"
          :label="$t('Wishlist name')"
          name="name"
          required
          class="wishlist-form__input"
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>

      <div class="wishlist-form__buttons">
        <SfButton
          type="submit"
          class="wishlist-form__buttons--button"
          :class="{ 'is-disabled--button': isFormActionInProgress }"
        >
          {{ isEdit ? $t('Change') : $t('Create') }}
        </SfButton>

        <SfButton
          @click="$emit('cancel')"
          class="color-secondary wishlist-form__buttons--button"
          :class="{ 'is-disabled--button': isFormActionInProgress }"
        >
          {{ $t('Cancel') }}
        </SfButton>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { SfInput, SfButton, SfCircleIcon } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { ref } from '@nuxtjs/composition-api';

export default {
  name: 'WishlistForm',
  components: {
    SfInput,
    SfButton,
    SfCircleIcon,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    wishlistId: {
      type: String,
      default: {},
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    isFormActionInProgress: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const wishlistName = ref('');

    const submitForm = (resetFn) => {
      if (props.isEdit) {
        emit('edit', props.wishlistId, wishlistName.value);
        resetFn();

        return;
      }

      emit('create', wishlistName.value);
      resetFn();
    };

    return {
      wishlistName,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.wishlist-form {
  box-sizing: border-box;
  padding: 0 var(--spacer-base);
  margin: auto 0;

  &__input {
    margin-top: var(--spacer-lg);
  }

  &__buttons {
    margin-top: var(--spacer-xs);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacer-xs);

    &--button {
      flex: 1 0 auto;
    }
  }

  ::v-deep .sf-circle-icon {
    height: 10rem;
    width: 10rem;
    margin: 0 auto;

    &__icon {
      height: 7rem;
      width: 7rem;
    }
  }
}
</style>
