import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Button from 'components/shared/atoms/Button';
import Radio from 'components/shared/atoms/Radio';

import { DISCOUNT_FOR_VARIANTS, NO_DISCOUNT, SINGLE_DISCOUNT } from 'config/constants/discount';
import SingleDiscount from '../SingleDiscount';
import DiscountForVariants from '../DiscountForVariants';

import { FormWrapper } from '../_shared/styled';
import { RadioWrapper, Subscription, ActionsWrapper } from './styled';

const CreateProductDiscountsForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  onChangeRadio,
  radio,
  discountMethodRadio,
  onAddDiscount,
  variants,
  isTemplate,
  readOnly = false,
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values, handleSubmit }) => (
        <FormikForm>
          <FormWrapper>
            <div>
              <RadioWrapper>
                <Radio
                  readOnly={readOnly}
                  options={radio}
                  name="radio"
                  direction="row"
                  setFieldValue={setFieldValue}
                  selected={values.radio}
                  onChange={value => onChangeRadio(value)}
                />
              </RadioWrapper>
              {values.radio === SINGLE_DISCOUNT && (
                <SingleDiscount
                  readOnly={readOnly}
                  values={values}
                  setFieldValue={setFieldValue}
                  onAddDiscount={onAddDiscount}
                />
              )}
              {values.radio === DISCOUNT_FOR_VARIANTS && (
                <DiscountForVariants
                  values={values}
                  setFieldValue={setFieldValue}
                  variants={variants}
                  readOnly={readOnly}
                />
              )}
              {values.radio !== NO_DISCOUNT && (
                <RadioWrapper>
                  <Radio
                    readOnly={readOnly}
                    options={discountMethodRadio}
                    name="discountMethod"
                    direction="row"
                    setFieldValue={setFieldValue}
                    selected={values.discountMethod}
                  />
                </RadioWrapper>
              )}
            </div>
            {!readOnly && (
              <div>
                <Subscription>
                  Вы можете сохранить заполненный макет как шаблон, чтобы в будущем не заполнять всё
                  снова. <br />
                  Например, у вас есть одни и те же перчатки, но разного цвета. Вы можете создать
                  шаблон и <br />
                  в будущем заменить в нем только цвет, чтобы создать новый товар <br />
                </Subscription>
                <ActionsWrapper>
                  <Button
                    label="Сохранить шаблон товара"
                    size="large"
                    variant={isTemplate ? 'change' : 'primary'}
                    testId="create-product-template-button"
                    disabled={values.template}
                    onClick={() => {
                      setFieldValue('template', true);
                      handleSubmit();
                    }}
                  />
                  <Button
                    label={isTemplate ? 'Сохранить изменения' : 'Добавить товар'}
                    variant="confirm"
                    type="submit"
                    size="large"
                    $width="14rem"
                    testId="create-product-discounts-submit-button"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    onClick={() => setFieldValue('template', false)}
                  />
                </ActionsWrapper>
              </div>
            )}
          </FormWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateProductDiscountsForm;
