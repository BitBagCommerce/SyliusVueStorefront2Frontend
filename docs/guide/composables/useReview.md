# `useReview`

## Features

`useReview` composable is used for adding and fetching reviews by search parameters.

## API

- `reviews: Review[]` - an array of fetched reviews.
- `loading: boolean` - a reactive object containing information whether reviews are loading.
- `error: UseReviewErrors` - a map of errors per method

### `search: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for fetching reviews based on passed `params`. It accepts an object with the following key:

- `productId: string`

### `addReview: ({ customQuery?: CustomQuery }) => Promise<void>`

Function for adding a review. It accepts an object with the following keys:

- `title: string`
- `comment: string`
- `reviewSubject: string`
- `rating: number`

## Getters

- `getItems: (review: any) => any[]`
- `getReviewId: (item: any) => string`
- `getReviewAuthor: (item: any) => string`
- `getReviewRating: (item: any) => number`
- `getReviewDate: (item: any) => string`
- `getTotalReviews: (review: any) => number`
- `getAverageRating: (review: any) => number`
- `getRatesCount: (review: any) => AgnosticRateCount[]`
- `getReviewsPage: (review: any) => number`

[AgnosticRateCount](https://docs.vuestorefront.io/v2/reference/api/core.agnosticratecount.html)

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useReview, reviewGetters } from '@realtainment/sylius';
export default {
  setup() {
    const { reviews, search } = useReview();

    onSSR(async () => {
      await search({ productId: 123 });
    });

    return {
      reviews,
      reviewGetters,
    };
  },
};
```
