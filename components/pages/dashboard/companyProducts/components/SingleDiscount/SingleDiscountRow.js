import React from 'react';
import { useFormikContext } from 'formik';
import { useModal } from '@ebay/nice-modal-react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import NumberInput from 'components/shared/atoms/NumberInput';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import DatePickerInput from 'components/shared/molecules/DatePickerInput';

import { PERIOD_DISCOUNTS, WEEKDAYS, WEEKLY_DISCOUNTS } from 'config/constants/discount';
import { Row, InputWrapper } from './styled';

const SingleDiscountRow = ({ fields, nameDiscount, remove, index, readOnly = false }) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const removeDiscountModal = useModal(SimpleModal);

  const disabledDeleteButton =
    !index &&
    !values[nameDiscount === WEEKLY_DISCOUNTS ? PERIOD_DISCOUNTS : WEEKLY_DISCOUNTS].length &&
    values[nameDiscount].length < 2;

  const showRemoveDiscount = () =>
    removeDiscountModal.show({
      onSubmit: () => {
        remove(index);
      },
      title: 'Удаление скидки',
      description: 'Вы уверены, что хотите удалить выбранную скидку на товар?',
    });

  return (
    <Row>
      {fields.map(({ type, name, placeholder, suffix }, i) => {
        const fieldName = `${nameDiscount}.${index}.${name}`;
        const discountValues = values[nameDiscount][index];
        const [value, error, touchedField] = [values, errors, touched].map(
          item => item?.[nameDiscount]?.[index]?.[name],
        );

        return (
          <InputWrapper hidden={type === 'hidden'} key={i}>
            {type === 'select' ? (
              <SelectField
                name={fieldName}
                options={WEEKDAYS}
                placeholder={placeholder}
                height="16rem"
                readOnly={readOnly}
              />
            ) : type === 'number-input' ? (
              <NumberInput
                name={fieldName}
                testId={fieldName}
                placeholder={placeholder}
                suffix={suffix}
                readOnly={readOnly}
              />
            ) : (
              <DatePickerInput
                readOnly={readOnly}
                name={fieldName}
                placeholder={placeholder}
                currentDate={value}
                setFieldValue={setFieldValue}
                maxDate={
                  name === 'startDate' && discountValues.endDate
                    ? new Date(discountValues.endDate)
                    : undefined
                }
                minDate={
                  name === 'endDate' && discountValues.startDate
                    ? new Date(discountValues.startDate)
                    : undefined
                }
                error={touchedField && error}
              />
            )}
          </InputWrapper>
        );
      })}
      {!readOnly && (
        <Button
          variant="outlined-neutral"
          iconType="only"
          icon={<Icon name="close" $color="greyCC" $size={14} />}
          testId={`remove-${nameDiscount}-${index}`}
          disabled={disabledDeleteButton}
          onClick={showRemoveDiscount}
          $ml={8}
        />
      )}
    </Row>
  );
};

export default SingleDiscountRow;
