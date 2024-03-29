<template>
  <div id="home">
    <LazyHydrate when-visible>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :subtitle="hero.subtitle"
          :class="hero.className"
        >
          <template #withImgTag>
            <SfImage
              :src="hero.image"
              :alt="hero.title"
              :placeholder="loader"
              :height="1240"
              :width="586"
              class="hero__image"
            />
          </template>
        </SfHeroItem>
      </SfHero>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="item in banners" v-slot:[item.slot]>
          <div :class="`banner__wrapper ${item.class}`">
            <SfBanner
              :key="item.slot"
              :title="item.title"
              :subtitle="item.subtitle"
              :description="item.description"
              :button-text="$t('Start shopping')"
              :link="localePath(item.link)"
              :class="item.class"
            >
            </SfBanner>

            <SfImage
              v-if="!item.image.mobile"
              :src="item.image.src"
              :alt="item.title"
              :height="item.image.height"
              :width="item.image.width"
              :placeholder="loader"
              loading="lazy"
              class="banner__image"
            />

            <div v-else>
              <SfImage
                :src="item.image.mobile.src"
                :alt="item.title"
                :height="item.image.mobile.height"
                :width="item.image.mobile.width"
                :placeholder="loader"
                loading="lazy"
                class="banner__image mobile-only"
              />

              <SfImage
                :src="item.image.desktop.src"
                :alt="item.title"
                :height="item.image.desktop.height"
                :width="item.image.desktop.width"
                :placeholder="loader"
                loading="lazy"
                class="banner__image desktop-only"
              />
            </div>
          </div>
        </template>
      </SfBannerGrid>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading :title="$t('Our products')" :level="2" />
        <nuxt-link
          :to="localePath('/c/category/t-shirts')"
          class="smartphone-only"
        >
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>

    <ClientOnly>
      <SfLoader :class="{ loading }" :loading="loading">
        <SfCarousel
          class="carousel"
          :settings="{
            peek: 16,
            gap: 10,
            breakpoints: { 1023: { peek: 30, perView: 2, gap: 0 } },
          }"
          ref="carousel"
        >
          <template #prev="{ go }">
            <SfArrow
              :aria-label="$t('Previous')"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{ go }">
            <SfArrow
              :aria-label="$t('Next')"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <ProductCard
            v-for="(product, i) in products"
            :product="product"
            :index="i"
            :key="i"
          />
        </SfCarousel>
      </SfLoader>
    </ClientOnly>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfLoader,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  useContext,
  onMounted,
  watch,
} from '@nuxtjs/composition-api';

import {
  useCart,
  useCategory,
  useProducts,
  productGetters,
} from '@vue-storefront/sylius';
import InstagramFeed from '~/components/InstagramFeed.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiNotification } from '~/composables';
import loader from '~/static/icons/loader.svg';
import ClientOnly from 'vue-client-only';
import useVariantSelector from '~/composables/useVariantSelector';
import ProductCard from '~/components/Product/ProductCard.vue';
import useDropdown from '~/composables/useDropdown';

export default {
  name: 'Home',
  components: {
    ProductCard,
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
    SfLoader,
    ClientOnly,
  },
  setup(_, { root }) {
    const { $config } = useContext();
    const { categories } = useCategory('AppHeader:CategoryList');
    const { addItem: addItemToCart, error } = useCart();
    const { send } = useUiNotification();
    const { open } = useVariantSelector();
    const { load, result, loading } = useProducts();
    const { toggle } = useDropdown();
    const products = computed(() => result.value?.products || []);

    const carousel = ref(null);

    const heroes = [
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#eceff1',
        image: '/homepage/bannerH.webp',
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#efebe9',
        image: '/homepage/bannerA.webp',
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right',
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#fce4ec',
        image: '/homepage/bannerB.webp',
      },
    ];

    const banners = computed(() => {
      if (categories.value.length === 0) {
        return [];
      }

      return [
        {
          slot: 'banner-A',
          subtitle: categories.value[0].name,
          title: 'Cocktail & Party',
          description: categories.value[0].description,
          image: {
            mobile: {
              src: $config.theme.home.bannerA.image.mobile,
              height: 400,
              width: 1240,
            },
            desktop: {
              src: $config.theme.home.bannerA.image.desktop,
              height: 660,
              width: 330,
            },
          },
          class: 'sf-banner--slim desktop-only',
          link: `/c/${categories.value[0].slug}`,
        },
        {
          slot: 'banner-B',
          subtitle: categories.value[1].name,
          title: 'Linen Dresses',
          description: categories.value[1].description,
          image: {
            src: $config.theme.home.bannerB.image,
            height: 660,
            width: 500,
          },
          class: 'sf-banner--slim banner__central desktop-only',
          link: `/c/${categories.value[1].slug}`,
        },
        {
          slot: 'banner-C',
          subtitle: categories.value[2].name,
          title: 'The Office Life',
          image: {
            src: $config.theme.home.bannerC.image,
            height: 398,
            width: 1234,
          },
          class: 'sf-banner--slim banner__tshirt',
          link: `/c/${categories.value[2].slug}`,
        },
        {
          slot: 'banner-D',
          subtitle: categories.value[3].name,
          title: 'Eco Sandals',
          image: {
            src: $config.theme.home.bannerD.image,
            height: 310,
            width: 330,
          },
          class: 'sf-banner--slim',
          link: `/c/${categories.value[3].slug}`,
        },
      ];
    });

    const handleAddToCart = async (params) => {
      await addItemToCart(params);

      const { addItem: addItemError } = error.value;

      if (addItemError) {
        send({ type: 'danger', message: addItemError.message });

        return;
      }

      send({
        type: 'success',
        message: root.$t('Product has been added to the cart'),
      });
    };

    onMounted(async () => {
      await load({ categorySlug: 'category/t-shirts' });
    });

    // Closes dropdown whenever carousel moves.
    watch(
      () => carousel.value,
      () => {
        carousel.value?.glide.on('move', () => {
          toggle();
        });
      }
    );

    return {
      banners,
      heroes,
      products,
      productGetters,
      loading,
      handleAddToCart,
      loader,
      open,
      carousel,
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  &__image {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    ::v-deep img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
    object-position: left;

    ::v-deep .sf-image {
      object-position: left;
    }
  }

  &__central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -1;

    ::v-deep .sf-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}
.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;

    ::v-deep .sf-carousel__wrapper {
      overflow: clip visible;
    }
  }
  ::v-deep .glide__slide--clone {
    opacity: 0.4;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, -15%, 0);
      width: 100%;
      @include for-mobile {
        --product-card-max-width: 100%;
      }
    }
    &__image {
      width: 100%;
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

.loading {
  margin-top: var(--spacer-lg);
}

::v-deep .sf-image--placeholder {
  height: 100%;
  width: 100%;
  object-fit: contain !important;
  object-view-box: inset(-150%);
}
</style>
