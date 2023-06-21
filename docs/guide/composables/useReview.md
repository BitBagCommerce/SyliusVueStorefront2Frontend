# `useReview`

## Features

`useReview` composable is used for adding and fetching reviews by search parameters.

## API

- `reviews: Review[]` - an array of fetched reviews.
- `loading: boolean` - a reactive object containing information whether reviews are loading.
- `error` - reactive object containing the error message.

### `search: (params: UseReviewSearchParams { customQuery?: CustomQuery }) => Promise<void>`

Function for fetching reviews based on passed `params`. It accepts an object with the following key:

- `productId: string`

### `addReview: (params: UseReviewAddParams, { customQuery?: CustomQuery }) => Promise<void>`

Function for adding a review. It accepts an object with the following keys:

- `title: string`
- `comment: string`
- `reviewSubject: string`
- `rating: number`

## Getters

- `getItems: (review: Review) => ReviewItem[]`
- `getReviewId: (item: ReviewItem) => string`
- `getReviewAuthor: (item: ReviewItem) => string`
- `getReviewMessage: (item: ReviewItem) => string`
- `getReviewRating: (item: ReviewItem) => number`
- `getReviewDate: (item: ReviewItem) => string`
- `getTotalReviews: (review: Review) => number`
- `getAverageRating: (review: Review) => number`
- `getRatesCount: (review: Review) => AgnosticRateCount[]`
- `getReviewsPage: (review: Review) => number`

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
