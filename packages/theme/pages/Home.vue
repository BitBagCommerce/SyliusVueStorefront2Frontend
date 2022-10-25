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
              :button-text="item.buttonText"
              :link="localePath(item.link)"
              :class="item.class"
            >
            </SfBanner>

            <SfImage
              v-if="typeof item.image === 'string'"
              :src="item.image"
              :alt="item.title"
              :placeholder="loader"
              loading="lazy"
              class="banner__image"
            />

            <div v-else>
              <SfImage
                :src="item.image.mobile"
                :alt="item.title"
                :placeholder="loader"
                loading="lazy"
                class="banner__image mobile-only"
              />

              <SfImage
                :src="item.image.desktop"
                :alt="item.title"
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
        <SfHeading title="Our products" :level="2"/>
        <nuxt-link :to="localePath('/c/category/t-shirts')" class="smartphone-only">
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfLoader class="loading" :loading="loading">
        <SfCarousel class="carousel" :settings="{ peek: 16, gap: 10, breakpoints: { 1023: { peek: 30, perView: 2, gap: 0 } } }">
          <template #prev="{go}">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
            <SfProductCard
              :title="product.name"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :max-rating="5"
              :score-rating="product.averageRating"
              :show-add-to-cart-button="true"
              wishlistIcon=""
              isInWishlistIcon=""
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="carousel__item__product"
              @click:add-to-cart="handleAddToCart({ product, quantity: 1 })"
            >
              <template #image>
                <img
                  class="carousel__item__image"
                  :src="productGetters.getCoverImage(product)"
                  :alt="product.name"
                  loading="lazy"
                >
              </template>
            </SfProductCard>
          </SfCarouselItem>
        </SfCarousel>
      </SfLoader>
    </LazyHydrate>

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
  SfLoader
} from '@storefront-ui/vue';
import { computed, useContext } from '@nuxtjs/composition-api';
import {useCart, useCategory} from '@vue-storefront/sylius';
import { onSSR } from '@vue-storefront/core';
import InstagramFeed from '~/components/InstagramFeed.vue';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import { useFacet, facetGetters, productGetters } from '@vue-storefront/sylius';
import { useUiNotification } from '~/composables';
import loader from '~/static/icons/loader.svg';

export default {
  name: 'Home',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
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
    SfLoader
  },
  setup() {
    const { $config } = useContext();
    const { categories } = useCategory('AppHeader:CategoryList');
    const { result, search, loading } = useFacet('category/t-shirts');
    const { addItem: addItemToCart, error } = useCart();
    const { send } = useUiNotification();
    const products = computed(() => facetGetters.getProducts(result.value));

    const heroes = [
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#eceff1',
        image: '/homepage/bannerH.webp'
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#efebe9',
        image: '/homepage/bannerA.webp',
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#fce4ec',
        image: '/homepage/bannerB.webp'
      }
    ];

    const banners = [
      {
        slot: 'banner-A',
        subtitle: categories.value[0].name,
        title: 'Cocktail & Party',
        description: categories.value[0].description,
        buttonText: 'Shop now',
        image: {
          mobile: $config.theme.home.bannerA.image.mobile,
          desktop: $config.theme.home.bannerA.image.desktop
        },
        class: 'sf-banner--slim desktop-only',
        link: `/c/${categories.value[0].slug}`
      },
      {
        slot: 'banner-B',
        subtitle: categories.value[1].name,
        title: 'Linen Dresses',
        description: categories.value[1].description,
        buttonText: 'Shop now',
        image: $config.theme.home.bannerB.image,
        class: 'sf-banner--slim banner__central desktop-only',
        link: `/c/${categories.value[1].slug}`
      },
      {
        slot: 'banner-C',
        subtitle: categories.value[2].name,
        title: 'The Office Life',
        image: $config.theme.home.bannerC.image,
        class: 'sf-banner--slim banner__tshirt',
        link: `/c/${categories.value[2].slug}`
      },
      {
        slot: 'banner-D',
        subtitle: categories.value[3].name,
        title: 'Eco Sandals',
        image: $config.theme.home.bannerD.image,
        class: 'sf-banner--slim',
        link: `/c/${categories.value[3].slug}`
      }
    ];

    const handleAddToCart = async (params) => {
      await addItemToCart(params);

      const cartError = Object.values(error.value).find(err => err !== null);

      if (cartError) {
        send({ type: 'danger', message: cartError.message });

        return;
      }

      send({ type: 'success', message: 'Product has been added to the cart' });
    };

    onSSR(() => search({
      categorySlug: 'category/t-shirts',
      channelsCode: 'FASHION_WEB',
      attributes: {}
    }));

    return {
      banners,
      heroes,
      products,
      productGetters,
      loading,
      handleAddToCart,
      loader
    };
  }
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
    &--right, &--left {
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
  }
  ::v-deep .glide__slide--clone {
    opacity: .4;
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
