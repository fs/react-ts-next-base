import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Button from 'components/shared/atoms/Button';
import Radio from 'components/shared/atoms/Radio';
import Checkbox from 'components/shared/atoms/Checkbox';

import { ProductDraftStepEnum } from 'graphql/types';
import { FormWrapper } from '../_shared/styled';
import { DeliveryWrapper, Subtitle, Description, ActionsWrapper, PickupWrapper } from './styled';
import DeliveryCitiesForm from '../DeliveryCitiesForm';

const CreateProductOwnDeliveryForm = ({
  pickup,
  deliveryMethods,
  radio,
  onAddDeliveryCity,
  onSubmit,
  methods,
  initialValues,
  validationSchema,
  initialCities,
  onChangeRadio,
  draftStep,
  readOnly = false,
}) => {
  const disableNextButton = draftStep === ProductDraftStepEnum.Delivery && readOnly;
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values, setFieldTouched }) => (
        <FormikForm>
          <FormWrapper>
            <div>
              <PickupWrapper>
                <Checkbox
                  readOnly={readOnly}
                  name={pickup.name}
                  label={pickup.label}
                  checked={values.disablePickup}
                  onChange={value => setFieldValue(pickup.name, value)}
                />
                <Description>{pickup.description}</Description>
              </PickupWrapper>

              {deliveryMethods.map(({ method, subtitle, description }) => {
                return (
                  <DeliveryWrapper key={method}>
                    <Subtitle>{subtitle}</Subtitle>
                    <Description>{description}</Description>
                    <Radio
                      readOnly={readOnly}
                      options={radio}
                      name={`${method}Radio`}
                      direction="row"
                      setFieldValue={setFieldValue}
                      selected={values[`${method}Radio`]}
                      onChange={value => onChangeRadio(value, method)}
                    />
                    {values[`${method}Radio`] && (
                      <DeliveryCitiesForm
                        onAddDeliveryCity={onAddDeliveryCity}
                        method={method}
                        values={values}
                        methods={methods}
                        initialCities={initialCities}
                        setFieldTouched={setFieldTouched}
                        readOnly={readOnly}
                      />
                    )}
                  </DeliveryWrapper>
                );
              })}
            </div>

            <ActionsWrapper>
              <Button
                label="Далее"
                type="submit"
                size="large"
                $width="14rem"
                testId="create-product-own-delivery-submit-button"
                isLoading={isSubmitting}
                disabled={
                  isSubmitting ||
                  disableNextButton ||
                  Object.values(methods).some(
                    ({ name, deliveries }) =>
                      values[`${name}Radio`] &&
                      !!values[deliveries] &&
                      values[deliveries].some(deliveryCity =>
                        Object.values(deliveryCity).some(field => !field),
                      ),
                  )
                }
              />
            </ActionsWrapper>
          </FormWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateProductOwnDeliveryForm;
