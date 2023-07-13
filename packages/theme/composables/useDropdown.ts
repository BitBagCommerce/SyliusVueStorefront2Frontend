import { ref, computed, onMounted, onUnmounted } from '@nuxtjs/composition-api';

type Position = {
  x: number;
  y: number;
};

const _rawPosition = ref<Position>({ x: 0, y: 0 });
const _windowHeight = ref(0);

/**
 * HTML element used for toggling dropdown. If it's set to null it means that dropdown is closed, otherwise it's open.
 */
const toggleElement = ref<HTMLElement | null>(null);

/**
 * Vue component which will by the content of your dropdown.
 */
const dropdownContent = ref<any>('');

/**
 * Props assign to your Vue component.
 */
const dropdownProps = ref<Record<string, any>>({});

/**
 * Position based on which your modal will be placed on the page.
 */
const position = ref<Position>({ x: 0, y: 0 });

/**
 * Based on this boolean dropdown will be render on top or below toggle element.
 */
const isTop = computed(() => _rawPosition.value.y > _windowHeight.value / 2);

/**
 * This composables is tightly integrated with DropdownButton.vue, and DropdownContent.vue components.
 */
const useDropdown = () => {

  /**
   * This function handles calculation of dropdown position based on toggleElement, which is an HTML element used for toggling your modal
   */
  const _handlePosition = () => {
    if (!toggleElement) return;

    const {
      left = 0,
      top = 0,
      bottom = 0,
      width = 0,
    } = toggleElement.value?.getBoundingClientRect() ?? {};

    position.value = {
      x: left + width,
      y: isTop.value ? _windowHeight.value - top : bottom,
    };
    _rawPosition.value = {
      x: left + width,
      y: top,
    };
  };

  const _handleWidowHeight = () => {
    _windowHeight.value = window.innerHeight;
    _handlePosition();
  };

  /**
   * Function used for toggling your dropdown and setting content you want it to display, calling it without any parameters will close your dropdown.
   * @param element HTML element which is used for toggling dropdown, if this parameter is the same as toggleElement ref dropdown will close.
   * @param content Vue component which is supposed to be displayed as a content of your dropdown. This parameter has to be an import of Vue component.
   * @param props Props passed to your Vue component.
   */
  const toggle = (
    element: HTMLElement | null = null,
    content = '',
    props: Record<string, unknown> = {}
  ) => {
    toggleElement.value = element === toggleElement.value ? null : element;

    _handlePosition();

    if (toggleElement.value) {
      dropdownContent.value = content;
      dropdownProps.value = props;
      document.addEventListener('scroll', _handlePosition);
      _handlePosition();
    } else {
      dropdownContent.value = '';
      dropdownProps.value = {};
      document.removeEventListener('scroll', _handlePosition);
      position.value = { x: 0, y: 0 };
    }
  };

  onMounted(() => {
    _handleWidowHeight();
    window.addEventListener('resize', _handleWidowHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', _handleWidowHeight);
  });

  return {
    toggle,
    isOpen: computed(() => Boolean(toggleElement.value)),
    position: computed(() => position.value),
    toggleElement: computed(() => toggleElement.value),
    content: computed(() => dropdownContent.value),
    props: computed(() => dropdownProps.value),
    label: computed(() => toggleElement.value?.id ?? ''),
    isTop,
  };
};

export default useDropdown;
