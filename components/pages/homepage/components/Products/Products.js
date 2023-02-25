import React from 'react';

import { CATALOG } from 'config/routes';

import { useStartPageCategories } from 'lib/apollo/hooks/state/startPageCategories';

import Icon from 'components/shared/atoms/Icon';
import ActionLink from 'components/shared/atoms/ActionLink';
import ProductsSlider from '../ProductsSlider';

import {
  CategoriesList,
  CategoriesListItem,
  AllCategoriesLink,
  CategoryTitle,
  CategoryWrapper,
  PageContainer,
  ProductsWrapper,
  Wrapper,
  CategoriesFooter,
  CategoriesOffer,
} from './styled';

const Products = () => {
  const { categories } = useStartPageCategories();

  return (
    <PageContainer>
      <Wrapper>
        <CategoryWrapper>
          <CategoryTitle>КАТЕГОРИИ ТОВАРОВ</CategoryTitle>
          <CategoriesList>
            {categories.map(category => (
              <CategoriesListItem key={category.id}>
                <ActionLink
                  label={category.name}
                  $size={14}
                  $color="black"
                  href={{ pathname: CATALOG, query: { currentCategory: category.id } }}
                />
              </CategoriesListItem>
            ))}
          </CategoriesList>
          <CategoriesFooter>
            <AllCategoriesLink>
              <ActionLink href={CATALOG} $size={16} bold>
                Смотреть все товары
                <Icon name="arrow-chevron-right" $color="blue" $size={16} $ml={4} />
              </ActionLink>
            </AllCategoriesLink>
            <CategoriesOffer>
              <Icon name="exclamation" $color="green" $size={16} $mr={8} />
              Все цены действительны, товары в наличии, покупка возможна прямо сейчас.
            </CategoriesOffer>
          </CategoriesFooter>
        </CategoryWrapper>
        <ProductsWrapper>
          <ProductsSlider />
        </ProductsWrapper>
      </Wrapper>
    </PageContainer>
  );
};

export default Products;
