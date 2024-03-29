<template>
  <SfModal data-e2e="login-modal" visible class="modal" :cross="false">
    <template #modal-bar>
      <SfBar class="sf-modal__bar" :title="$t('Reset Password')" />
    </template>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
        <form class="form" @submit.prevent="handleSubmit(setNewPassword)">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <SfInput
              data-e2e="reset-password-modal-password"
              v-model="form.password"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              :label="$t('Password')"
              name="password"
              type="password"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <SfInput
              data-e2e="reset-password-modal-password-repeat"
              v-model="form.repeatPassword"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              :label="$t('Repeat Password')"
              name="repeat-password"
              type="password"
              class="form__element"
            />
          </ValidationProvider>
          <div v-if="passwordMatchError || forgotPasswordError.setNew">
            {{ passwordMatchError || forgotPasswordError.setNew.message }}
          </div>
          <SfButton
            data-e2e="reset-password-modal-submit"
            type="submit"
            class="sf-button--full-width form__button"
            :disabled="forgotPasswordLoading || loading"
          >
            <SfLoader
              :class="{ loader: forgotPasswordLoading }"
              :loading="forgotPasswordLoading || loading"
            >
              <div>{{ $t('Save Password') }}</div>
            </SfLoader>
          </SfButton>
        </form>
      </ValidationObserver>
    </div>
  </SfModal>
</template>
<script>
import {
  SfModal,
  SfButton,
  SfLoader,
  SfBar,
  SfInput,
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { useForgotPassword } from '@vue-storefront/sylius';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { useUiNotification } from '~/composables';

extend('required', {
  ...required,
  message: 'This field is required',
});

export default {
  name: 'ResetPassword',
  layout: 'blank',
  middleware: ['is-token-valid'],
  components: {
    SfButton,
    SfModal,
    SfLoader,
    SfBar,
    SfInput,
    ValidationProvider,
    ValidationObserver,
  },
  setup(props, { root }) {
    const {
      setNew,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    } = useForgotPassword();
    const passwordMatchError = ref(false);
    const form = ref({
      password: null,
      repeatPassword: null,
    });
    const loading = ref(false);

    const token = root.$route.query.token;
    const { send } = useUiNotification();

    const setNewPassword = async () => {
      passwordMatchError.value = false;
      loading.value = true;

      if (form.value.password !== form.value.repeatPassword) {
        passwordMatchError.value = root.$t('Passwords do not match');
        loading.value = false;

        return;
      }

      await setNew({ tokenValue: token, newPassword: form.value.password });
      send({ type: 'info', message: root.$t('Password Changed') });
      root.$router.push('/');
    };

    return {
      form,
      setNewPassword,
      forgotPasswordLoading,
      loading,
      forgotPasswordError,
      passwordMatchError,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
</style>
