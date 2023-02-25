import React from 'react';
import { Formik, Form as FormikForm, FieldArray } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { ProductDraftStepEnum, VariantUnitKindEnum } from 'graphql/types';
import Radio from 'components/shared/atoms/Radio';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import SelectProperties from '../SelectProperties';
import VariantsTable from '../VariantsTable';
import VariantsImages from '../VariantsImages';

import { FormWrapper } from '../_shared/styled';
import { DescriptionTable, ButtonWrapper, Subtitle, QuantityKindWrapper } from './styled';
import { quantityKinds, unitKinds } from './constants';

const CreateProductPropertiesForm = ({
  form,
  selectedProperties,
  setSelectedProperties,
  disabledPropertiesSelect,
  properties,
  onAddVariant,
  setDestroyedVariants,
  draftStep,
  readOnly = false,
}) => {
  const { initialValues, validationSchema, onSubmit } = form;
  const disableNextButton =
    (draftStep === ProductDraftStepEnum.Properties && readOnly) || !selectedProperties.length;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values, errors }) => {
        const isDisplayQuantity = values?.unitKind === VariantUnitKindEnum.Pack;
        return (
          <FormikForm>
            <FormWrapper>
              <FieldArray name="variants">
                {({ push: pushVariant, remove: removeVariant }) => (
                  <>
                    <div>
                      {!readOnly && (
                        <SelectProperties
                          disabledPropertiesSelect={disabledPropertiesSelect}
                          properties={properties}
                          selectedProperties={selectedProperties}
                          setSelectedProperties={setSelectedProperties}
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                      )}
                      {!!selectedProperties.length && (
                        <>
                          <Subtitle>Укажите единицу товара</Subtitle>
                          <Radio
                            options={unitKinds}
                            name="unitKind"
                            direction="row"
                            setFieldValue={setFieldValue}
                            selected={values.unitKind}
                            readOnly={readOnly}
                          />
                          {isDisplayQuantity && (
                            <QuantityKindWrapper>
                              <SelectField
                                readOnly={readOnly}
                                name="unitQuantityKind"
                                type="select"
                                options={quantityKinds}
                                isClearable={false}
                              />
                            </QuantityKindWrapper>
                          )}
                          <DescriptionTable
                            error={errors.variants?.some(
                              variant =>
                                variant?.expirationDate ||
                                variant?.variantProperties ||
                                variant?.unitQuantity,
                            )}
                          >
                            Все поля обязательны к заполнению
                          </DescriptionTable>
                          <VariantsTable
                            readOnly={readOnly}
                            selectedProperties={selectedProperties}
                            setFieldValue={setFieldValue}
                            values={values}
                            removeVariant={removeVariant}
                            setDestroyedVariants={setDestroyedVariants}
                            isSubmitting={isSubmitting}
                          />
                          {!readOnly && (
                            <Button
                              label="Добавить следующий вариант товара"
                              iconType="leading"
                              icon={<Icon name="plus" $color="white" />}
                              onClick={() => onAddVariant({ pushVariant })}
                              testId="add-variant-button"
                              $mt={8}
                            />
                          )}
                          <VariantsImages readOnly={readOnly} values={values} />
                        </>
                      )}
                    </div>
                    <ButtonWrapper>
                      <Button
                        label="Далее"
                        type="submit"
                        size="large"
                        $width="14rem"
                        disabled={
                          isSubmitting ||
                          disableNextButton ||
                          values.variants.some(
                            ({ expirationDate, variantProperties }) =>
                              expirationDate === undefined ||
                              variantProperties.some(({ propertyValue }) => !propertyValue),
                          )
                        }
                        isLoading={isSubmitting}
                        testId="create-product-properties-submit-button"
                      />
                    </ButtonWrapper>
                  </>
                )}
              </FieldArray>
            </FormWrapper>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default CreateProductPropertiesForm;
