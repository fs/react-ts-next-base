import React from 'react';

import NumberInput from 'components/shared/atoms/NumberInput';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import DatePickerInput from 'components/shared/molecules/DatePickerInput';

import { WEEKDAYS, NO_SALE } from 'config/constants/discount';

import { FakeDisabledInput } from './styled';

const DiscountForVariantsRow = ({
  fields,
  nameDiscount,
  values,
  setFieldValue,
  index,
  readOnly,
}) => {
  const variantValues = values[`variants_${nameDiscount}`][index];
  const variantFields = `variants_${nameDiscount}.${index}`;

  const options = [...WEEKDAYS, { value: NO_SALE, label: 'Нет скидки' }];

  const onChangeSelect = option => {
    const { value } = option || {};
    if (value === NO_SALE) setFieldValue(`${variantFields}.amount`, '');
  };

  const onSubmitDate = (date, name) => {
    if (!date) {
      setFieldValue(`${variantFields}.endDate`, null);
      setFieldValue(`${variantFields}.startDate`, null);
      setFieldValue(`${variantFields}.amount`, '');
    } else if (date) {
      if (name === 'endDate' && variantValues.startDate === null) {
        setFieldValue(`${variantFields}.startDate`, undefined);
      }
      if (name === 'startDate' && variantValues.endDate === null) {
        setFieldValue(`${variantFields}.endDate`, undefined);
      }
    }
  };

  return (
    <tr>
      {fields.map(({ type, name, placeholder, suffix }, i) => {
        const fieldName = `${variantFields}.${name}`;
        const disabledInput =
          variantValues.weekday === NO_SALE ||
          variantValues.endDate === null ||
          variantValues.startDate === null;

        return (
          <td key={i}>
            {type === 'number-input' ? (
              !disabledInput ? (
                <NumberInput
                  readOnly={readOnly}
                  name={fieldName}
                  testId={fieldName}
                  placeholder={placeholder}
                  suffix={suffix}
                  variant="table_cell"
                />
              ) : (
                <FakeDisabledInput>Нет скидки</FakeDisabledInput>
              )
            ) : type === 'select' ? (
              <SelectField
                readOnly={readOnly}
                variant="table-cell"
                name={fieldName}
                options={options}
                onChange={onChangeSelect}
                placeholder={placeholder}
                height="17rem"
              />
            ) : (
              <DatePickerInput
                readOnly={readOnly}
                variant="table-cell"
                name={fieldName}
                placeholder={placeholder}
                currentDate={variantValues[name]}
                setFieldValue={setFieldValue}
                checkbox="Нет скидки"
                onSubmit={date => onSubmitDate(date, name)}
                maxDate={
                  name === 'startDate' && variantValues.endDate
                    ? new Date(variantValues.endDate)
                    : undefined
                }
                minDate={
                  name === 'endDate' && variantValues.startDate
                    ? new Date(variantValues.startDate)
                    : undefined
                }
              />
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default DiscountForVariantsRow;
