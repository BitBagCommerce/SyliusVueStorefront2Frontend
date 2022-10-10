<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">
        <p>
          <SfButton class="topbar__button sf-button--text" :link="bitbagLink">{{ $t('Sylius integration powered by BitBag') }}</SfButton>
        </p>
      </SfButton>
    </template>
    <template #center>
      <p>{{ $t('The source code available on') }}</p>
      <SfButton class="topbar__button sf-button--text" :link="githubLink">{{ $t('GitHub') }}</SfButton>
    </template>
    <template #right>
      <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  },
  data() {
    return {
      githubLink: 'https://bitbag.io',
      bitbagLink: 'https://github.com/BitBagCommerce/SyliusVueStorefrontFrontend',
    };
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
