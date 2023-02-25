import React from 'react';
import useRouter from 'hooks/useRouter';
import omit from 'lodash/omit';

import { useCategories } from 'lib/apollo/hooks/state/categories';
import { DeepCategoriesQuery } from 'graphql/queries/__generated__/deepCategories.generated';

import Icon from 'components/shared/atoms/Icon';

import { BreadcrumbsWrapper, StyledLink } from './styled';
import { parseQuery } from './types';

const transformToCategoryList = (
  category: DeepCategoriesQuery['categories'][0] | null | undefined,
): { label: string }[] => {
  if (!category) {
    return [];
  }
  const { parent, name } = category;

  return [
    ...transformToCategoryList(parent),
    {
      label: name,
    },
  ];
};

const CategoryBreadcrumbs = () => {
  const { query } = useRouter();
  const { currentCategory, subcategory, section, subsection } = parseQuery(query);
  const categoryHierarchy = [currentCategory, subcategory, section, subsection];
  const { parentId, id } = categoryHierarchy.reduce(
    (acc: { parentId: string | null; id: string | null }, category: string) => {
      if (category) {
        return { parentId: acc.id, id: category };
      }
      return acc;
    },
    { parentId: null, id: null },
  );

  const { categories } = useCategories({
    parentId,
    ids: [id || ''],
    skip: !id,
    isDeep: true,
  });
  const [category] = categories;

  const breadcrumbs = [
    {
      label: 'Главная',
    },
    ...transformToCategoryList(category),
  ];

  return (
    <BreadcrumbsWrapper>
      {breadcrumbs.map(({ label }, index) => {
        const queryParams = ['currentCategory', 'subcategory', 'section', 'subsection'].slice(
          index,
        );
        const categoryQuery = omit(query, queryParams);
        if (index === 0) {
          return (
            <StyledLink
              key={index}
              href={{
                query: categoryQuery,
              }}
            >
              {label}
            </StyledLink>
          );
        }
        return (
          <React.Fragment key={index}>
            <Icon name="arrow-chevron-right" $color="greyA4" $size={14} />
            <StyledLink
              data-testid={`link-depth-${index}`}
              $isActive={index === breadcrumbs.length - 1}
              href={{
                query: categoryQuery,
              }}
            >
              {label}
            </StyledLink>
          </React.Fragment>
        );
      })}
    </BreadcrumbsWrapper>
  );
};

export default CategoryBreadcrumbs;
