<template>
  <SfButton
    v-if="buttonStyle === BUTTON_STYLES.BUTTON"
    :id="label"
    @click="handleToggle"
    data-target="dropdown"
    :class="{ 'force-visible': isToggled }"
  >
    <slot>{{ $t('Open') }}</slot>
  </SfButton>

  <SfCircleIcon
    v-else-if="buttonStyle === BUTTON_STYLES.CIRCLE"
    :id="label"
    @click="handleToggle"
    data-target="dropdown"
    :class="{ 'force-visible': isToggled }"
  >
    <slot>{{ $t('Open') }}</slot>
  </SfCircleIcon>

  <button
    v-else-if="buttonStyle === BUTTON_STYLES.UNSTYLED"
    :id="label"
    @click="handleToggle"
    class="unstyled"
    data-target="dropdown"
    :class="{ 'force-visible': isToggled }"
  >
    <slot>{{ $t('Open') }}</slot>
  </button>
</template>

<script setup>
import useDropdown from '~/composables/useDropdown';
import { SfButton, SfCircleIcon } from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';

const BUTTON_STYLES = {
  BUTTON: 'button',
  CIRCLE: 'circle',
  UNSTYLED: 'unstyled',
};

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  content: {
    type: [Object, String],
    required: true,
  },
  props: {
    type: Object,
    default: () => {},
  },
  buttonStyle: {
    type: String,
    default: 'button',
  },
});

const { toggle, toggleElement } = useDropdown();

const element = ref(null);
const isToggled = computed(() =>
  !element.value ? false : toggleElement.value === element.value
);

const handleToggle = ({ target }) => {
  element.value = target;
  toggle(target, props.content, props.props);
};
</script>

<style>
.unstyled {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.force-visible {
  display: flex !important;
}
</style>
