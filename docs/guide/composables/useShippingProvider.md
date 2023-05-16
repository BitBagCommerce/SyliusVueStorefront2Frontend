# `useShippingProvider`

## Features

`useShippingProvider` composable is used for saving selected shipping method in checkout.

## API

- `loading: boolean` - a reactive object containing information about loading state of shipping provider.

### `save`

Function for saving shipping data. It accepts an object with the following key:

- `shippingMethod: any`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { useShippingProvider } from '@realtainment/sylius';

export default {
  setup() {
    const { save } = useShippingProvider();

    onSSR(async () => {
      await save({ shippingMethod });
    });
  },
};
```
