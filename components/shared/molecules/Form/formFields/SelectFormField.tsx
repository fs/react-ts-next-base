import React, { FC } from 'react';
import { Field } from 'formik';

import { OptionType, SelectFormFieldConfig } from './types';

const SelectFormField: FC<SelectFormFieldConfig> = ({
  name,
  testId,
  placeholder,
  disabled,
  options = [],
}) => {
  return (
    <Field
      as="select"
      name={name}
      id={name}
      data-testid={testId}
      placeholder={placeholder}
      disabled={disabled}
    >
      {options.map((option: OptionType) => {
        const { value, label: optionLabel } = option;
        return (
          <option value={value} key={value}>
            {optionLabel}
          </option>
        );
      })}
    </Field>
  );
};

export default SelectFormField;
