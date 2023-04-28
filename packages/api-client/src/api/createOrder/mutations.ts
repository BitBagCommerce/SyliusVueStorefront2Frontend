import { gql } from 'api-client/__generated__';

export default gql(`
  mutation createOrder(
    $order: shop_completeOrderInput!
  ) {
    shop_completeOrder(
      input: $order
    ) {
      order {
        number
        tokenValue
      }
    }
  }
`);
