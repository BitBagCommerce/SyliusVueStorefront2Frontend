<template>
  <div class="container">
    <SfButton
      class="container__lang container__lang--selected"
      @click="openLangModal"
    >
      <SfImage
        :src="`/icons/langs/${locale}.webp`"
        width="20"
        alt="Flag"
        :placeholder="loader"
        />
    </SfButton>
    <SfMegaMenu
      :visible="isLangModalOpen"
      v-click-outside="closeLangModal"
      class="mega-menu"
    >
      <h4 class="mega-menu__header">
        Choose a language
      </h4>
      <SfList class="mega-menu__list">
        <SfListItem
          v-for="lang in availableLocales"
          :key="lang.code"
          @click.native="closeLangModal"
          class="mega-menu__list--item"
        >
          <NuxtLink :to="switchLocalePath(lang.code)">
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ lang.label }}</span>
              </template>
              <template #icon>
                <SfImage
                  :src="`/icons/langs/${lang.code}.webp`"
                  width="20"
                  alt="Flag"
                  :placeholder="loader"
                  class="language__flag"
                />
              </template>
            </SfCharacteristic>
          </NuxtLink>
        </SfListItem>
      </SfList>
      <SfButton
        class="mega-menu__list--button color-secondary smartphone-only"
        @click="closeLangModal"
      >
        {{ $t('Go back') }}
      </SfButton>
    </SfMegaMenu>
  </div>
</template>

<script>
import {
  SfImage,
  SfSelect,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic,
  SfMegaMenu,
  SfOverlay
} from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import loader from '~/static/icons/loader.svg';

export default {
  components: {
    SfImage,
    SfSelect,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
    SfMegaMenu,
    SfOverlay
  },
  emits: ['click'],
  directives: { clickOutside },
  setup(props, context) {
    const { locales, locale } = context.root.$i18n;
    const isLangModalOpen = ref(false);
    const availableLocales = computed(() => locales.filter(i => i.code !== locale));

    const openLangModal = () => {
      isLangModalOpen.value = true;
      context.emit('click', isLangModalOpen.value);
      document.body.classList.add('no-scroll');
    };

    const closeLangModal = () => {
      isLangModalOpen.value = false;
      context.emit('click', isLangModalOpen.value);
      document.body.classList.remove('no-scroll');
    };

    return {
      availableLocales,
      locale,
      isLangModalOpen,
      openLangModal,
      closeLangModal,
      loader
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: static;

  .mega-menu {
    --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
    --mega-menu-content-padding: 0;
    --mega-menu-height: 50vh;
    --mega-menu-menu-flex-direction: column;
    --mega-menu-bar-display: none;

    position: absolute;
    top: 100%;
    left: 0;
    z-index: 3;

    ::v-deep .sf-mega-menu {
      height: 100%;

      &__content, &__menu {
        height: 100%;
      }
    }

    &__header {
      margin: var(--spacer-sm) auto;
    }

    &__list {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;

      &--item .language {
        display: flex;
        justify-content: center;
      }

      &--button {
        width: calc(100% - (2 * var(--spacer-sm)));
        margin: auto var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
      }
    }
  }

  .sf-list {
    .language {
      padding: var(--spacer-sm);
      &__flag {
        margin-right: var(--spacer-sm);
      }
    }
    display: flex;
  }

  &__lang {
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}
</style>
