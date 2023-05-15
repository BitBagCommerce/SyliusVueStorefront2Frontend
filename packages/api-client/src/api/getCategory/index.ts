import { CustomQuery, Context } from '@vue-storefront/core';
import { BaseQuery } from './queries';
import { extendQuery, query, VariablesHelper } from '../helpers';

export default async function getCategory(
  context: Context,
  params?: VariablesHelper<typeof BaseQuery>,
  customQuery?: CustomQuery
) {
  const { query: queryGql, variables } = extendQuery(context, BaseQuery, params, customQuery);
  const data = await query(context, queryGql, variables);

  const categories = data.taxa.collection?.map((cat) => ({
    ...cat,
    children: cat.children?.collection
  }));

  return categories;
}
