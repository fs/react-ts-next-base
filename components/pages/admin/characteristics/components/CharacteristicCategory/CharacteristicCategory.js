import React, { useEffect } from 'react';
import { useField } from 'formik';

import {
  DEPTH_SINGLE_DICTIONARY,
  DEPTH_DECLENSION_SINGULAR_DICTIONARY,
} from 'config/constants/categories';

import { useCategories } from 'lib/apollo/hooks/state/categories';

import SelectField from 'components/shared/atoms/Selects/SelectField';

import { CategoryWrapper } from './styled';

const CharacteristicCategory = ({
  parentId,
  setCharacteristicsName,
  setLastSelectedCategory,
  depth = 0,
}) => {
  const categoryName = `parentIdDepth${depth}`;

  const [, { value: selectedCategoryId }, { setValue: setSelectedCategoryId }] =
    useField(categoryName);

  const { categories, loading } = useCategories({ parentId });

  useEffect(() => {
    if (loading) {
      setSelectedCategoryId(null);
    }
  }, [loading]);

  useEffect(() => {
    setCharacteristicsName(characteristicPath => {
      const filteredCharacteristicPath = Object.fromEntries(
        Object.entries(characteristicPath).filter(([key]) => {
          return Number(key) < depth;
        }),
      );
      return {
        ...filteredCharacteristicPath,
        [depth]: categories.find(item => item.id === selectedCategoryId)?.name,
      };
    });
  }, [selectedCategoryId]);

  const isOutOptions = categories.length === 0;
  return (
    <>
      <CategoryWrapper>
        <SelectField
          title={DEPTH_SINGLE_DICTIONARY[depth]}
          name={categoryName}
          options={categories.map(category => ({ value: category.id, label: category.name }))}
          disabled={isOutOptions || loading}
          onChange={setLastSelectedCategory}
          isClearable
          placeholder={
            loading
              ? 'Поиск вариантов...'
              : isOutOptions
              ? 'Нет вариантов'
              : `Выберите ${DEPTH_DECLENSION_SINGULAR_DICTIONARY[depth].toLowerCase()}`
          }
          $mb={20}
        />
      </CategoryWrapper>
      {selectedCategoryId && DEPTH_SINGLE_DICTIONARY[depth + 1] && (
        <CharacteristicCategory
          parentId={selectedCategoryId}
          setCharacteristicsName={setCharacteristicsName}
          depth={depth + 1}
          setLastSelectedCategory={setLastSelectedCategory}
        />
      )}
    </>
  );
};

export default CharacteristicCategory;
