import React from 'react';
import { useField } from 'formik';
import useRouter from 'hooks/useRouter';

import { DEPTH_PLURAL_DICTIONARY } from 'config/constants/categories';

import { useCategories } from 'lib/apollo/hooks/state/categories';

import SelectField from 'components/shared/atoms/Selects/SelectField';
import Button from 'components/shared/atoms/Button';

import { ADMIN_CATEGORY } from 'config/routes';
import { Actions, ActionsGroup, CategoryGroup, CategoryWrapper, Title } from './styled';
import CreateCategoryButton from './components/CreateCategoryButton';
import DestroyCategoryButton from './components/DestroyCategoryButton';
import UpdateCategoryButton from './components/UpdateCategoryButton';

const Category = ({ parentId, depth = 0, refetchParent = () => {} }) => {
  const { pushRoute } = useRouter();
  const categoryName = `categories.${depth}`;

  const [, { value: selectedCategories }, { setValue: setSelectedCategories }] =
    useField('categories');

  const { categories, loading, refetch: refetchCategories } = useCategories({ parentId });

  const isOutOptions = categories.length === 0;

  const selectedCategory = categories.find(item => item.id === selectedCategories[depth]);

  const onChange = option => {
    setSelectedCategories(
      selectedCategories.map((item, i) => (i < depth ? item : i === depth ? option?.value : null)),
    );
  };

  return (
    <CategoryGroup>
      <CategoryWrapper data-testid="category-wrapper">
        <Title>{DEPTH_PLURAL_DICTIONARY[depth]}</Title>
        <SelectField
          name={categoryName}
          options={categories.map(category => ({ value: category.id, label: category.name }))}
          disabled={isOutOptions || loading}
          isClearable
          onChange={onChange}
          placeholder={
            loading ? 'Поиск вариантов...' : isOutOptions ? 'Нет вариантов' : 'Выберите вариант'
          }
          $mb={20}
        />
        <Actions>
          <ActionsGroup>
            <CreateCategoryButton
              depth={depth}
              parentId={parentId}
              onCompleted={() => {
                refetchParent();
                refetchCategories();
              }}
            />
            {selectedCategory && (
              <>
                <UpdateCategoryButton selectedCategory={selectedCategory} depth={depth} />
                <DestroyCategoryButton
                  selectedCategory={selectedCategory}
                  depth={depth}
                  onCompleted={() => {
                    refetchParent();
                    refetchCategories();
                    onChange({});
                  }}
                />
              </>
            )}
          </ActionsGroup>
          {selectedCategories[depth] && (
            <Button
              variant="primary"
              iconType="none"
              shape="rounded"
              size="small"
              label="Посмотреть характеристики"
              onClick={() => {
                pushRoute({
                  pathname: ADMIN_CATEGORY,
                  query: {
                    categoryId: selectedCategories[depth],
                  },
                });
              }}
            />
          )}
        </Actions>
      </CategoryWrapper>
      {selectedCategories[depth] && DEPTH_PLURAL_DICTIONARY[depth + 1] && (
        <Category
          parentId={selectedCategories[depth]}
          depth={depth + 1}
          refetchParent={refetchCategories}
        />
      )}
    </CategoryGroup>
  );
};

export default Category;
