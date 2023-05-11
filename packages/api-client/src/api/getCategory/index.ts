import { CustomQuery, Context } from '@vue-storefront/core';
import { BaseQuery } from './queries';
import gql from 'graphql-tag';
export default async function getCategory(context: Context, params, customQuery?: CustomQuery): Promise<any> {
  const { categoryList } = context.extendQuery(
    customQuery,
    {
      categoryList: {
        query: BaseQuery,
        variables: params
      }
    }
  );

  // Pass query and variables to GraphQL client
  const { data } = await context.client.query({
    query: gql`${categoryList.query}`,
    variables: categoryList.variables
  });

  return data.taxa.collection;
}
