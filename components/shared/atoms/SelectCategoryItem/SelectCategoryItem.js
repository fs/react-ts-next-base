import React, { useEffect } from 'react';
import { ErrorMessage, useField } from 'formik';

import { useCategories } from 'lib/apollo/hooks/state/categories';

import SelectField from 'components/shared/atoms/Selects/SelectField';

import { SelectWrapper, ErrorWrapper } from './styled';

const SelectCategoryItem = ({ field, options, setOptions, rounded = false, readOnly = false }) => {
  const { name, disabled, title, placeholder, fieldIndex } = field;
  const [, { value: categoriesValue }, { setValue }] = useField('categories');

  const { categories, loading: loadingCategories } = useCategories({
    parentId: fieldIndex ? categoriesValue[fieldIndex - 1] : undefined,
  });

  const onChange = option => {
    setValue(
      categoriesValue.map((item, i) =>
        i < fieldIndex ? item : i === fieldIndex ? option?.value : null,
      ),
    );
  };

  useEffect(() => {
    if (loadingCategories) return;
    setOptions(prev =>
      prev.map((item, index) =>
        index === fieldIndex
          ? categories.map(option => ({ value: option.id, label: option.name }))
          : item,
      ),
    );
  }, [loadingCategories]);

  return (
    <SelectWrapper>
      <SelectField
        name={name}
        options={options[fieldIndex]}
        disabled={disabled || loadingCategories || !categories.length}
        title={title}
        placeholder={placeholder}
        onChange={onChange}
        showError={false}
        rounded={rounded}
        $mb={20}
        readOnly={readOnly}
      />
      {fieldIndex === 0 && (
        <ErrorMessage name="categories" render={msg => <ErrorWrapper>{msg}</ErrorWrapper>} />
      )}
    </SelectWrapper>
  );
};

export default SelectCategoryItem;
