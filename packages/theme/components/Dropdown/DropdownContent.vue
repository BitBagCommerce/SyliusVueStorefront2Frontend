<template>
  <div
    v-if="isOpen"
    :style="
      !isMobile && {
        left: `${position.x}px`,
        bottom: isTop ? `${position.y}px` : 'unset',
        top: isTop ? 'unset' : `${position.y}px`,
      }
    "
    :aria-labelledby="label"
    v-click-outside="handleToggle"
    class="dropdown"
  >
    <component :is="content" v-bind="props" />
  </div>
</template>

<script>
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
export default {
  directives: { clickOutside },
};
</script>

<script setup>
import { ref, onMounted, onUnmounted } from '@nuxtjs/composition-api';
import useDropdown from '~/composables/useDropdown';

const { position, content, props, label, isOpen, isTop, toggle } =
  useDropdown();

const isMobile = ref(false);

const handleIsMobile = () => {
  isMobile.value = window ? window.innerWidth < 1024 : false;
};

const handleToggle = ({ target }) => {
  if (!target.dataset.target) toggle();
};

onMounted(() => {
  handleIsMobile();
  window.addEventListener('resize', handleIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleIsMobile);
});
</script>

<style scoped lang="scss">
.dropdown {
  position: fixed;
  z-index: 10;

  @include for-mobile {
    bottom: 3.75rem;
    left: 0;
    right: 0;
  }

  @include for-desktop {
    transform: translateX(-100%);
  }

  > * {
    position: initial;
    transform: initial;
  }
}
</style>
