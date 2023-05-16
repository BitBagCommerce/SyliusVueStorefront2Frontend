export default {
  payment: {
    redirectHost: process.env.SYLIUS_PAYMENT_GATEWAY_HOST,
  },
  home: {
    bannerA: {
      link: '/',
      image: {
        mobile: '/homepage/bannerB.webp',
        desktop: '/homepage/bannerF.webp',
      },
    },
    bannerB: {
      link: '/',
      image: '/homepage/bannerE.webp',
    },
    bannerC: {
      link: '/',
      image: '/homepage/bannerC.webp',
    },
    bannerD: {
      link: '/',
      image: '/homepage/bannerG.webp',
    },
  },
};
