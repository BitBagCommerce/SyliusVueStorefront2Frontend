<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <CheckoutHeader :title="$t('Billing')" e2e="billing-heading" />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <SfLoader :loading="loading">
        <div v-if="!loading">
          <UserAddresses
            v-if="isAuthenticated && hasSavedBillingAddress"
            :addresses="userBilling"
            :addressGetters="userBillingGetters"
            @setCurrentAddress="handleSetCurrentAddress"
          />
        </div>
      </SfLoader>
      <div class="form">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-firstName"
            v-model="form.firstName"
            :label="$t('First name')"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-lastName"
            v-model="form.lastName"
            :label="$t('Last name')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="street"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-streetName"
            v-model="form.street"
            :label="$t('Street name')"
            name="street"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-city"
            v-model="form.city"
            :label="$t('City')"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="state" slim>
          <SfInput
            data-e2e="billing-state"
            v-model="form.state"
            :label="$t('State/Province')"
            name="state"
            class="form__element form__element--half form__element--half-even"
          />
        </ValidationProvider>
        <ValidationProvider
          name="countryCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            data-e2e="billing-country"
            v-model="form.countryCode"
            :label="$t('Country')"
            name="countryCode"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            :placeholder="$t('Select country')"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.key"
              :value="countryOption.key"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-zipcode"
            v-model="form.postcode"
            :label="$t('Zip-code')"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-email"
            v-model="form.email"
            :label="$t('E-mail')"
            name="email"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            :disabled="isAuthenticated"
          />
        </ValidationProvider>
        <ValidationProvider
          name="phoneNumber"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="billing-phone"
            v-model="form.phoneNumber"
            :label="$t('Phone number')"
            name="phoneNumber"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            data-e2e="continue-to-shipping"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Continue to shipping') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox,
  SfLoader,
} from '@storefront-ui/vue';
import { ref, computed, onMounted } from '@nuxtjs/composition-api';
import {
  useBilling,
  useUser,
  useUserBilling,
  userBillingGetters,
} from '@vue-storefront/sylius';
import { required, min, digits, email } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useVSFContext } from '@vue-storefront/core';
import { useUiNotification, useUiState } from '~/composables/';
import CheckoutHeader from '~/components/Checkout/CheckoutHeader.vue';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    SfLoader,
    CheckoutHeader,
    UserAddresses: () => import('@/components/Checkout/UserAddresses'),
  },
  setup(props, { root }) {
    extend('required', {
      ...required,
      message: root.$t('This field is required'),
    });
    extend('min', {
      ...min,
      message:
        root.$t('The field should have at least') +
        ' {length} ' +
        root.$t('characters'),
    });
    extend('digits', {
      ...digits,
      message: root.$t('Please provide a valid phone number'),
    });
    extend('email', {
      ...email,
      message: root.$t('Please provide a valid e-mail address'),
    });

    const { load, save, billing, error } = useBilling();
    const { toggleLoginModal } = useUiState();
    const { $vsf } = useVSFContext();
    const { isAuthenticated, user } = useUser();
    const {
      billing: userBilling,
      load: loadUserBilling,
      loading,
    } = useUserBilling();
    const { send } = useUiNotification();
    const canAddNewAddress = ref(true);
    const countries = ref([]);
    const form = ref({
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      countryCode: null,
      postcode: '',
      email: null,
      phoneNumber: null,
    });

    const handleFormSubmit = async () => {
      await save({ billingDetails: form.value });
      const err = error.value.save?.graphQLErrors;

      if (!err?.length) {
        root.$router.push(root.localePath({ name: 'shipping' }));

        return;
      }

      const message = err?.[0].extensions.message;

      send({ type: 'danger', message: root.$t(message) });

      if (
        message ===
        'Provided email address belongs to another user, please log in to complete order.'
      )
        toggleLoginModal();
    };

    const handleSetCurrentAddress = (address) => {
      form.value = {
        ...form.value,
        ...address,
      };
    };

    const hasSavedBillingAddress = computed(() => {
      if (!isAuthenticated.value || !userBilling.value) {
        return false;
      }
      const addresses = userBillingGetters.getAddresses(userBilling.value);
      return Boolean(addresses?.length);
    });

    onMounted(async () => {
      if (!billing.value) {
        await load();
      }

      countries.value = await $vsf.$sylius.api.getCountries();
      form.value = {
        ...form.value,
        ...billing.value,
      };
      if (isAuthenticated.value) {
        form.value.email = user.value.email ?? null;
        await loadUserBilling();
      }
    });

    return {
      form,
      countries,
      billing,
      loading,
      handleFormSubmit,
      handleSetCurrentAddress,
      hasSavedBillingAddress,
      isAuthenticated,
      canAddNewAddress,
      userBilling,
      userBillingGetters,
      user,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button,
  &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color: white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
</style>
