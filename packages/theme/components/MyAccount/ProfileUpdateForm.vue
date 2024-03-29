<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form class="form" @submit.prevent="handleSubmit(submitForm(reset))">
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.firstName"
            name="firstName"
            :label="$t('First name')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.lastName"
            name="lastName"
            :label="$t('Last name')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider name="gender" v-slot="{ errors }" slim>
          <SfSelect
            data-e2e="gender"
            v-model="form.gender"
            :label="$t('Gender')"
            name="gender"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="genderOption in genderOptions"
              :key="genderOption.key"
              :value="genderOption.key"
            >
              {{ genderOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>

        <ValidationProvider
          rules="required|digits:9"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.phoneNumber"
            name="phoneNumber"
            :label="$t('Phone number')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>

      <div class="form__horizontal">
        <SfInput
          type="date"
          name="birthday"
          :label="$t('Birthday')"
          class="form__element"
          :value="selectedBirthday"
          @input="handleBirthday"
        />
        <SfCheckbox
          data-e2e="copy-address"
          :selected="form.subscribedToNewsletter"
          @change="handleCheckSubscribedToNewsletter"
          :label="$t('Subscribed to newsletter')"
          name="subscribedToNewsletter"
          class="form__element"
        />
      </div>

      <ValidationProvider
        rules="required|email"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          v-model="form.email"
          type="email"
          name="email"
          :label="$t('Your e-mail')"
          required
          disabled
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfButton type="submit" class="form__button">{{
        $t('Update personal data')
      }}</SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { ref, onMounted } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { digits } from 'vee-validate/dist/rules';
import { useUser, userGetters } from '@vue-storefront/sylius';
import { SfInput, SfButton, SfSelect, SfCheckbox } from '@storefront-ui/vue';
import { useUiNotification } from '~/composables/';
import { parse as parseDate, format as formatDate } from 'date-fns';

export default {
  name: 'ProfileUpdateForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
  },

  setup(_, { emit, root }) {
    const { user } = useUser();
    const { send } = useUiNotification();
    const resetForm = () => ({
      firstName: userGetters.getFirstName(user.value),
      lastName: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value),
      gender: user.value.gender,
      birthday: user.value.birthday,
      phoneNumber: user.value.phoneNumber,
      subscribedToNewsletter: user.value.subscribedToNewsletter || false,
    });
    const form = ref(resetForm());
    const selectedBirthday = ref('');

    extend('digits', {
      ...digits,
      message: root.$t('Please provide a valid phone number'),
    });

    const genderOptions = [
      { key: 'u', label: root.$t('Unknown') },
      { key: 'm', label: root.$t('Male') },
      { key: 'f', label: root.$t('Female') },
    ];

    const handleBirthday = (val) => {
      val = val.split(' ')[0];
      selectedBirthday.value = val;
      const birthday = parseDate(val, 'yyyy-MM-dd', new Date());
      form.value.birthday = formatDate(birthday, 'yyyy-MM-dd 00:00:00');
    };
    const handleCheckSubscribedToNewsletter = (val) => {
      form.value.subscribedToNewsletter = val;
    };

    const submitForm = (resetValidationFn) => {
      return () => {
        const onComplete = () => {
          send({ type: 'info', message: root.$t('Profile has been updated') });
          form.value = resetForm();
          resetValidationFn();
        };

        const onError = (error) => {
          send({ type: 'danger', message: error });
        };

        emit('submit', { form, onComplete, onError });
      };
    };

    onMounted(() => {
      if (user.value.birthday) {
        const birthday = user.value.birthday.split('T');
        handleBirthday(birthday[0]);
      }
    });

    return {
      form,
      submitForm,
      handleCheckSubscribedToNewsletter,
      handleBirthday,
      selectedBirthday,
      genderOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-2xl);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
