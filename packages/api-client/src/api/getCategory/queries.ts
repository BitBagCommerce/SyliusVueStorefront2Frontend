import { gql } from 'api-client/__generated__';

export const BaseQuery = gql(`
  query categoryList(
    $categorySlug: String,
    $categoryName: String,
  ) {
    taxa(
      translations_slug: $categorySlug
      translations_name: $categoryName
    ){
      collection {
        id
        code
        name
        position
        slug
        description
        parent {
          id
          name
          slug
        }
        enabled
        children {
          collection {
            id
            code
            name
            position
            slug
            description
            parent {
              id
              name
              slug
            }
            enabled
          }
        }
      }
    }
  }
`);
