import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import { useCountries } from 'lib/apollo/hooks/state/countries';

import Input from 'components/shared/atoms/Input';
import Radio from 'components/shared/atoms/Radio';
import Button from 'components/shared/atoms/Button';
import AsyncSelect from 'components/shared/atoms/Selects/AsyncSelect';

import { ProductDraftStepEnum } from 'graphql/types';
import SelectCategory from '../SelectCategory';

import { radioCondition } from './constants';
import { TCreateProductBasicForm } from './types';
import { FormWrapper } from '../_shared/styled';
import { FieldContainer, Subtitle, FieldWrapper, ActionsWrapper } from './styled';

const CreateProductBasicForm = ({
  form,
  initialCountry,
  readOnly = false,
  draftStep,
}: TCreateProductBasicForm) => {
  const { onSubmit, initialValues, validationSchema } = form;
  const disableNextButton = draftStep === ProductDraftStepEnum.Basic && readOnly;

  const fetchCountries = useCountries();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        return (
          <FormikForm>
            <FormWrapper>
              <div>
                <SelectCategory readOnly={readOnly} values={values} />

                <FieldContainer>
                  <Subtitle>Состояние товара</Subtitle>
                  <FieldWrapper>
                    <Radio
                      options={radioCondition}
                      name="condition"
                      direction="row"
                      setFieldValue={setFieldValue}
                      selected={values.condition}
                      readOnly={readOnly}
                    />
                  </FieldWrapper>
                </FieldContainer>

                <FieldContainer>
                  <Subtitle>Название товара</Subtitle>
                  <FieldWrapper>
                    <Input
                      type="text"
                      name="name"
                      testId="name"
                      placeholder="Впишите название товара"
                      readOnly={readOnly}
                      disabled={isSubmitting}
                    />
                  </FieldWrapper>
                </FieldContainer>

                <FieldContainer>
                  <Subtitle>Производитель</Subtitle>
                  <FieldWrapper $width="25rem">
                    <Input
                      type="text"
                      name="manufacturer"
                      testId="manufacturer"
                      placeholder="Производитель"
                      readOnly={readOnly}
                      disabled={isSubmitting}
                    />
                  </FieldWrapper>
                </FieldContainer>

                <FieldContainer>
                  <Subtitle>Страна производителя</Subtitle>
                  <FieldWrapper $width="25rem">
                    <AsyncSelect
                      name="country"
                      initialValue={
                        initialCountry
                          ? { value: initialCountry.id, label: initialCountry.name }
                          : undefined
                      }
                      placeholder="Страна производителя"
                      fetchFn={fetchCountries}
                      readOnly={readOnly}
                      disabled={isSubmitting}
                    />
                  </FieldWrapper>
                </FieldContainer>

                <FieldContainer>
                  <Subtitle>Описание товара</Subtitle>
                  <FieldWrapper>
                    <Input
                      readOnly={readOnly}
                      type="textarea"
                      name="description"
                      testId="description"
                      placeholder="Описание товара"
                      disabled={isSubmitting}
                    />
                  </FieldWrapper>
                </FieldContainer>
              </div>

              <ActionsWrapper>
                <Button
                  label="Далее"
                  type="submit"
                  size="large"
                  $width="14rem"
                  testId="create-product-basic-submit-button"
                  disabled={isSubmitting || disableNextButton}
                  isLoading={isSubmitting}
                />
              </ActionsWrapper>
            </FormWrapper>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default CreateProductBasicForm;
