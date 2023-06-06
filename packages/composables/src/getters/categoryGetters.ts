import { AgnosticBreadcrumb } from '@vue-storefront/core/lib/src/types';
import { Category } from '@vue-storefront/sylius-api/src/types';

const getTopLevelCategories = (categories: Category[]): Category[] => {
  return categories.filter((cat) => cat.level === 1);
};

const getChildren = (
  category: Category,
  categories: Category[]
): Category[] => {
  return category
    ? categories
        .filter((cat) => cat.parent?.id === category.id)
        .map((cat) => {
          return {
            ...cat,
            children: getChildren(cat, categories),
          };
        })
    : categories
        .filter((cat) => cat.level === 1)
        .map((cat) => {
          return {
            ...cat,
            children: getChildren(cat, categories),
          };
        });
};

const hasChildren = (category: Category, categories: Category[]): boolean => {
  if (category === undefined || categories === undefined) {
    return false;
  }
  return categories.some((cat) => cat.parent?.id === category.id);
};

const getParent = (category: Category, categories: Category[]) => {
  if (!category) return categories.find((cat) => cat.level === 1);

  return categories.find((cat) => cat.id === category.parent.id);
};

const getTree = (current: Category, categories: Category[]) => {
  if (!categories)
    return {
      parent: null,
      children: null,
    };

  if (!current)
    return {
      parent: null,
      children: getChildren(null, categories),
    };

  const children = getChildren(current, categories);

  return {
    parent: current,
    children,
  };
};

const _buildBreadcrumbs = (
  categoryList: Category[],
  allCategories
): AgnosticBreadcrumb[] => {
  const parent = getParent(categoryList[0], allCategories);

  if (!parent || parent.level === 0)
    return categoryList.map((category) => ({
      text: category.name,
      link: `/c/${category.slug}`,
    }));

  return _buildBreadcrumbs([parent, ...categoryList], allCategories);
};

const getBreadcrumbs = (
  current: Category,
  categories: Category[]
): AgnosticBreadcrumb[] => {
  if (current && categories)
    return [
      { text: 'Home', link: '/' },
      ..._buildBreadcrumbs([current], categories),
    ];

  return [];
};

export const categoryGetters = {
  getChildren,
  hasChildren,
  getParent,
  getTopLevelCategories,
  getTree,
  getBreadcrumbs,
};
