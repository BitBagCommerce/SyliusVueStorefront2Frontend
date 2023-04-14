<template>
  <div class="sf-collected-product">
    <div class="sf-collected-product__main">
      <div class="sf-collected-product__details">
        <slot name="title" v-bind="{ title }">
          <div class="sf-collected-product__title-wraper">
            <component
              :is="componentIs"
              class="sf-collected-product__title"
              :link="link ? link : ''"
            >
              {{ title }}
            </component>
          </div>
        </slot>
        <slot name="price" v-bind="{ specialPrice, regularPrice }">
          <SfPrice
            :class="{ 'display-none': !regularPrice }"
            :regular="regularPrice"
            :special="specialPrice"
          />
        </slot>
        <div class="sf-collected-product__configuration">
          <slot name="configuration">
            <SfProperty name="Size" value="XS" />
            <SfProperty name="Color" value="white" />
          </slot>
        </div>
      </div>
      <div class="sf-collected-product__actions">

      </div>
    </div>
    <div class="sf-collected-product__aside">
      <slot name="image" v-bind="{ image, title }">
        <SfImage
          :src="image"
          :alt="title"
          :width="imageWidth"
          :height="imageHeight"
          :placeholder="productPlaceholder"
          class="sf-collected-product__image"
        />
      </slot>
      <slot name="input">
        <div class="sf-collected-product__quantity-wrapper">
          <QuantitySelector
              :qty="qty"
              :min="minQty"
              :max="maxQty"
              class="sf-collected-product__quantity-selector"
              @input="$emit('input', $event)"
              :disabled="loading"
            />
        </div>
      </slot>
    </div>
    <slot name="remove" v-bind="{ removeHandler }">
      <template :class="{ 'display-none': !hasRemove }">
        <SfLoader v-if="isRemovingInProgress" class="wishlist-action-loader" :loading="true" />
        <template v-else>
          <SfCircleIcon
            icon="cross"
            aria-label="Remove"
            class="
              sf-circle-icon--small
              sf-collected-product__remove
              sf-collected-product__remove--circle-icon
            "
            @click="removeHandler"
          />
          <SfButton
            class="
              sf-button--text
              sf-collected-product__remove sf-collected-product__remove--text
            "
            data-testid="collected-product-desktop-remove"
            @click="removeHandler"
          >Remove</SfButton>
        </template>
      </template>
    </slot>
  </div>
</template>
<script>
import {
  SfPrice,
  SfIcon,
  SfImage,
  SfCircleIcon,
  SfButton,
  SfQuantitySelector,
  SfLink,
  SfProperty,
  SfLoader
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import productPlaceholder from '@storefront-ui/shared/images/product_placeholder.svg';
import QuantitySelector from './QuantitySelector.vue';

export default {
  name: 'ProductItem',
  components: {
    SfButton,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfPrice,
    SfQuantitySelector,
    SfLink,
    SfProperty,
    QuantitySelector,
    SfLoader
  },
  model: {
    prop: 'qty'
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    imageWidth: {
      type: [String, Number],
      default: 140
    },
    imageHeight: {
      type: [String, Number],
      default: 200
    },
    title: {
      type: String,
      default: ''
    },
    regularPrice: {
      type: [Number, String],
      default: null
    },
    specialPrice: {
      type: [Number, String],
      default: null
    },
    qty: {
      type: [Number, String],
      default: 1
    },
    minQty: {
      type: Number,
      default: 0
    },
    maxQty: {
      type: Number,
      default: 99
    },
    link: {
      type: [String, Object],
      default: ''
    },
    hasRemove: {
      type: Boolean,
      default: true
    },
    hasMoreActions: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    isRemovingInProgress: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const componentIs = computed(() => props.link ? 'SfLink' : 'div');
    const isConfirmOpen = ref(false);
    const inputQty = ref(props.qty);

    const handleInput = (input) => {
      inputQty.value = input;
      isConfirmOpen.value = true;
    };

    const handleCancel = () => {
      inputQty.value = props.qty;
      isConfirmOpen.value = false;
    };

    return {
      productPlaceholder,
      componentIs,
      isConfirmOpen,
      inputQty,
      handleInput,
      handleCancel
    };
  },
  methods: {
    removeHandler() {
      this.$emit('click:remove');
    },
    actionsHandler() {
      this.$emit('click:actions');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@storefront-ui/shared/styles/components/organisms/SfCollectedProduct";

.input {
  position: relative;

  &__confirm {
    right: 0;
  }

  &__cancel {
    left: 0;
  }

  &__confirm, &__cancel {
    --button-padding: 0;

    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 1.5rem;
  }
}

.wishlist-action-loader {
  position: absolute;
  height: auto;
  bottom: var(--spacer-xs);
  right: 0;
  z-index: 10;
  width: 20px;
  transform: translate(-10px, -20px);
  @include for-desktop{
    top: var(--spacer-xs);
    bottom: unset;
    transform: translate(7px, 0px);
  }
  ::v-deep .sf-loader__overlay{
    border-radius: 9999px;
    background-color: var(--c-light);
    height: 26px;
    width: 26px;
    svg{
      width: 20px;
      height: 20px;
    }
  }
}
</style>
