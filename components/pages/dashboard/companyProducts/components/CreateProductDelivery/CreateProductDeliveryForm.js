import React from 'react';
import { Formik, Form as FormikForm, FieldArray } from 'formik';

import Button from 'components/shared/atoms/Button';
import Radio from 'components/shared/atoms/Radio';
import Input from 'components/shared/atoms/Input';

import { shipmentMethods, courierServices } from 'config/constants/createProductDelivery';
import { ProductDraftStepEnum } from 'graphql/types';
import DeliveryPoint from '../DeliveryPoint';
import DeliveryInputList from './DeliveryInputList';
import VariantProperties from '../CreateProductAddress/VariantProperties';
import DellinFreightTypeSelect from '../DellinFreightTypeSelect';

import { FormWrapper } from '../_shared/styled';
import {
  Description,
  DellinFreightTypesWrapper,
  RadioShipmentMethodsWrapper,
  RadioCourierWrapper,
  DescriptionDeliveryCondition,
  FieldWrapper,
  ActionsWrapper,
  Row,
} from './styled';
import { Subtitle } from '../CreateProductAddress/styled';

const CreateProductDeliveryForm = ({
  shipmentMethodsRadio,
  courierServicesRadio,
  deliveryConditionTypeFields,
  productVariants,
  validationSchema,
  initialValues,
  onSubmit,
  initialDeliveryPoints,
  dellinFreightTypesOptions,
  deliveryPointsList,
  readOnly = false,
  draftStep,
}) => {
  const disableNextButton = draftStep === ProductDraftStepEnum.DeliveryConditions && readOnly;

  return (
    <Formik
      enableReinitialize={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status, setFieldValue, values }) => (
        <FormikForm>
          <FormWrapper>
            <div>
              <Description>
                Укажите все необходимые требования к логистической службе, чтобы ваш товар приехал в
                целости и сохранности.
              </Description>
              <RadioShipmentMethodsWrapper>
                <Radio
                  readOnly={readOnly}
                  options={shipmentMethodsRadio}
                  name="shipmentMethod"
                  direction="row"
                  setFieldValue={setFieldValue}
                  selected={values.shipmentMethod}
                />
              </RadioShipmentMethodsWrapper>
              {values.shipmentMethod === shipmentMethods.COURIER && (
                <RadioCourierWrapper>
                  <Radio
                    readOnly={readOnly}
                    options={courierServicesRadio}
                    name="courierService"
                    direction="row"
                    setFieldValue={setFieldValue}
                    selected={values.courierService}
                  />
                </RadioCourierWrapper>
              )}
              {values.shipmentMethod === shipmentMethods.DELIVERY_POINT && (
                <>
                  <DeliveryPoint
                    readOnly={readOnly}
                    point={values.dellinDeliveryPoint}
                    deliveryPointsList={deliveryPointsList}
                    initialDeliveryPoints={initialDeliveryPoints}
                    dellinFreightTypesOptions={dellinFreightTypesOptions}
                  />
                  <DeliveryPoint
                    readOnly={readOnly}
                    point={values.sdekDeliveryPoint}
                    deliveryPointsList={deliveryPointsList}
                    initialDeliveryPoints={initialDeliveryPoints}
                    dellinFreightTypesOptions={dellinFreightTypesOptions}
                  />
                </>
              )}
              {values.shipmentMethod === shipmentMethods.COURIER &&
                values.courierService !== courierServices.NO_DELLIN &&
                !!dellinFreightTypesOptions.length && (
                  <DellinFreightTypesWrapper>
                    <DellinFreightTypeSelect
                      readOnly={readOnly}
                      options={dellinFreightTypesOptions}
                    />
                  </DellinFreightTypesWrapper>
                )}
              {values.shipmentMethod !== shipmentMethods.NONE && (
                <>
                  <DescriptionDeliveryCondition>
                    Укажите параметры упаковки товара.
                  </DescriptionDeliveryCondition>

                  {deliveryConditionTypeFields.map((field, i) => {
                    const { name, options, direction, onChange } = field;
                    return (
                      <div key={i}>
                        <FieldWrapper>
                          <Radio
                            readOnly={readOnly}
                            options={options}
                            name={name}
                            direction={direction}
                            setFieldValue={setFieldValue}
                            selected={values[name]}
                            onChange={onChange}
                          />
                        </FieldWrapper>
                      </div>
                    );
                  })}

                  {!values.deliveryConditionForVariant ? (
                    <>
                      <DeliveryInputList
                        readOnly={readOnly}
                        externalHelpers={{
                          isSubmitting,
                          status,
                          setFieldValue,
                          values,
                          initialValues,
                        }}
                      />
                    </>
                  ) : (
                    <FieldArray name="variants">
                      {() =>
                        productVariants.map((variant, index) => (
                          <div key={index}>
                            <Row>
                              <Subtitle>Вариант товара №{index + 1}</Subtitle>
                              <VariantProperties variantProperties={variant.variantProperties} />
                            </Row>
                            <Input type="hidden" name={`variants.${index}.id`} />
                            <DeliveryInputList
                              readOnly={readOnly}
                              variantIndex={index}
                              currentVariant={variant.deliveryCondition}
                              externalHelpers={{
                                isSubmitting,
                                status,
                                setFieldValue,
                                values,
                                initialValues,
                              }}
                            />
                          </div>
                        ))
                      }
                    </FieldArray>
                  )}
                </>
              )}
            </div>
            <ActionsWrapper>
              <Button
                label="Далее"
                type="submit"
                size="large"
                $width="14rem"
                testId="create-delivery-condition-submit-button"
                disabled={isSubmitting || disableNextButton}
                isLoading={isSubmitting}
              />
            </ActionsWrapper>
          </FormWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateProductDeliveryForm;
