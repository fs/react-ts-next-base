import { useCategories } from 'lib/apollo/hooks/state/categories';
import { useEffect, useState } from 'react';

export const useCategory = (category, queryCategory) => {
  const { categories } = useCategories({
    parentId: category?.value,
    skip: !category?.value && category?.value !== null,
  });

  const initValue = {
    value: queryCategory,
    label: categories.find(item => item.id === queryCategory)?.name,
  };

  const [selectedCategory, setSelectedCategory] = useState(initValue);

  useEffect(() => {
    if (!queryCategory) {
      setSelectedCategory(initValue);
    }
  }, [queryCategory]);

  return [selectedCategory, setSelectedCategory, categories];
};
