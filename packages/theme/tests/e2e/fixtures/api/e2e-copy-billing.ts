const apiData = {
  getCategory: [
    [
      {
        id: '1',
        code: 'MENU_CATEGORY',
        name: 'Category',
        position: 0,
        slug: 'category',
        description:
          'Consequatur provident odit consequuntur dolores recusandae ab. Voluptas earum nobis sed sit itaque non. Aut nulla qui vel fuga cupiditate ea error aliquam.',
        parent: null,
        enabled: true,
        level: 0,
        __typename: 'Taxon',
      },
      {
        id: '2',
        code: 't_shirts',
        name: 'T-shirts',
        position: 0,
        slug: 'category/t-shirts',
        description:
          'Dolorem unde dolorem quasi non eveniet. Odio unde vel rerum consequuntur earum. Atque iste in eaque natus velit est.',
        parent: { id: '1', __typename: 'Taxon' },
        enabled: true,
        level: 1,
        __typename: 'Taxon',
      },
      {
        id: '3',
        code: 'mens_t_shirts',
        name: 'Men',
        position: 0,
        slug: 't-shirts/men',
        description:
          'Et rem maxime architecto saepe. Dolor nisi qui qui porro voluptate quia nemo.',
        parent: { id: '2', __typename: 'Taxon' },
        enabled: true,
        level: 2,
        __typename: 'Taxon',
      },
      {
        id: '4',
        code: 'womens_t_shirts',
        name: 'Women',
        position: 1,
        slug: 't-shirts/women',
        description:
          'Labore recusandae quod inventore quis magni porro aut praesentium. Consequatur eligendi quod omnis excepturi ut optio. Quisquam expedita aut incidunt itaque. Nulla vero eius sit consequatur totam quos.',
        parent: { id: '2', __typename: 'Taxon' },
        enabled: true,
        level: 2,
        __typename: 'Taxon',
      },
      {
        id: '5',
        code: 'caps',
        name: 'Caps',
        position: 1,
        slug: 'category/caps',
        description:
          'Fugiat non commodi eligendi. Eligendi non eum ea quia aut necessitatibus nobis. Delectus ratione est tempora tenetur aut tenetur consequatur.',
        parent: { id: '1', __typename: 'Taxon' },
        enabled: true,
        level: 1,
        __typename: 'Taxon',
      },
      {
        id: '6',
        code: 'simple_caps',
        name: 'Simple',
        position: 0,
        slug: 'caps/simple',
        description:
          'Fuga nisi eum voluptatem vel debitis et quia. A quia quia laborum reiciendis voluptatem facere aut.',
        parent: { id: '5', __typename: 'Taxon' },
        enabled: true,
        level: 2,
        __typename: 'Taxon',
      },
      {
        id: '7',
        code: 'caps_with_pompons',
        name: 'With pompons',
        position: 1,
        slug: 'caps/with-pompons',
        description:
          'Porro et repudiandae molestiae enim ipsam accusantium. Molestiae animi iste magni consectetur at iste rem. Corrupti molestias aut consequatur aut dolor. Sed nam est delectus eum.',
        parent: { id: '5', __typename: 'Taxon' },
        enabled: true,
        level: 2,
        __typename: 'Taxon',
      },
      {
        id: '8',
        code: 'dresses',
        name: 'Dresses',
        position: 2,
        slug: 'category/dresses',
        description:
          'Eius illo magni culpa. Ut numquam maxime quod accusamus minima. Nihil reiciendis et voluptate modi sequi. Accusantium quo id quis a et commodi corrupti sint.',
        parent: { id: '1', __typename: 'Taxon' },
        enabled: true,
        level: 1,
        __typename: 'Taxon',
      },
      {
        id: '9',
        code: 'jeans',
        name: 'Jeans',
        position: 3,
        slug: 'category/jeans',
        description:
          'Laboriosam blanditiis est veritatis. Consequatur beatae nihil consequatur.',
        parent: { id: '1', __typename: 'Taxon' },
        enabled: true,
        level: 1,
        __typename: 'Taxon',
      },
      {
        id: '10',
        code: 'mens_jeans',
        name: 'Men',
        position: 0,
        slug: 'jeans/men',
        description:
          'Quaerat dolorem animi excepturi temporibus. Ullam quo fuga officia cupiditate maxime quod aut dolore. Beatae nam sed distinctio explicabo quis. Saepe aperiam quis omnis quia est eaque.',
        parent: { id: '9', __typename: 'Taxon' },
        enabled: true,
        level: 2,
        __typename: 'Taxon',
      },
      {
        id: '11',
        code: 'womens_jeans',
        name: 'Women',
        position: 1,
        slug: 'jeans/women',
        description:
          'Recusandae deserunt voluptas delectus deserunt est et ut. Ea ea et sint et debitis ut. Est impedit sint vero ad quo. Perferendis id qui ex porro velit eum.',
        parent: { id: '9', __typename: 'Taxon' },
        enabled: true,
        level: 2,
        __typename: 'Taxon',
      },
    ],
  ],
  createCart: [{ cartToken: '/api/v2/shop/orders/AbG_HvT7~c' }],
  getCart: [
    {
      tokenValue: 'AbG_HvT7~c',
      localeCode: 'en_US',
      total: 0,
      taxTotal: 0,
      shippingTotal: 0,
      orderPromotionTotal: 0,
      promotionCoupon: null,
      shippingAddress: null,
      billingAddress: null,
      shipments: [],
      payments: [],
      items: [],
      __typename: 'Order',
    },
    {
      tokenValue: 'AbG_HvT7~c',
      localeCode: 'en_US',
      total: 7960,
      taxTotal: 0,
      shippingTotal: 396,
      orderPromotionTotal: 0,
      promotionCoupon: null,
      shippingAddress: null,
      billingAddress: null,
      shipments: {
        id: '/api/v2/shop/shipments/418',
        _id: 418,
        method: { code: 'ups', __typename: 'ShippingMethod' },
        __typename: 'Shipment',
      },
      payments: {
        id: '/api/v2/shop/payments/418',
        _id: 418,
        method: { code: 'cash_on_delivery', __typename: 'PaymentMethod' },
        __typename: 'Payment',
      },
      items: [
        {
          _id: 906,
          variant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            onHand: 9,
            onHold: 0,
            tracked: false,
            optionValues: [
              {
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                code: 't_shirt_size_s',
                value: 'S',
                __typename: 'ProductOptionValue',
              },
            ],
            product: {
              options: [
                {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  name: 'T-shirt size',
                  code: 't_shirt_size',
                  __typename: 'ProductOption',
                },
              ],
              images: [
                'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
              ],
            },
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            __typename: 'ProductVariant',
          },
          unitPrice: 7564,
          total: 7564,
          productName: 'Everyday white basic T-Shirt',
          variantName: 'S',
          quantity: 1,
          __typename: 'OrderItem',
        },
      ],
      __typename: 'Order',
    },
    {
      tokenValue: 'AbG_HvT7~c',
      localeCode: 'en_US',
      total: 7960,
      taxTotal: 495,
      shippingTotal: 396,
      orderPromotionTotal: 0,
      promotionCoupon: null,
      shippingAddress: null,
      billingAddress: {
        id: '/api/v2/shop/addresses/353',
        firstName: 'John',
        lastName: 'Doe',
        street: '1 VueStorefront Rd.',
        city: 'Los Angeles',
        postcode: '45678',
        provinceName: 'California',
        countryCode: 'US',
        phoneNumber: '123456789',
        __typename: 'Address',
      },
      shipments: {
        id: '/api/v2/shop/shipments/418',
        _id: 418,
        method: { code: 'ups', __typename: 'ShippingMethod' },
        __typename: 'Shipment',
      },
      payments: {
        id: '/api/v2/shop/payments/418',
        _id: 418,
        method: { code: 'cash_on_delivery', __typename: 'PaymentMethod' },
        __typename: 'Payment',
      },
      items: [
        {
          _id: 906,
          variant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            onHand: 9,
            onHold: 0,
            tracked: false,
            optionValues: [
              {
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                code: 't_shirt_size_s',
                value: 'S',
                __typename: 'ProductOptionValue',
              },
            ],
            product: {
              options: [
                {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  name: 'T-shirt size',
                  code: 't_shirt_size',
                  __typename: 'ProductOption',
                },
              ],
              images: [
                'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
              ],
            },
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            __typename: 'ProductVariant',
          },
          unitPrice: 7564,
          total: 7564,
          productName: 'Everyday white basic T-Shirt',
          variantName: 'S',
          quantity: 1,
          __typename: 'OrderItem',
        },
      ],
      __typename: 'Order',
    },
    {
      tokenValue: 'AbG_HvT7~c',
      localeCode: 'en_US',
      total: 7960,
      taxTotal: 495,
      shippingTotal: 396,
      orderPromotionTotal: 0,
      promotionCoupon: null,
      shippingAddress: null,
      billingAddress: {
        id: '/api/v2/shop/addresses/353',
        firstName: 'John',
        lastName: 'Doe',
        street: '1 VueStorefront Rd.',
        city: 'Los Angeles',
        postcode: '45678',
        provinceName: 'California',
        countryCode: 'US',
        phoneNumber: '123456789',
        __typename: 'Address',
      },
      shipments: {
        id: '/api/v2/shop/shipments/418',
        _id: 418,
        method: { code: 'ups', __typename: 'ShippingMethod' },
        __typename: 'Shipment',
      },
      payments: {
        id: '/api/v2/shop/payments/418',
        _id: 418,
        method: { code: 'cash_on_delivery', __typename: 'PaymentMethod' },
        __typename: 'Payment',
      },
      items: [
        {
          _id: 906,
          variant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            onHand: 9,
            onHold: 0,
            tracked: false,
            optionValues: [
              {
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                code: 't_shirt_size_s',
                value: 'S',
                __typename: 'ProductOptionValue',
              },
            ],
            product: {
              options: [
                {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  name: 'T-shirt size',
                  code: 't_shirt_size',
                  __typename: 'ProductOption',
                },
              ],
              images: [
                'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
              ],
            },
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            __typename: 'ProductVariant',
          },
          unitPrice: 7564,
          total: 7564,
          productName: 'Everyday white basic T-Shirt',
          variantName: 'S',
          quantity: 1,
          __typename: 'OrderItem',
        },
      ],
      __typename: 'Order',
    },
  ],
  getMinimalProduct: [
    {
      products: [
        {
          id: '/api/v2/shop/products/Everyday_white_basic_T_Shirt',
          _id: 1,
          sku: 'Everyday_white_basic_T_Shirt',
          name: 'Everyday white basic T-Shirt',
          slug: 'everyday-white-basic-t-shirt',
          averageRating: 0,
          shortDescription:
            'Molestiae accusamus optio doloribus magni iure facere perspiciatis. Nemo numquam eos eveniet dolore porro aut. Rerum nihil explicabo voluptas alias necessitatibus et occaecati.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
              code: 'Everyday_white_basic_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 9,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7564,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-1',
              code: 'Everyday_white_basic_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6227,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-2',
              code: 'Everyday_white_basic_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 4,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3638,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-3',
              code: 'Everyday_white_basic_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 1591,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-4',
              code: 'Everyday_white_basic_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 1114,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 9,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Loose_white_designer_T_Shirt',
          _id: 2,
          sku: 'Loose_white_designer_T_Shirt',
          name: 'Loose white designer T-Shirt',
          slug: 'loose-white-designer-t-shirt',
          averageRating: 0,
          shortDescription:
            'Voluptatibus debitis perspiciatis sed laborum odit voluptatibus illo. Quis corporis unde ipsam earum ex. Eaque fugiat eos quaerat animi ducimus ullam possimus.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-0',
              code: 'Loose_white_designer_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8013,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-1',
              code: 'Loose_white_designer_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9884,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-2',
              code: 'Loose_white_designer_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 2888,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-3',
              code: 'Loose_white_designer_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9078,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-4',
              code: 'Loose_white_designer_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9099,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Modern Wear',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/bf/b7/a58730f775089f491901791faabf.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-0',
            code: 'Loose_white_designer_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 0,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 8013,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/bf/b7/a58730f775089f491901791faabf.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/bf/b7/a58730f775089f491901791faabf.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Oversize_white_cotton_T_Shirt',
          _id: 6,
          sku: 'Oversize_white_cotton_T_Shirt',
          name: 'Oversize white cotton T-Shirt',
          slug: 'oversize-white-cotton-t-shirt',
          averageRating: 2,
          shortDescription:
            'Fugit aut est nisi debitis quis nisi facilis. Ullam distinctio non unde enim. Et nam suscipit corrupti omnis quia occaecati. Est sint delectus eos aliquam in accusamus.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-0',
              code: 'Oversize_white_cotton_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5891,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-1',
              code: 'Oversize_white_cotton_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5556,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-2',
              code: 'Oversize_white_cotton_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7832,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-3',
              code: 'Oversize_white_cotton_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 3,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5634,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-4',
              code: 'Oversize_white_cotton_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3685,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Modern Wear',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-0',
            code: 'Oversize_white_cotton_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 0,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 5891,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Raglan_grey_%26_black_Tee',
          _id: 5,
          sku: 'Raglan_grey_&_black_Tee',
          name: 'Raglan grey & black Tee',
          slug: 'raglan-grey-black-tee',
          averageRating: 2,
          shortDescription:
            'Molestiae sunt accusantium ad omnis voluptatem velit rem architecto. Ut et commodi quibusdam mollitia excepturi quod. Vitae soluta ut ipsum dolor dolor dolore neque fuga. Et sapiente tenetur in sequi quidem.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-0',
              code: 'Raglan_grey_&_black_Tee-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7277,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-1',
              code: 'Raglan_grey_&_black_Tee-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6405,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-2',
              code: 'Raglan_grey_&_black_Tee-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8006,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-3',
              code: 'Raglan_grey_&_black_Tee-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 4,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 611,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-4',
              code: 'Raglan_grey_&_black_Tee-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 9,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8038,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Winter 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-0',
            code: 'Raglan_grey_&_black_Tee-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 1,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7277,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Ribbed_copper_slim_fit_Tee',
          _id: 3,
          sku: 'Ribbed_copper_slim_fit_Tee',
          name: 'Ribbed copper slim fit Tee',
          slug: 'ribbed-copper-slim-fit-tee',
          averageRating: 0,
          shortDescription:
            'Dolore alias dolorem quaerat consequuntur autem. Reprehenderit dolorum ut et qui repudiandae quod. Quia voluptatum distinctio perferendis dolor autem dolorem quis.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0',
              code: 'Ribbed_copper_slim_fit_Tee-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5203,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-1',
              code: 'Ribbed_copper_slim_fit_Tee-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 4063,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-2',
              code: 'Ribbed_copper_slim_fit_Tee-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 4956,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-3',
              code: 'Ribbed_copper_slim_fit_Tee-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8043,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-4',
              code: 'Ribbed_copper_slim_fit_Tee-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9277,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Celsius Small',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% viscose',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0',
            code: 'Ribbed_copper_slim_fit_Tee-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 5,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 5203,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Sport_basic_white_T_Shirt',
          _id: 4,
          sku: 'Sport_basic_white_T_Shirt',
          name: 'Sport basic white T-Shirt',
          slug: 'sport-basic-white-t-shirt',
          averageRating: 5,
          shortDescription:
            'Ad quis nisi dolore ea impedit atque beatae delectus. Odio sit vero fugiat at deleniti.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-0',
              code: 'Sport_basic_white_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6747,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-1',
              code: 'Sport_basic_white_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 6,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9252,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-2',
              code: 'Sport_basic_white_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3286,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-3',
              code: 'Sport_basic_white_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6364,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-4',
              code: 'Sport_basic_white_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5223,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Winter 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% viscose',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-0',
            code: 'Sport_basic_white_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 5,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 6747,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
          ],
        },
      ],
      pagination: {
        itemsPerPage: 30,
        lastPage: 1,
        totalCount: 6,
        __typename: 'ProductPaginationInfo',
      },
    },
    {
      products: [
        {
          id: '/api/v2/shop/products/Everyday_white_basic_T_Shirt',
          _id: 1,
          sku: 'Everyday_white_basic_T_Shirt',
          name: 'Everyday white basic T-Shirt',
          slug: 'everyday-white-basic-t-shirt',
          averageRating: 0,
          shortDescription:
            'Molestiae accusamus optio doloribus magni iure facere perspiciatis. Nemo numquam eos eveniet dolore porro aut. Rerum nihil explicabo voluptas alias necessitatibus et occaecati.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
              code: 'Everyday_white_basic_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 9,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7564,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-1',
              code: 'Everyday_white_basic_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6227,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-2',
              code: 'Everyday_white_basic_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 4,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3638,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-3',
              code: 'Everyday_white_basic_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 1591,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-4',
              code: 'Everyday_white_basic_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 1114,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 9,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Loose_white_designer_T_Shirt',
          _id: 2,
          sku: 'Loose_white_designer_T_Shirt',
          name: 'Loose white designer T-Shirt',
          slug: 'loose-white-designer-t-shirt',
          averageRating: 0,
          shortDescription:
            'Voluptatibus debitis perspiciatis sed laborum odit voluptatibus illo. Quis corporis unde ipsam earum ex. Eaque fugiat eos quaerat animi ducimus ullam possimus.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-0',
              code: 'Loose_white_designer_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8013,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-1',
              code: 'Loose_white_designer_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9884,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-2',
              code: 'Loose_white_designer_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 2888,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-3',
              code: 'Loose_white_designer_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9078,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-4',
              code: 'Loose_white_designer_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9099,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Modern Wear',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/bf/b7/a58730f775089f491901791faabf.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-0',
            code: 'Loose_white_designer_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 0,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 8013,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/bf/b7/a58730f775089f491901791faabf.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/bf/b7/a58730f775089f491901791faabf.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Oversize_white_cotton_T_Shirt',
          _id: 6,
          sku: 'Oversize_white_cotton_T_Shirt',
          name: 'Oversize white cotton T-Shirt',
          slug: 'oversize-white-cotton-t-shirt',
          averageRating: 2,
          shortDescription:
            'Fugit aut est nisi debitis quis nisi facilis. Ullam distinctio non unde enim. Et nam suscipit corrupti omnis quia occaecati. Est sint delectus eos aliquam in accusamus.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-0',
              code: 'Oversize_white_cotton_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5891,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-1',
              code: 'Oversize_white_cotton_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5556,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-2',
              code: 'Oversize_white_cotton_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7832,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-3',
              code: 'Oversize_white_cotton_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 3,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5634,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-4',
              code: 'Oversize_white_cotton_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3685,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Modern Wear',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-0',
            code: 'Oversize_white_cotton_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 0,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 5891,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Raglan_grey_%26_black_Tee',
          _id: 5,
          sku: 'Raglan_grey_&_black_Tee',
          name: 'Raglan grey & black Tee',
          slug: 'raglan-grey-black-tee',
          averageRating: 2,
          shortDescription:
            'Molestiae sunt accusantium ad omnis voluptatem velit rem architecto. Ut et commodi quibusdam mollitia excepturi quod. Vitae soluta ut ipsum dolor dolor dolore neque fuga. Et sapiente tenetur in sequi quidem.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-0',
              code: 'Raglan_grey_&_black_Tee-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7277,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-1',
              code: 'Raglan_grey_&_black_Tee-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6405,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-2',
              code: 'Raglan_grey_&_black_Tee-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8006,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-3',
              code: 'Raglan_grey_&_black_Tee-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 4,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 611,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-4',
              code: 'Raglan_grey_&_black_Tee-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 9,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8038,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Winter 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-0',
            code: 'Raglan_grey_&_black_Tee-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 1,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7277,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Ribbed_copper_slim_fit_Tee',
          _id: 3,
          sku: 'Ribbed_copper_slim_fit_Tee',
          name: 'Ribbed copper slim fit Tee',
          slug: 'ribbed-copper-slim-fit-tee',
          averageRating: 0,
          shortDescription:
            'Dolore alias dolorem quaerat consequuntur autem. Reprehenderit dolorum ut et qui repudiandae quod. Quia voluptatum distinctio perferendis dolor autem dolorem quis.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0',
              code: 'Ribbed_copper_slim_fit_Tee-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5203,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-1',
              code: 'Ribbed_copper_slim_fit_Tee-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 4063,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-2',
              code: 'Ribbed_copper_slim_fit_Tee-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 4956,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-3',
              code: 'Ribbed_copper_slim_fit_Tee-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8043,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-4',
              code: 'Ribbed_copper_slim_fit_Tee-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9277,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Celsius Small',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% viscose',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0',
            code: 'Ribbed_copper_slim_fit_Tee-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 5,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 5203,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Sport_basic_white_T_Shirt',
          _id: 4,
          sku: 'Sport_basic_white_T_Shirt',
          name: 'Sport basic white T-Shirt',
          slug: 'sport-basic-white-t-shirt',
          averageRating: 5,
          shortDescription:
            'Ad quis nisi dolore ea impedit atque beatae delectus. Odio sit vero fugiat at deleniti.',
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-0',
              code: 'Sport_basic_white_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6747,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-1',
              code: 'Sport_basic_white_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 6,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9252,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-2',
              code: 'Sport_basic_white_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3286,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-3',
              code: 'Sport_basic_white_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6364,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-4',
              code: 'Sport_basic_white_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5223,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Winter 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% viscose',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-0',
            code: 'Sport_basic_white_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 5,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 6747,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
          ],
        },
      ],
      pagination: {
        itemsPerPage: 10,
        lastPage: 1,
        totalCount: 6,
        __typename: 'ProductPaginationInfo',
      },
    },
  ],
  getFirstProductId: [
    [
      {
        id: '/api/v2/shop/products/000F_office_grey_jeans',
        __typename: 'Product',
      },
    ],
    [
      {
        id: '/api/v2/shop/products/000F_office_grey_jeans',
        __typename: 'Product',
      },
    ],
    [
      {
        id: '/api/v2/shop/products/000F_office_grey_jeans',
        __typename: 'Product',
      },
    ],
  ],
  getProductAttribute: [
    [
      {
        id: 't_shirt_brand',
        label: 'T-shirt brand',
        type: 'text',
        options: [
          {
            id: '/api/v2/product-attribute-values/1',
            code: 't_shirt_brand',
            name: 'T-shirt brand',
            stringValue: 'You are breathtaking',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
          {
            id: '/api/v2/product-attribute-values/26',
            code: 't_shirt_brand',
            name: 'T-shirt brand',
            stringValue: 'Modern Wear',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
          {
            id: '/api/v2/product-attribute-values/50',
            code: 't_shirt_brand',
            name: 'T-shirt brand',
            stringValue: 'Celsius Small',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
        ],
      },
      {
        id: 't_shirt_collection',
        label: 'T-shirt collection',
        type: 'text',
        options: [
          {
            id: '/api/v2/product-attribute-values/9',
            code: 't_shirt_collection',
            name: 'T-shirt collection',
            stringValue: 'Sylius Summer 2019',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
          {
            id: '/api/v2/product-attribute-values/106',
            code: 't_shirt_collection',
            name: 'T-shirt collection',
            stringValue: 'Sylius Winter 2019',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
        ],
      },
      {
        id: 't_shirt_material',
        label: 'T-shirt material',
        type: 'text',
        options: [
          {
            id: '/api/v2/product-attribute-values/17',
            code: 't_shirt_material',
            name: 'T-shirt material',
            stringValue: '100% cotton',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
          {
            id: '/api/v2/product-attribute-values/66',
            code: 't_shirt_material',
            name: 'T-shirt material',
            stringValue: '100% viscose',
            type: 'text',
            __typename: 'ProductAttributeValue',
          },
        ],
      },
    ],
  ],
  getProductNotFiltered: [
    {
      products: [
        {
          id: '/api/v2/shop/products/Everyday_white_basic_T_Shirt',
          _id: 1,
          sku: 'Everyday_white_basic_T_Shirt',
          name: 'Everyday white basic T-Shirt',
          slug: 'everyday-white-basic-t-shirt',
          averageRating: 0,
          shortDescription:
            'Molestiae accusamus optio doloribus magni iure facere perspiciatis. Nemo numquam eos eveniet dolore porro aut. Rerum nihil explicabo voluptas alias necessitatibus et occaecati.',
          description:
            'Rerum magni et ut reiciendis. Ea error nostrum impedit vel et distinctio. Itaque explicabo et id provident iste quo labore. Libero mollitia est tenetur itaque aut ullam assumenda.\n\nPraesentium tempora dolorem soluta fuga magnam aut itaque. Sequi consequatur qui enim quod. Ut atque consectetur perferendis voluptas. Consequatur laudantium eius sint tempore est sint ratione. Provident sint quis maiores saepe omnis.\n\nSimilique cum dolore velit deleniti est. Quo ut architecto assumenda itaque pariatur. Odit et dicta quod dolore quia ipsa officiis. Veniam explicabo enim eveniet doloremque harum et.',
          metaKeywords: null,
          metaDescription: null,
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
              code: 'Everyday_white_basic_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 9,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7564,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-1',
              code: 'Everyday_white_basic_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6227,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-2',
              code: 'Everyday_white_basic_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 4,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3638,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-3',
              code: 'Everyday_white_basic_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 1591,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-4',
              code: 'Everyday_white_basic_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 1114,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 9,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Loose_white_designer_T_Shirt',
          _id: 2,
          sku: 'Loose_white_designer_T_Shirt',
          name: 'Loose white designer T-Shirt',
          slug: 'loose-white-designer-t-shirt',
          averageRating: 0,
          shortDescription:
            'Voluptatibus debitis perspiciatis sed laborum odit voluptatibus illo. Quis corporis unde ipsam earum ex. Eaque fugiat eos quaerat animi ducimus ullam possimus.',
          description:
            'Ipsam autem nemo aliquam velit rerum neque eveniet nihil. Omnis totam autem est dolores dicta ut. Quos qui placeat aliquam temporibus totam. Enim omnis temporibus velit. Et aut placeat qui sed corrupti blanditiis nemo.\n\nRepellendus eos et quam. Accusantium vel aut voluptate sit. Odio ab dolor nulla laborum voluptatem explicabo aut qui. Itaque ullam eaque et eaque corrupti nulla.\n\nIllum officiis commodi temporibus ratione esse. Labore et vel suscipit qui tempora eius asperiores minima. Quo omnis vel sapiente. Sequi architecto doloremque debitis et esse recusandae.',
          metaKeywords: null,
          metaDescription: null,
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-0',
              code: 'Loose_white_designer_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8013,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-1',
              code: 'Loose_white_designer_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9884,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-2',
              code: 'Loose_white_designer_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 2888,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-3',
              code: 'Loose_white_designer_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9078,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-4',
              code: 'Loose_white_designer_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9099,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Modern Wear',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/bf/b7/a58730f775089f491901791faabf.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Loose_white_designer_T_Shirt-variant-0',
            code: 'Loose_white_designer_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 0,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 8013,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/bf/b7/a58730f775089f491901791faabf.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/bf/b7/a58730f775089f491901791faabf.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Oversize_white_cotton_T_Shirt',
          _id: 6,
          sku: 'Oversize_white_cotton_T_Shirt',
          name: 'Oversize white cotton T-Shirt',
          slug: 'oversize-white-cotton-t-shirt',
          averageRating: 2,
          shortDescription:
            'Fugit aut est nisi debitis quis nisi facilis. Ullam distinctio non unde enim. Et nam suscipit corrupti omnis quia occaecati. Est sint delectus eos aliquam in accusamus.',
          description:
            'Quae quia occaecati fugit velit amet quia. Eius rerum reiciendis quibusdam similique et sequi incidunt. Incidunt explicabo pariatur delectus consectetur ut consequatur.\n\nDignissimos qui reiciendis commodi voluptatum. In expedita minima debitis omnis et. Qui sint enim odit veritatis eos vero rerum. Quo dolores nobis ut.\n\nNon iure neque et quibusdam occaecati fugit. Aut vel totam voluptate rem. Facilis sed unde quae ab cum.',
          metaKeywords: null,
          metaDescription: null,
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-0',
              code: 'Oversize_white_cotton_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5891,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-1',
              code: 'Oversize_white_cotton_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5556,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-2',
              code: 'Oversize_white_cotton_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7832,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-3',
              code: 'Oversize_white_cotton_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 3,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5634,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-4',
              code: 'Oversize_white_cotton_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3685,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Modern Wear',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Oversize_white_cotton_T_Shirt-variant-0',
            code: 'Oversize_white_cotton_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 0,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 5891,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/80/ab/282daf06bf44f8080fa49ccbec63.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Raglan_grey_%26_black_Tee',
          _id: 5,
          sku: 'Raglan_grey_&_black_Tee',
          name: 'Raglan grey & black Tee',
          slug: 'raglan-grey-black-tee',
          averageRating: 2,
          shortDescription:
            'Molestiae sunt accusantium ad omnis voluptatem velit rem architecto. Ut et commodi quibusdam mollitia excepturi quod. Vitae soluta ut ipsum dolor dolor dolore neque fuga. Et sapiente tenetur in sequi quidem.',
          description:
            'Natus quia ex adipisci. Et minima distinctio accusamus vel quam. Voluptatem temporibus qui quaerat optio beatae possimus.\n\nVoluptatem vitae optio nobis eum ratione possimus tempora. Aut porro blanditiis sed qui ipsam. Rerum in a temporibus doloribus. Rerum dolorem amet sunt qui saepe doloribus omnis corporis.\n\nHarum vitae ducimus et dignissimos iusto. Occaecati dolor veritatis voluptas enim pariatur. Vel qui earum assumenda atque amet. Ad ut fuga repudiandae deleniti.',
          metaKeywords: null,
          metaDescription: null,
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-0',
              code: 'Raglan_grey_&_black_Tee-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 7277,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-1',
              code: 'Raglan_grey_&_black_Tee-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6405,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-2',
              code: 'Raglan_grey_&_black_Tee-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 7,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8006,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-3',
              code: 'Raglan_grey_&_black_Tee-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 4,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 611,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-4',
              code: 'Raglan_grey_&_black_Tee-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 9,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8038,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Winter 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% cotton',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Raglan_grey_%26_black_Tee-variant-0',
            code: 'Raglan_grey_&_black_Tee-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 1,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7277,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/6f/c2/2539d707304aa1fd82b1448acf14.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Ribbed_copper_slim_fit_Tee',
          _id: 3,
          sku: 'Ribbed_copper_slim_fit_Tee',
          name: 'Ribbed copper slim fit Tee',
          slug: 'ribbed-copper-slim-fit-tee',
          averageRating: 0,
          shortDescription:
            'Dolore alias dolorem quaerat consequuntur autem. Reprehenderit dolorum ut et qui repudiandae quod. Quia voluptatum distinctio perferendis dolor autem dolorem quis.',
          description:
            'Est sunt nam dolorem. Est sit quod impedit et quo corporis similique. Placeat reiciendis fugiat iusto excepturi illo velit eos. Voluptatem autem rerum consequatur quo qui.\n\nAnimi voluptatem ea dolorum nisi. Quis nulla ut earum in aut aperiam architecto et. Neque tenetur mollitia at rem. Rerum qui adipisci vel fugiat.\n\nSoluta voluptate est qui adipisci amet est blanditiis nisi. Ut iste accusamus in nesciunt ducimus molestias et voluptates.',
          metaKeywords: null,
          metaDescription: null,
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0',
              code: 'Ribbed_copper_slim_fit_Tee-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5203,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-1',
              code: 'Ribbed_copper_slim_fit_Tee-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 4063,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-2',
              code: 'Ribbed_copper_slim_fit_Tee-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 4956,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-3',
              code: 'Ribbed_copper_slim_fit_Tee-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 1,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 8043,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-4',
              code: 'Ribbed_copper_slim_fit_Tee-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9277,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'Celsius Small',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Summer 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% viscose',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Ribbed_copper_slim_fit_Tee-variant-0',
            code: 'Ribbed_copper_slim_fit_Tee-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 5,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 5203,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/13/b0/83b4e5754f88d4c053ec43a5b514.jpg',
          ],
        },
        {
          id: '/api/v2/shop/products/Sport_basic_white_T_Shirt',
          _id: 4,
          sku: 'Sport_basic_white_T_Shirt',
          name: 'Sport basic white T-Shirt',
          slug: 'sport-basic-white-t-shirt',
          averageRating: 5,
          shortDescription:
            'Ad quis nisi dolore ea impedit atque beatae delectus. Odio sit vero fugiat at deleniti.',
          description:
            'Et voluptas aut quasi dolores. Aut quae a odio harum voluptatem. Rerum aut sed sequi ut sit quo iste iure.\n\nIpsum non aliquam perspiciatis quisquam enim. Ea rerum ipsum est magnam impedit.\n\nVoluptas impedit enim et. Qui ut repellat enim. Perferendis qui ut eos. Non excepturi illo non ad ea voluptas odio officia.',
          metaKeywords: null,
          metaDescription: null,
          options: [
            {
              id: '/api/v2/shop/product-options/t_shirt_size',
              _id: 1,
              values: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  __typename: 'ProductOptionValue',
                },
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  __typename: 'ProductOptionValue',
                },
              ],
              name: 'T-shirt size',
              code: 't_shirt_size',
              __typename: 'ProductOption',
            },
          ],
          variants: [
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-0',
              code: 'Sport_basic_white_T_Shirt-variant-0',
              name: 'S',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6747,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                  code: 't_shirt_size_s',
                  value: 'S',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-1',
              code: 'Sport_basic_white_T_Shirt-variant-1',
              name: 'M',
              inStock: true,
              onHold: 0,
              onHand: 6,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 9252,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_m',
                  code: 't_shirt_size_m',
                  value: 'M',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-2',
              code: 'Sport_basic_white_T_Shirt-variant-2',
              name: 'L',
              inStock: true,
              onHold: 0,
              onHand: 0,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 3286,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_l',
                  code: 't_shirt_size_l',
                  value: 'L',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-3',
              code: 'Sport_basic_white_T_Shirt-variant-3',
              name: 'XL',
              inStock: true,
              onHold: 0,
              onHand: 5,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 6364,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xl',
                  code: 't_shirt_size_xl',
                  value: 'XL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-4',
              code: 'Sport_basic_white_T_Shirt-variant-4',
              name: 'XXL',
              inStock: true,
              onHold: 0,
              onHand: 8,
              enabled: true,
              tracked: false,
              channelPricings: [
                {
                  channelCode: 'FASHION_WEB',
                  price: 5223,
                  originalPrice: null,
                  __typename: 'ChannelPricing',
                },
              ],
              optionValues: [
                {
                  id: '/api/v2/shop/product-option-values/t_shirt_size_xxl',
                  code: 't_shirt_size_xxl',
                  value: 'XXL',
                  option: {
                    id: '/api/v2/shop/product-options/t_shirt_size',
                    __typename: 'ProductOption',
                  },
                  __typename: 'ProductOptionValue',
                },
              ],
              __typename: 'ProductVariant',
            },
          ],
          attributes: [
            {
              type: 'text',
              name: 'T-shirt brand',
              stringValue: 'You are breathtaking',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt collection',
              stringValue: 'Sylius Winter 2019',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
            {
              type: 'text',
              name: 'T-shirt material',
              stringValue: '100% viscose',
              localeCode: 'en_US',
              __typename: 'ProductAttributeValue',
            },
          ],
          imagesRef: {
            collection: [
              {
                path: '/media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
                __typename: 'ProductImage',
              },
            ],
            __typename: 'ProductImagePageConnection',
          },
          enabled: true,
          __typename: 'Product',
          selectedVariant: {
            id: '/api/v2/shop/product-variants/Sport_basic_white_T_Shirt-variant-0',
            code: 'Sport_basic_white_T_Shirt-variant-0',
            name: 'S',
            inStock: true,
            onHold: 0,
            onHand: 5,
            enabled: true,
            tracked: false,
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 6747,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            optionValues: [
              {
                id: '/api/v2/shop/product-option-values/t_shirt_size_s',
                code: 't_shirt_size_s',
                value: 'S',
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                __typename: 'ProductOptionValue',
              },
            ],
            __typename: 'ProductVariant',
          },
          images: [
            'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
          ],
          galleryImages: [
            'http://localhost:8000/media/cache/sylius_shop_product_large_thumbnail//media/image/5b/b2/3a7995cb8d82631e9fb4a2b1b38d.jpg',
          ],
        },
      ],
    },
  ],
  addToCart: [
    {
      tokenValue: 'AbG_HvT7~c',
      localeCode: 'en_US',
      total: 7960,
      taxTotal: 0,
      shippingTotal: 396,
      orderPromotionTotal: 0,
      promotionCoupon: null,
      shippingAddress: null,
      billingAddress: null,
      shipments: {
        id: '/api/v2/shop/shipments/418',
        _id: 418,
        method: { code: 'ups', __typename: 'ShippingMethod' },
        __typename: 'Shipment',
      },
      payments: {
        id: '/api/v2/shop/payments/418',
        _id: 418,
        method: { code: 'cash_on_delivery', __typename: 'PaymentMethod' },
        __typename: 'Payment',
      },
      items: [
        {
          _id: 906,
          variant: {
            id: '/api/v2/shop/product-variants/Everyday_white_basic_T_Shirt-variant-0',
            code: 'Everyday_white_basic_T_Shirt-variant-0',
            onHand: 9,
            onHold: 0,
            tracked: false,
            optionValues: [
              {
                option: {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  __typename: 'ProductOption',
                },
                code: 't_shirt_size_s',
                value: 'S',
                __typename: 'ProductOptionValue',
              },
            ],
            product: {
              options: [
                {
                  id: '/api/v2/shop/product-options/t_shirt_size',
                  name: 'T-shirt size',
                  code: 't_shirt_size',
                  __typename: 'ProductOption',
                },
              ],
              images: [
                'http://localhost:8000/media/cache/sylius_shop_product_thumbnail//media/image/87/c0/69da93c92e0df08a57077f067d84.jpg',
              ],
            },
            channelPricings: [
              {
                channelCode: 'FASHION_WEB',
                price: 7564,
                originalPrice: null,
                __typename: 'ChannelPricing',
              },
            ],
            __typename: 'ProductVariant',
          },
          unitPrice: 7564,
          total: 7564,
          productName: 'Everyday white basic T-Shirt',
          variantName: 'S',
          quantity: 1,
          __typename: 'OrderItem',
        },
      ],
      __typename: 'Order',
    },
  ],
  getCountries: [
    [
      {
        key: 'US',
        enabled: true,
        label: 'United States',
        __typename: 'Country',
      },
      { key: 'FR', enabled: true, label: 'France', __typename: 'Country' },
      { key: 'DE', enabled: true, label: 'Germany', __typename: 'Country' },
      { key: 'AU', enabled: true, label: 'Australia', __typename: 'Country' },
      { key: 'CA', enabled: true, label: 'Canada', __typename: 'Country' },
      { key: 'MX', enabled: true, label: 'Mexico', __typename: 'Country' },
      { key: 'NZ', enabled: true, label: 'New Zealand', __typename: 'Country' },
      { key: 'PT', enabled: true, label: 'Portugal', __typename: 'Country' },
      { key: 'ES', enabled: true, label: 'Spain', __typename: 'Country' },
      { key: 'CN', enabled: true, label: 'China', __typename: 'Country' },
      {
        key: 'GB',
        enabled: true,
        label: 'United Kingdom',
        __typename: 'Country',
      },
      { key: 'PL', enabled: true, label: 'Poland', __typename: 'Country' },
    ],
    [
      {
        key: 'US',
        enabled: true,
        label: 'United States',
        __typename: 'Country',
      },
      { key: 'FR', enabled: true, label: 'France', __typename: 'Country' },
      { key: 'DE', enabled: true, label: 'Germany', __typename: 'Country' },
      { key: 'AU', enabled: true, label: 'Australia', __typename: 'Country' },
      { key: 'CA', enabled: true, label: 'Canada', __typename: 'Country' },
      { key: 'MX', enabled: true, label: 'Mexico', __typename: 'Country' },
      { key: 'NZ', enabled: true, label: 'New Zealand', __typename: 'Country' },
      { key: 'PT', enabled: true, label: 'Portugal', __typename: 'Country' },
      { key: 'ES', enabled: true, label: 'Spain', __typename: 'Country' },
      { key: 'CN', enabled: true, label: 'China', __typename: 'Country' },
      {
        key: 'GB',
        enabled: true,
        label: 'United Kingdom',
        __typename: 'Country',
      },
      { key: 'PL', enabled: true, label: 'Poland', __typename: 'Country' },
    ],
  ],
  addAddress: [
    {
      billingAddress: {
        id: '/api/v2/shop/addresses/353',
        firstName: 'John',
        lastName: 'Doe',
        street: '1 VueStorefront Rd.',
        city: 'Los Angeles',
        postcode: '45678',
        provinceName: 'California',
        countryCode: 'US',
        phoneNumber: '123456789',
        __typename: 'Address',
      },
      __typename: 'Order',
    },
  ],
};

export default apiData;
