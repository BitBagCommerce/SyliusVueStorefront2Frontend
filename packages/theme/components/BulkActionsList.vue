<template>
  <div class="list">
    <div class="list__top-bar">
      <SfCheckbox
        label="Select all"
        :selected="areAllItemsSelected"
        @change="selectAll"
      />

      <div>
        <span>{{ selectedItems.length }}</span>
        <span>/</span>
        <span>{{ reactiveItems.length }}</span>
      </div>
    </div>

    <div
      v-for="item in reactiveItems"
      :key="item[uniqueKey]"
      class="list__item-wrapper"
    >
      <slot :item="item" :selectItem="() => selectItem(item)">
        <ProductItem
          :image="getters.getItemImage(item)"
          :title="getters.getItemName(item)"
          :regular-price="$n(getters.getItemPrice(item).regular, 'currency')"
          :special-price="
            getters.getItemPrice(item).special &&
            $n(getters.getItemPrice(item).special, 'currency')
          "
          image-width="180"
          image-height="200"
          :isRemovingInProgress="false"
          @remove="$emit('remove', item)"
          class="item"
        >
          <template #configuration>
            <div class="item__properties">
              <SfProperty
                v-for="(attribute, key) in getters.getItemAttributes(item, [
                  'size',
                ])"
                :key="key"
                :name="key"
                :value="attribute"
              />
            </div>
          </template>

          <template #input>
            <div class="item__input">
              <SfCheckbox
                @change="selectItem(item)"
                :selected="item.isSelected"
                class="item__input--checkbox"
              />

              <QuantitySelector
                :qty="item.qty"
                @quantity-change="handleQuantityChange(item, $event)"
                class="item__input--quantity"
              />
            </div>
          </template>

          <template #actions>&nbsp;</template>
        </ProductItem>
      </slot>
    </div>
  </div>
</template>

<script>
import { SfCollectedProduct, SfCheckbox, SfProperty } from '@storefront-ui/vue';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import ProductItem from './CartSidebar/ProductItem.vue';
import QuantitySelector from './CartSidebar/QuantitySelector.vue';

export default {
  name: 'BulkActionsList',
  components: {
    SfCollectedProduct,
    SfCheckbox,
    ProductItem,
    SfProperty,
    QuantitySelector,
  },
  props: {

    /**
     * Array of items which will be used for rendering your list. Selected items from this array will be accessible through v-model attribute on this component. Singular items from this array are also accessible if you are using default slot on this component, through item attribute on default slot.
     * @example
     * <BulkActionsList :items="items">
     *    <template #default="{ item }">
     *      <span>
     *        {{ item.name }}
     *      </span>
     *    </template>
     * </BulkActionsList>
     */
    items: {
      type: Array,
      default: () => [],
    },

    /**
     * Property of a singular item from your items used for comparisons. Make sure this key is unique otherwise some operations may not work properly.
     * @default _id
     */
    uniqueKey: {
      type: String,
      default: '_id',
    },

    /**
     * Getters used for getting data from items, if you aren't using default component slot. Prop can be empty if you aren't using default slot otherwise it's required for this component to work.
     */
    getters: {
      type: Object,
      required: false,
      validator({
        getItemImage,
        getItemName,
        getItemPrice,
        getItemAttributes,
      }) {
        const missingPropertyError = (property) =>
          console.error(
            `[BulkActionsList.vue]: Prop "getters" is missing "${property}" property`
          );

        let isValid = true;

        if (!getItemImage) {
          missingPropertyError('getItemImage');
          isValid = false;
        }

        if (!getItemName) {
          missingPropertyError('getItemName');
          isValid = false;
        }

        if (!getItemPrice) {
          missingPropertyError('getItemPrice');
          isValid = false;
        }

        if (!getItemAttributes) {
          missingPropertyError('getItemAttributes');
          isValid = false;
        }

        return isValid;
      },
    },
    modelValue: {
      type: Array,
    },
  },
  emits: ['update:modelValue', 'quantity-change', 'remove'],
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  setup(props, { emit }) {
    const initItems = () =>
      props.items.map((item) => ({ ...item, isSelected: false }));

    const reactiveItems = ref(initItems());

    const selectedItems = computed(() =>
      reactiveItems.value.filter((item) => item.isSelected)
    );
    const areAllItemsSelected = computed(() =>
      reactiveItems.value.every((item) => item.isSelected)
    );

    /**
     * Changes selection of provided item, and updates modelValue.
     * @param {Object} item - Item which selection will be changed.
     * @param {boolean} item.isSelected
     * @param {boolean} value - Value which will be used to changed item selection, if not provided current selection value will be inverted.
     */
    const selectItem = (item, value) => {
      const itemIndex = reactiveItems.value.findIndex(
        (reactive) => reactive[props.uniqueKey] === item[props.uniqueKey]
      );

      reactiveItems.value[itemIndex].isSelected =
        value ?? !reactiveItems.value[itemIndex].isSelected;

      emit('update:modelValue', selectedItems.value);
    };

    const selectAll = () => {
      const select = !areAllItemsSelected.value;

      reactiveItems.value.forEach((item) => selectItem(item, select));
    };

    const handleQuantityChange = (item, qty) => {
      item.qty = qty;
      emit('quantity-change', item);
    };

    watch(
      () => props.items,
      () => {
        reactiveItems.value = initItems();
      }
    );

    return {
      reactiveItems,
      selectedItems,
      areAllItemsSelected,
      selectItem,
      selectAll,
      handleQuantityChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: fit-content;
  display: flex;
  flex-direction: column;

  &__top-bar {
    padding: 0 var(--spacer-xs);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--c-light) 1px solid;
  }
}

.item {
  $borer-spacer: var(--spacer-xs);

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    &--checkbox {
      position: absolute;
      top: $borer-spacer;
      left: $borer-spacer;
      background-color: var(--c-light);

      ::v-deep .sf-checkbox__message {
        display: none;
      }
    }

    &--quantity {
      position: absolute;
      bottom: $borer-spacer;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
