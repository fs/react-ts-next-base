import React, { useEffect } from 'react';

import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';

import SelectField from 'components/shared/atoms/Selects/SelectField';

const VariantTableSelect = ({ name, propertyId, setFieldValue, initialValue, readOnly }) => {
  const fieldName = `${name}.propertyValue`;
  const fieldLabel = `${name}.propertyValueLabel`;

  const { dictionaryPropertyOptions, loading } = useDictionaryPropertyOptions({ propertyId });

  const onChangeVariantProperty = option => {
    setFieldValue(fieldLabel, option?.label || null);
  };

  useEffect(() => {
    if (!loading && dictionaryPropertyOptions.length) {
      const selectedProperty = dictionaryPropertyOptions.find(({ id }) => id === initialValue);
      setFieldValue(fieldName, selectedProperty?.id);
      setFieldValue(fieldLabel, selectedProperty?.name);
    }
  }, [loading]);

  return (
    <SelectField
      readOnly={readOnly}
      variant="table-cell"
      name={fieldName}
      options={dictionaryPropertyOptions.map(option => ({ value: option.id, label: option.name }))}
      onChange={onChangeVariantProperty}
      placeholder="Выберите вариант"
    />
  );
};

export default VariantTableSelect;
