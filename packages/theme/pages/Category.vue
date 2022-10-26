<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Categories')"
            class="navbar__title" />
        </LazyHydrate>
      </div>
      <CategoryPageHeader :pagination="pagination"/>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader
          :class="{ 'loading--categories': loading }"
          :loading="loading">
            <SfAccordion
              v-e2e="'categories-accordion'"
              :open="activeCategory"
              :show-chevron="true"
            >
              <SfAccordionItem
                v-for="(cat, i) in categoryTree && categoryTree.items"
                :key="i"
                :header="cat.label"
              >
                <template>
                  <SfList class="list">
                    <SfListItem class="list__item">
                      <SfMenuItem
                        :count="cat.count || ''"
                        :label="cat.label"
                      >
                        <template #label>
                          <nuxt-link
                            :to="localePath(th.getCatLink(cat))"
                            :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                          >
                            All
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                    <SfListItem
                      class="list__item"
                      v-for="(subCat, j) in cat.items"
                      :key="j"
                    >
                      <SfMenuItem
                        :count="subCat.count || ''"
                        :label="subCat.label"
                      >
                        <template #label="{ label }">
                          <nuxt-link
                            :to="localePath(th.getCatLink(subCat))"
                            :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                          >
                            {{ label }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :wishlistIcon="false"
              :is-in-wishlist="isInWishlist({ product })"
              :is-added-to-cart="isInCart({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="products__product-card"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
              @click:add-to-cart="handleAddToCart({ product, quantity: 1 })"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              class="products__product-card-horizontal"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :description="productGetters.getDescription(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :qty="1"
              :wishlistIcon="false"
              :is-in-wishlist="isInWishlist({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              @input="productsQuantity[product._id] = $event"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
              @click:add-to-cart="handleAddToCart({ product, quantity: Number(productsQuantity[product._id]) })"
            >
              <template #configuration>
                <SfProperty
                  v-for="(property, i) in product.attributes"
                  :key="i"
                  :name="property.name"
                  :value="property.stringValue"
                  class="product__property"
                >
                  <template v-if="property.name === 'Category'" #value>
                    <SfButton class="product__property__button sf-button--text">
                      {{ property.value }}
                    </SfButton>
                  </template>
                </SfProperty>
              </template>
              <template #wishlist-icon />
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{ $t('Show on page') }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination && pagination.itemsPerPage ? pagination.itemsPerPage.toString() : ''"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
      </SfLoader>
    </div>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
  SfAddToCart
} from '@storefront-ui/vue';
import { computed, ref, watch, onBeforeUnmount } from '@nuxtjs/composition-api';
import { useCart, useWishlist, productGetters, useFacet, facetGetters, wishlistGetters } from '@vue-storefront/sylius';
import { useUiHelpers, useUiState, useUiNotification } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import CategoryPageHeader from '~/components/CategoryPageHeader';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  computed: {
    ...mapMobileObserver()
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
  setup(props, context) {
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart, error: useCartError } = useCart();
    const { result, search, loading, error } = useFacet();
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist, wishlist } = useWishlist();
    const { send } = useUiNotification();

    const products = computed(() => facetGetters.getProducts(result.value));
    const productsQuantity = ref({});
    const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));
    const pagination = computed(() => facetGetters.getPagination(result.value));
    const activeCategory = computed(() => {
      const items = categoryTree.value.items;

      if (!items || !items.length) {
        return '';
      }

      const category = items.find(({ isCurrent, items }) => isCurrent || items.find(({ isCurrent }) => isCurrent));

      return category?.label || items[0].label;
    });

    const initProductsQuantity = async () => {
      await products.value?.forEach(product => {
        productsQuantity.value[product._id] = 1;
      });
    };

    initProductsQuantity();
    watch(products, initProductsQuantity);

    const handleAddToCart = async (params) => {
      await addItemToCart(params);

      const cartError = Object.values(useCartError.value).find(err => err !== null);

      if (cartError) {
        send({ type: 'danger', message: cartError.message });

        return;
      }

      send({ type: 'success', message: 'Product has been added to the cart' });
    };

    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      const product = productsInWhishlist.value.find(wishlistProduct => wishlistProduct.variant.sku === productItem.sku);
      removeItemFromWishlist({ product });
    };

    onSSR(async () => {
      await search(th.getFacetsFromURL());
      if (error?.value?.search) context.root.$nuxt.error({ statusCode: 404 });
    });

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      ...uiState,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      activeCategory,
      breadcrumbs,
      handleAddToCart,
      addItemToWishlist,
      removeProductFromWishlist,
      isInWishlist,
      isInCart,
      productsQuantity
    };
  },
  components: {
    CategoryPageHeader,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    SfAddToCart
  }
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
}
.main {
  display: flex;
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: flex-start;

    @include for-mobile {
      display: grid;
      grid-gap: var(--spacer-sm);
      grid-template-columns: repeat(auto-fill, 10rem);
      justify-content: center;
    }
  }
  &__product-card {
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: 0 auto;
    flex: 1 1 auto;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;

    ::v-deep .sf-image {
      --image-width: 100%;
      --image-height: auto;
    }

    @include for-mobile {
      --product-card-horizontal-review-margin: 0;
      --product-card-horizontal-actions-wrapper-margin: var(--spacer-xs) 0 0 0;

      ::v-deep {
        .sf-image {
          --image-width: 8rem;
          --image-height: 100%;
        }

        .sf-product-card-horizontal {
          &__configuration {
            display: none;
          }

          &__actions-wrapper {
            align-items: flex-start;
            gap: var(--spacer-xs);
          }

          &__add-to-cart {
            width: 100%;
            display: flex !important;
          }

          &__link--image {
            height: 100%;
          }

          &__image {
            height: 100%;
          }
        }

        .sf-add-to-cart {
          flex-direction: column;
          align-items: flex-start;
          gap: var(--spacer-xs);

          &__select-quantity {
            width: 100%;

            .sf-quantity-selector__input {
              width: 100%;
            }
          }
        }
      }
    }

    @include for-tablet {
      ::v-deep {
        .sf-product-card-horizontal {
          &__main {
            display: flex;
            flex-direction: row;
          }

          &__configuration {
            display: block;
          }

          &__details {
            flex: 1 0 auto;
          }

          &__actions-wrapper {
            margin: 0;
            flex: 0 1 auto;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .sf-product-card-horizontal__add-to-cart {
          width: auto;
        }

        .sf-add-to-cart {
          width: auto;
          flex-direction: row;
          align-items: flex-end;

          &__select-quantity {
            width: var(--quantity-selector-width, 6.75rem);
            flex-grow: 0;
          }
        }
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(.5);
  }
  &__slide-enter-active {
    transition: all .2s ease;
    transition-delay: calc(.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.product {
  &__property {
    margin: 0.4em 0;
  }
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
</style>
