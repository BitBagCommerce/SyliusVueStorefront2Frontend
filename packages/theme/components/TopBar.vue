<template>
  <div>
    <SfTopBar class="topbar">
      <template #left>
        <SfButton class="sf-button--text">
          <p>
            <SfButton class="topbar__button sf-button--text" :link="bitbagLink" target="_blank">{{ $t('Sylius integration powered by BitBag') }}</SfButton>
          </p>
        </SfButton>
      </template>
      <template #center>
        <p>{{ $t('The source code available on') }}</p>
        <SfButton class="topbar__button sf-button--text" :link="githubLink" target="_blank">{{ $t('GitHub') }}</SfButton>
      </template>
      <template #right>
        <LocaleSelector @click="toggleOverlay" />
      </template>
    </SfTopBar>
    <SfOverlay :visible="isOverlayOpen"></SfOverlay>
  </div>
</template>

<script>
import { SfButton, SfTopBar, SfOverlay } from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector,
    SfOverlay
  },
  data() {
    return {
      githubLink: 'https://github.com/BitBagCommerce/SyliusVueStorefrontFrontend',
      bitbagLink: 'https://bitbag.io'
    };
  },
  setup() {
    const isOverlayOpen = ref(false);

    const toggleOverlay = (val) => isOverlayOpen.value = val;

    return {
      isOverlayOpen,
      toggleOverlay
    };
  }
};

</script>

<style lang="scss" scoped>
.topbar {
  padding: 0 var(--spacer-sm);
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
