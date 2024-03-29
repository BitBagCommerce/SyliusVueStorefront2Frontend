<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <CheckoutHeader :title="$t('Shipping')" e2e="shipping-heading" />
    <SfCheckbox
      data-e2e="copy-billing-address"
      :selected="sameAsBilling"
      @change="handleCheckSameAddress"
      :label="$t('Copy address data from billing')"
      name="copyBillingAddress"
      class="form__element"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <SfLoader :loading="shippingLoading">
        <div v-if="!shippingLoading">
          <UserAddresses
            v-if="isAuthenticated && hasSavedShippingAddress"
            :addresses="userShipping"
            :addressGetters="userShippingGetters"
            @set-current-address="handleSetCurrentAddress"
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
            data-e2e="shipping-firstName"
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
            data-e2e="shipping-lastName"
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
            data-e2e="shipping-streetName"
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
            data-e2e="shipping-city"
            v-model="form.city"
            :label="$t('City')"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="provinceName" slim>
          <SfInput
            data-e2e="shipping-provinceName"
            v-model="form.provinceName"
            :label="$t('State/Province')"
            name="provinceName"
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
            data-e2e="shipping-country"
            v-model="form.countryCode"
            :label="$t('Country')"
            name="countryCode"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
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
            data-e2e="shipping-zipcode"
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
          name="phoneNumber"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            data-e2e="shipping-phone"
            v-model="form.phoneNumber"
            :label="$t('Phone number')"
            name="phoneNumber"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            v-if="!isFormSubmitted"
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="$router.push(localePath({ name: 'billing' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            data-e2e="select-shipping"
            v-if="!isFormSubmitted"
            :disabled="loading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        :shipping-methods="shippingMethods"
        @submit="$router.push(localeRoute({ name: 'payment', params: { isFormSubmitted: isFormSubmitted } }))"
        @cancel="isFormSubmitted = false"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox,
  SfLoader,
} from '@storefront-ui/vue';
import { ref, computed, onMounted } from '@nuxtjs/composition-api';
import { useUiNotification } from '~/composables/';
import {
  useBilling,
  useShipping,
  useUserShipping,
  userShippingGetters,
  useUser,
} from '@vue-storefront/sylius';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useVSFContext } from '@vue-storefront/core';
import CheckoutHeader from '~/components/Checkout/CheckoutHeader.vue';

export default {
  name: 'Shipping',
  components: {
    CheckoutHeader,
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    SfLoader,
    ValidationProvider,
    ValidationObserver,
    UserAddresses: () => import('@/components/Checkout/UserAddresses'),
    VsfShippingProvider: () =>
      import('~/components/Checkout/VsfShippingProvider'),
  },
  setup(_, { root }) {
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

    const isFormSubmitted = ref(root.$route.params?.isFormSubmitted ?? false);
    const sameAsBilling = ref(false);
    const countries = ref([]);
    const shippingMethods = ref([]);

    const { send } = useUiNotification();
    const { $sylius } = useVSFContext();
    const { load: loadShipping, save, loading, shipping } = useShipping();
    const {
      shipping: userShipping,
      load: loadUserShipping,
      loading: shippingLoading,
    } = useUserShipping();
    const { isAuthenticated, user } = useUser();
    const { billing, load: loadBilling } = useBilling();

    const form = ref({
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      provinceName: '',
      countryCode: '',
      postcode: '',
      email: null,
      phoneNumber: null,
    });

    const getShippingMethods = async () => {
      return shippingMethods.value = await $sylius.api.getShippingMethods({
        zone: form.value.countryCode,
      });
    };

    const handleFormSubmit = async () => {
      await save({ shippingDetails: form.value });

      await getShippingMethods();

      if (shippingMethods.value.length) {
        isFormSubmitted.value = true;
        return;
      }

      send({
        type: 'danger',
        message: root.$t(
          'No shipping methods are available for selected country. Please choose a different country.'
        ),
      });
    };

    const handleCheckSameAddress = async () => {
      sameAsBilling.value = !sameAsBilling.value;
      if (sameAsBilling.value) {
        form.value = {
          ...form.value,
          ...billing.value,
        };
      }
    };

    const handleSetCurrentAddress = (address) => {
      form.value = {
        ...form.value,
        ...address,
      };
    };

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });

    onMounted(async () => {
      if (billing.value) {
        await loadShipping();
      } else {
        await Promise.all([loadShipping(), loadBilling()]);
      }
      if (!countries.value.length) {
        countries.value = await $sylius.api.getCountries();
      }
      if (shipping.value) form.value = shipping.value;
      if (isFormSubmitted.value) {
        await getShippingMethods();
      }
      if (isAuthenticated.value) {
        form.value.email = user.value.email ?? null;
        await loadUserShipping();
      }
    });

    return {
      loading,
      isFormSubmitted,
      isAuthenticated,
      sameAsBilling,
      shippingLoading,
      form,
      shippingMethods,
      userShipping,
      userShippingGetters,
      countries,
      hasSavedShippingAddress,
      handleSetCurrentAddress,
      handleFormSubmit,
      handleCheckSameAddress,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
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
    --button-width: auto;
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
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
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
      color: var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
