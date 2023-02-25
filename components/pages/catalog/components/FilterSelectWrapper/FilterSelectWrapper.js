import React from 'react';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';

const FilterSelectWrapper = ({ name, propertyId, onChange, isMulti, closeMenuOnSelect }) => {
  // need to add useEffects based on loading
  const { dictionaryPropertyOptions: options } = useDictionaryPropertyOptions({ propertyId });

  return (
    <SelectField
      name={name}
      isMulti={isMulti}
      placeholder=""
      options={options.map(option => ({ value: option.id, label: option.name }))}
      onChange={onChange}
      disabled={options?.length === 0}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default FilterSelectWrapper;
