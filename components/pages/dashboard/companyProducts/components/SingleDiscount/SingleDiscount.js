import React from 'react';
import { FieldArray } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { WEEKLY_DISCOUNTS, PERIOD_DISCOUNTS } from 'config/constants/discount';
import {
  getFieldsWeeklyDiscounts,
  getFieldsPeriodDiscounts,
} from '../CreateProductDiscounts/fields';
import SingleDiscountRow from './SingleDiscountRow';

import { Title, DiscountsWrapper, Description, InputsWrapper } from './styled';

const singleDiscountTypes = [
  {
    nameDiscount: WEEKLY_DISCOUNTS,
    title: 'Настройте скидку на товары в определенные дни недели',
    description: 'Скидка общая и будет относиться ко всем добавленным товарам',
    fields: getFieldsWeeklyDiscounts(),
    buttonText: 'Добавить день недели',
  },
  {
    nameDiscount: PERIOD_DISCOUNTS,
    title: 'Настройте скидку на товары в период',
    description: 'Скидка общая и будет относиться ко всем добавленным товарам',
    fields: getFieldsPeriodDiscounts(),
    buttonText: 'Добавить еще период',
  },
];

const SingleDiscount = ({ values, onAddDiscount, readOnly = false }) => {
  return (
    <div>
      {singleDiscountTypes.map(({ nameDiscount, title, description, fields, buttonText }, i) => {
        return (
          <DiscountsWrapper key={i}>
            <FieldArray name={nameDiscount}>
              {({ remove, push }) => (
                <>
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                  <InputsWrapper>
                    {values[nameDiscount].map(({ id }, index) => {
                      return (
                        <SingleDiscountRow
                          readOnly={readOnly}
                          nameDiscount={nameDiscount}
                          fields={fields}
                          remove={remove}
                          index={index}
                          key={id}
                        />
                      );
                    })}
                  </InputsWrapper>
                  {!readOnly && (
                    <Button
                      label={buttonText}
                      shape="extra-rounded"
                      size="large"
                      iconType="leading"
                      icon={<Icon name="plus" $color="white" $size={18} />}
                      testId={`add-${nameDiscount}-button`}
                      onClick={() => onAddDiscount({ nameDiscount, push })}
                      $mb={24}
                    />
                  )}
                </>
              )}
            </FieldArray>
          </DiscountsWrapper>
        );
      })}
    </div>
  );
};

export default SingleDiscount;
