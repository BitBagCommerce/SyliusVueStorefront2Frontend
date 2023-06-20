# `useShippingProvider`

## Features

`useShippingProvider` composable is used for saving selected shipping method in checkout.

## API

- `loading: boolean` - a reactive object containing information about loading state of shipping provider.
- `error` - reactive object containing the error message.

### `save: ({ shippingMethod: any, customQuery?: CustomQuery }): Promise<void>`

Function for saving shipping data.

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
