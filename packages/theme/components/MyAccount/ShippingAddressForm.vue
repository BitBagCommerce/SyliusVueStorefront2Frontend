<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="shipping-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
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
      </div>
      <div class="form__horizontal">
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
      </div>
      <div class="form__horizontal">
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

        <ValidationProvider
          name="state"
          slim
        >
          <SfInput
            data-e2e="shipping-state"
            v-model="form.state"
            :label="$t('State/Province')"
            name="state"
            class="form__element form__element--half"
          />
        </ValidationProvider>

      </div>
      <div class="form__horizontal">
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
      </div>
      <div class="form__horizontal">
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
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>

      <SfButton type="submit" class="form__button">
        {{ isNew ? $t('Add the address') : $t('Update the address') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { SfInput, SfButton, SfSelect, SfCheckbox } from '@storefront-ui/vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive, onMounted, ref } from '@nuxtjs/composition-api';
import { useUiNotification } from '~/composables/';
import { useVSFContext } from '@vue-storefront/core';

export default {
  name: 'ShippingAddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        postcode: '',
        countryCode: '',
        phoneNumber: '',
      }),
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, { emit, root }) {
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
    extend('oneOf', {
      ...oneOf,
      message: root.$t('Invalid country'),
    });

    const { $vsf } = useVSFContext();
    const countries = ref([]);

    const { send } = useUiNotification();
    const form = reactive({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      street: props.address.street,
      city: props.address.city,
      postcode: props.address.postcode,
      countryCode: props.address.countryCode,
      phoneNumber: props.address.phoneNumber,
    });

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: (msg) => {
          send({ type: 'info', message: msg });
        },
        onError: (msg) => {
          send({ type: 'danger', message: msg });
        },
      });
    };

    onMounted(async () => {
      countries.value = await $vsf.$sylius.api.getCountries();
    });

    return {
      form,
      submitForm,
      countries: countries,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
