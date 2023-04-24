<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab :title="$t('Personal data')">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>

      <ProfileUpdateForm @submit="updatePersonalData" />

      <p class="notice">
        {{ $t('Use your personal data') }}
        <a href="">{{ $t('Privacy Policy') }}</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab :title="$t('Password change')">
      <p class="message">
        {{ $t('Change password your account') }}:<br />
        {{ $t('Your current email address is') }}
        <span class="message__label">{{ currentEmail }}</span>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
  </SfTabs>
</template>

<script>
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/sylius';

export default {
  name: 'PersonalDetails',

  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm
  },

  setup() {
    const { updateUser, changePassword, user, error } = useUser();
    const currentEmail = userGetters.getEmailAddress(user.value);

    const formHandler = async (fn, onComplete, onError) => {
      const data = await fn();
      const userError = Object.values(error.value).find(err => err !== null);

      if (userError) {
        const formattedStrings = userError.message.replace(/currentPassword: |newPassword: /g, '').split('\n');

        formattedStrings.forEach((str, i) => setTimeout(() => onError(str), 200 * i));

        return;
      }

      onComplete(data);
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword({ current: form.value.currentPassword, new: form.value.newPassword }), onComplete, onError);

    return {
      updatePersonalData,
      updatePassword,
      currentEmail
    };
  }
};
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
