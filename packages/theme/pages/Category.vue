<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <SfLoader
          :class="{ 'loading--categories': categoriesLoading }"
          :loading="categoriesLoading"
        >
          <SfHeading
            :level="3"
            :title="categoryTree.parent ? categoryTree.parent.name : ''"
            class="navbar__title"
          />
        </SfLoader>
      </div>
      <CategoryPageHeader :pagination="pagination" />
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <SfLoader
          :class="{ 'loading--categories': categoriesLoading }"
          :loading="categoriesLoading"
        >
          <SfAccordion
            v-if="categoryTree.children"
            v-e2e="'categories-accordion'"
            :show-chevron="true"
          >
            <nuxt-link
              v-if="categoryTree.parent"
              :to="localePath(th.getCatLink(categoryTree.parent))"
            >
              <SfAccordionItem
                :header="$t('All')"
                class="no-children"
                :class="{
                  'sf-accordion-item-active': isCategoryActive(
                    categoryTree.parent
                  ),
                }"
              >
              </SfAccordionItem>
            </nuxt-link>
            <div
              v-for="child in categoryTree.children"
              :key="child.id"
              :class="{ 'sf-accordion-item-active': isCategoryActive(child) }"
            >
              <SfAccordionItem v-if="hasChildren(child)" :header="child.name">
                <template>
                  <SfList class="list">
                    <SfListItem class="list__item">
                      <SfMenuItem :count="child.count" :label="child.name">
                        <template #label>
                          <nuxt-link
                            :to="localePath(th.getCatLink(child))"
                            :class="{
                              'sidebar--cat-selected': child.isCurrent,
                            }"
                          >
                            All
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                    <SfListItem
                      class="list__item"
                      v-for="(subCat, j) in child.children"
                      :key="j"
                    >
                      <SfMenuItem
                        :count="subCat.count || ''"
                        :label="subCat.name"
                      >
                        <template #label="{ label }">
                          <nuxt-link
                            :to="localePath(th.getCatLink(subCat))"
                            :class="{
                              'sidebar--cat-selected': subCat.isCurrent,
                            }"
                          >
                            {{ label }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
              <nuxt-link v-else :to="localePath(th.getCatLink(child))">
                <SfAccordionItem :header="child.name" class="no-children">
                </SfAccordionItem>
              </nuxt-link>
            </div>
          </SfAccordion>
        </SfLoader>
      </div>
      <SfLoader
        :class="{ loading: productsLoading }"
        :loading="productsLoading"
      >
        <div class="products" v-if="!productsLoading">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <div
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              @mouseover="isDropdownVisible = true"
              @mouseleave="isDropdownVisible = false"
              class="product-card"
            >
              <SfProductCard
                v-e2e="'category-product-card'"
                :style="{ '--index': i }"
                :title="productGetters.getName(product)"
                :image="productGetters.getCoverImage(product)"
                imageHeight="260"
                imageWidth="260"
                :regular-price="
                  $n(productGetters.getPrice(product).regular, 'currency')
                "
                :special-price="
                  productGetters.getPrice(product).special &&
                  $n(productGetters.getPrice(product).special, 'currency')
                "
                :max-rating="5"
                :score-rating="productGetters.getAverageRating(product)"
                :show-add-to-cart-button="true"
                :is-added-to-cart="isInCart({ product })"
                :wishlist-icon="false"
                :link="
                  localePath(
                    `/p/${productGetters.getId(
                      product
                    )}/${productGetters.getSlug(product)}`
                  )
                "
                :addToCartDisabled="
                  product.selectedVariant.tracked &&
                  !productGetters.isInStock(product.selectedVariant) &&
                  !productGetters.hasMultipleVariants(product)
                "
                class="products__product-card"
                @click:add-to-cart="open(product)"
              />

              <WishlistDropdown
                class="wishlist"
                :wishlists="wishlists"
                :product="product"
                :visible="isDropdownVisible"
                :icon="'circleIcon'"
              />
            </div>
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
              :description="product.shortDescription"
              :image="productGetters.getCoverImage(product)"
              imageHeight="260"
              imageWidth="260"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special-price="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :qty="1"
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
              @quantity-change="productsQuantity[product._id] = $event"
              @click:wishlist="
                !isInWishlist({ product })
                  ? addItemToWishlist({ product })
                  : removeProductFromWishlist(product)
              "
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
              <template #actions>
                <WishlistDropdown
                  class="
                    desktop-only
                    products__product-card-horizontal--wishlist-button
                  "
                  :wishlists="wishlists"
                  :product="product"
                  :visible="true"
                />
              </template>
              <template #wishlist-icon>
                <WishlistDropdown
                  class="products__product-card-horizontal--wishlist-circle"
                  :wishlists="wishlists"
                  :product="product"
                  :visible="true"
                  icon="circleIcon"
                />
              </template>
              <template #add-to-cart>
                <AddToCart
                  :selectedVariant="product.selectedVariant"
                  :disabled="loading"
                  @quantity-change="productsQuantity[product._id] = $event"
                  @click="open(product)"
                />
              </template>
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!productsLoading"
              class="products__pagination desktop-only"
              v-show="pagination.lastPage > 1"
              :current="pagination.page"
              :total="pagination.lastPage"
              :visible="5"
            />
          </LazyHydrate>

          <div v-show="pagination.lastPage > 1" class="products__show-on-page">
            <span class="products__show-on-page__label">{{
              $t('Show on page')
            }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="
                  pagination && pagination.itemsPerPage
                    ? pagination.itemsPerPage.toString()
                    : ''
                "
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in [10, 20, 50]"
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
} from '@storefront-ui/vue';
import AddToCart from '~/components/AddToCart.vue';
import { computed, ref, watch, onMounted } from '@nuxtjs/composition-api';
import {
  useCart,
  useWishlists,
  productGetters,
  categoryGetters,
  wishlistGetters,
  useProducts,
  useAttributes,
  useCategory,
} from '@vue-storefront/sylius';
import { useUiHelpers, useUiState, useUiNotification } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';
import CategoryPageHeader from '~/components/CategoryPageHeader';
import WishlistDropdown from '~/components/Wishlist/WishlistDropdown.vue';
import useVariantSelector from '~/composables/useVariantSelector';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  setup(props, context) {
    const t = (key) => context.root.$i18n.t(key);
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart, error: useCartError } = useCart();
    const {
      categories,
      loading: categoriesLoading,
      error,
    } = useCategory('AppHeader:CategoryList');
    const { load: loadAttributes } = useAttributes();
    const {
      load: loadProducts,
      result: productsResult,
      loading: productsLoading,
    } = useProducts();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
      wishlists,
    } = useWishlists();
    const { send } = useUiNotification();
    const { open } = useVariantSelector();

    const products = computed(() => productsResult.value?.products || []);
    const productsQuantity = ref({});
    const isDropdownVisible = false;
    const activeCategory = computed(() =>
      categories.value?.find(
        (cat) => cat.slug === th.getFacetsFromURL()?.categorySlug
      )
    );
    const categoryTree = computed(() => {
      const parent = categoryGetters.getParent(
        activeCategory.value,
        categories.value
      );
      if (
        categoryGetters.hasChildren(activeCategory.value, categories.value) ||
        parent?.level === 0
      )
        return categoryGetters.getTree(activeCategory.value, categories.value);

      return categoryGetters.getTree(parent, categories.value);
    });
    const breadcrumbs = computed(() =>
      categoryGetters.getBreadcrumbs(activeCategory.value, categories.value)
    );
    const pagination = computed(() => productsResult.value?.pagination || {});

    const initProductsQuantity = async () => {
      await products.value?.forEach((product) => {
        productsQuantity.value[product._id] = 1;
      });
    };

    initProductsQuantity();
    watch(products, initProductsQuantity);

    const handleAddToCart = async (params) => {
      await addItemToCart(params);

      const { addItem: addItemError } = useCartError.value;

      if (addItemError) {
        send({ type: 'danger', message: addItemError.message });

        return;
      }

      send({
        type: 'success',
        message: t('Product has been added to the cart'),
      });
    };

    const removeProductFromWishlist = (productItem) => {
      const productsInWishlist = computed(() =>
        wishlistGetters.getItems(wishlists.value)
      );
      const product = productsInWishlist.value.find(
        (wishlistProduct) => wishlistProduct.variant.sku === productItem.sku
      );
      removeItemFromWishlist({ product });
    };

    const isCategoryActive = (category) => {
      return category?.code === activeCategory.value?.code;
    };

    onMounted(async () => {
      const facets = th.getFacetsFromURL();

      await Promise.all([loadAttributes(facets), loadProducts(facets)]);
      if (error?.value?.search) context.root.$nuxt.error({ statusCode: 404 });
    });

    return {
      ...uiState,
      th,
      productsLoading,
      products,
      categoryTree,
      productGetters,
      pagination,
      categories,
      categoriesLoading,
      activeCategory,
      isCategoryActive,
      breadcrumbs,
      handleAddToCart,
      wishlists,
      addItemToWishlist,
      removeProductFromWishlist,
      isInWishlist,
      isInCart,
      productsQuantity,
      isDropdownVisible,
      open,
      hasChildren: (category) =>
        categoryGetters.hasChildren(category, categories.value),
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
    AddToCart,
    WishlistDropdown,
  },
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

    ::v-deep .sf-image--placeholder {
      width: var(--image-width);
      height: var(--image-height);
    }
  }

  &__product-card-horizontal {
    flex: 0 0 100%;
    --product-card-horizontal-add-to-cart-margin: 0;
    --product-card-horizontal-actions-margin: auto 0 0 0;

    &--wishlist {
      @include for-tablet {
        &-circle {
          display: none;
        }

        &-button {
          padding-bottom: 0 !important;
          display: block !important;
        }
      }
    }

    ::v-deep {
      .sf-product-card-horizontal__details {
        margin-right: var(--spacer-2xl);
      }

      .sf-image {
        --image-width: 100%;
        --image-height: auto;

        &--placeholder {
          width: var(--image-width);
          height: var(--image-height);
        }
      }
    }

    @include for-mobile {
      --product-card-horizontal-review-margin: 0;
      --product-card-horizontal-actions-wrapper-margin: var(--spacer-xs) 0 0 0;

      .products__product-card-horizontal--button {
        --button-width: 100%;
      }

      ::v-deep {
        .sf-image {
          --image-width: 8rem;
          --image-height: 100%;

          &--placeholder {
            width: 8rem;
          }
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

            .sf-property {
              flex-wrap: wrap;

              span {
                white-space: nowrap;
              }

              &__value {
                font-weight: lighter;
              }
            }
          }

          &__details {
            flex: 1 1 auto;
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
    transform: scale(0.5);
  }

  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
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

  .product-card {
    position: relative;

    .wishlist {
      display: none;
      position: absolute;
      top: calc(1rem + var(--spacer-sm));
      right: calc(1rem + var(--spacer-sm));
    }

    @include for-mobile {
      .wishlist {
        display: flex;
        z-index: 1;

        &.active {
          z-index: 2;
        }
      }
    }

    @include for-desktop {
      &:hover {
        --product-card-add-button-opacity: 1;
        --product-card-z-index: 1;
        --product-card-box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);

        .wishlist {
          display: flex;
          z-index: 10;
        }
      }
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
