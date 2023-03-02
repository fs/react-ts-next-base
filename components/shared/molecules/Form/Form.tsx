import React from 'react';
import type { FormikValues } from 'formik';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';

import { collectFormikProps } from './utils';

import {
  SelectFormField,
  CheckboxFormField,
  TextFormField,
  PasswordFormField,
  TextareaFormField,
  FileFormField,
  SubmitButton,
  EmailFormField,
} from './formFields';
import DefaultFieldWrapper from './DefaultFieldWrapper';

import { FormFieldConfig, TForm } from './types';
import { ErrorWrapper, FormContainer, FormWrapper, FieldWrapper } from './styled';

const Form = <FormValues extends FormikValues = FormikValues>({ form }: TForm<FormValues>) => {
  const { fields, submit } = form;
  const { initialValues, validationSchema } = collectFormikProps<FormValues>(fields);
  const formValidationSchema = Yup.object().shape(validationSchema);

  return (
    <FormWrapper data-cy="profile-update-form">
      <Formik<FormValues>
        enableReinitialize
        onSubmit={submit}
        initialValues={initialValues}
        validationSchema={formValidationSchema}
      >
        {props => {
          const { isSubmitting, status } = props;
          return (
            <FormikForm>
              <FormContainer>
                {fields.map((fieldConfig: FormFieldConfig) => {
                  const { name, title } = fieldConfig;
                  switch (fieldConfig.type) {
                    case 'select':
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <SelectFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case 'checkbox':
                      return (
                        <CheckboxFormField
                          key={name}
                          {...fieldConfig}
                          isFormSubmitting={isSubmitting}
                        />
                      );
                    case 'text':
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case 'password':
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <PasswordFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case 'textarea':
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextareaFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case 'file':
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <FileFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case 'email':
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <EmailFormField {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case 'submit':
                      return (
                        <FieldWrapper key={name}>
                          <SubmitButton {...fieldConfig} isFormSubmitting={isSubmitting} />
                        </FieldWrapper>
                      );
                    default:
                      return null;
                  }
                })}
              </FormContainer>
              {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
            </FormikForm>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

export default Form;
