import { CustomQuery, Context } from '@vue-storefront/core';
import { BaseQuery } from './queries';
import { extendQuery, query } from '../helpers';

export default async function getCategory(context: Context, params, customQuery?: CustomQuery): Promise<any> {
  const { query: queryGql, variables } = extendQuery(context, BaseQuery, params, customQuery);
  const data = await query(context, queryGql, variables);

  const categories = data.taxa.collection?.map((cat: any) => {
    if (cat.children) cat.children = cat.children.collection;

    return cat;
  });

  return categories;
}
