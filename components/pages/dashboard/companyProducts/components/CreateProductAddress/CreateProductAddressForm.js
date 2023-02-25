import React, { useState } from 'react';
import { Formik, Form as FormikForm, FieldArray } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import NumberInput from 'components/shared/atoms/NumberInput';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import Map from 'components/shared/molecules/Map';
import MapLocationModal from 'components/shared/organisms/MapLocationModal';

import { ProductDraftStepEnum } from 'graphql/types';
import VariantProperties from './VariantProperties';

import { FormWrapper } from '../_shared/styled';
import { FieldContainer, Subtitle, MapWrapper, FieldWrapper, Row, ActionsWrapper } from './styled';

const CreateProductAddressForm = ({
  onSubmit,
  onAddNewAddress,
  address,
  productVariants,
  initialValues,
  validationSchema,
  fields,
  selectedAddress,
  draftStep,
  readOnly = false,
}) => {
  const [isShowMapModal, setIsShowMapModal] = useState(false);
  const disableNextButton = draftStep === ProductDraftStepEnum.Address && readOnly;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <FormikForm>
          <FormWrapper>
            <div>
              <Subtitle>Адрес нахождения товара</Subtitle>

              <SelectField
                name={address.name}
                options={address.options}
                onChange={address.onChange}
                disabled={address.disabled}
                placeholder={address.placeholder}
                $mb={20}
                readOnly={readOnly}
              />

              {!readOnly && (
                <Button
                  label="Добавить адрес нахождения товара"
                  variant="hollow-primary"
                  size="extra-small"
                  iconType="leading"
                  icon={<Icon name="pencil-square" $size={22} $color="blue" />}
                  onClick={() => setIsShowMapModal(true)}
                />
              )}

              <ModalWindow isOpen={isShowMapModal} setIsOpen={setIsShowMapModal} $width="45rem">
                <MapLocationModal
                  setIsShowMapModal={setIsShowMapModal}
                  onAddAddress={onAddNewAddress}
                />
              </ModalWindow>

              <MapWrapper>
                <Map address={selectedAddress?.label} />
              </MapWrapper>

              <FieldArray name="variants">
                {() => (
                  <>
                    {values.variants.length > 0 &&
                      values.variants.map((_, index) => {
                        const { variantProperties } = productVariants[index];

                        return (
                          <div key={index}>
                            <Row>
                              <Subtitle>Вариант товара №{index + 1}</Subtitle>
                              <VariantProperties variantProperties={variantProperties} />
                            </Row>
                            <FieldContainer>
                              {fields.map(
                                ({
                                  title,
                                  subtitle,
                                  width,
                                  name,
                                  type,
                                  placeholder,
                                  onChange,
                                  options,
                                  decimalScale,
                                  suffix,
                                }) => {
                                  const fieldName = `variants.${index}.${name}`;
                                  return (
                                    <FieldWrapper
                                      width={width}
                                      key={name}
                                      isHidden={type === 'hidden'}
                                    >
                                      {subtitle && <Subtitle>{subtitle}</Subtitle>}

                                      {type === 'select' ? (
                                        <SelectField
                                          name={fieldName}
                                          options={options.map(option => ({
                                            value: option.id,
                                            label: option.name,
                                          }))}
                                          onChange={onChange}
                                          title={title}
                                          placeholder={placeholder}
                                          $mb={20}
                                          readOnly={readOnly}
                                        />
                                      ) : (
                                        <NumberInput
                                          name={fieldName}
                                          testId={fieldName}
                                          title={title}
                                          placeholder={placeholder}
                                          decimalScale={decimalScale}
                                          suffix={suffix}
                                          disabled={isSubmitting}
                                          errorMessage
                                          $mb={20}
                                          readOnly={readOnly}
                                        />
                                      )}
                                    </FieldWrapper>
                                  );
                                },
                              )}
                            </FieldContainer>
                          </div>
                        );
                      })}
                  </>
                )}
              </FieldArray>
            </div>

            <ActionsWrapper>
              <Button
                label="Далее"
                type="submit"
                size="large"
                $width="14rem"
                testId="create-product-address-submit-button"
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

export default CreateProductAddressForm;
