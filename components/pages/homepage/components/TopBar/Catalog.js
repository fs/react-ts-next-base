import React, { useState } from 'react';

import { useCategories } from 'lib/apollo/hooks/state/categories';

import { CATALOG } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Loader from 'components/shared/atoms/Loader';
import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';

import {
  CategoriesContent,
  CategoriesWrapper,
  CategoriesList,
  CategoryItem,
  SubCategoryItem,
  SubCategoriesList,
  SubCategoriesWrapper,
  CloseButtonWrapper,
} from './styled';

const Catalog = ({ onClose }) => {
  const [parentId, setParentId] = useState(1);
  const { categories, loading: loadingCategories } = useCategories({});
  const { categories: subCategories, loading: loadingSubcategories } = useCategories({ parentId });

  return (
    <CategoriesWrapper>
      <CategoriesContent>
        <CloseButtonWrapper>
          <Button
            variant="hollow"
            iconType="only"
            icon={<Icon name="close" $color="greyA3" />}
            size="small"
            onClick={onClose}
          />
        </CloseButtonWrapper>
        <CategoriesList>
          {loadingCategories ? (
            <Loader />
          ) : (
            categories.map(({ id, name }) => (
              <CategoryItem onClick={() => setParentId(id)} key={id}>
                {name}
              </CategoryItem>
            ))
          )}
        </CategoriesList>
        <SubCategoriesWrapper>
          <SubCategoriesList>
            {loadingSubcategories ? (
              <Loader />
            ) : subCategories.length > 0 ? (
              subCategories.map(({ id: subId, name: subName }) => (
                <SubCategoryItem key={subId}>
                  <ActionLink
                    label={subName}
                    href={{
                      pathname: CATALOG,
                      query: { currentCategory: parentId, subcategory: subId },
                    }}
                    $color="black"
                    size={14}
                  />
                </SubCategoryItem>
              ))
            ) : (
              <div>У категории нет подкатегорий</div>
            )}
          </SubCategoriesList>
        </SubCategoriesWrapper>
      </CategoriesContent>
    </CategoriesWrapper>
  );
};

export default Catalog;
