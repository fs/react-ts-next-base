import type { FormikValues } from 'formik';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';

import { TWidth } from 'public/styles/config/width';

import DefaultFieldWrapper from './DefaultFieldWrapper';
import {
  CheckboxFormField,
  EmailFormField,
  FileFormField,
  PasswordFormField,
  SelectFormField,
  SubmitButton,
  TextareaFormField,
  TextFormField,
} from './formFields';

import { ErrorWrapper, FieldWrapper, FormContainer, FormWrapper } from './styled';
import { FormFieldConfig, FormFieldType, FormType } from './types';
import { collectFormikProps } from './utils';

const Form = <FormValues extends FormikValues = FormikValues>({
  form,
  $width = 'auto',
}: TWidth & {
  form: FormType<FormValues>;
}) => {
  const { fields, onSubmit } = form;
  const { initialValues, validationSchema } = collectFormikProps<FormValues>(fields);
  const formValidationSchema = Yup.object().shape(validationSchema);

  return (
    <FormWrapper data-testid="profile-update-form" $width={$width}>
      <Formik<FormValues>
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={formValidationSchema}
      >
        {({ isSubmitting, status }) => {
          return (
            <FormikForm>
              <FormContainer>
                {fields.map((fieldConfig: FormFieldConfig) => {
                  const { name, title } = fieldConfig;
                  switch (fieldConfig.type) {
                    case FormFieldType.select:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <SelectFormField {...fieldConfig} isSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.checkbox:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <CheckboxFormField
                            key={name}
                            {...fieldConfig}
                            isSubmitting={isSubmitting}
                          />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.text:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextFormField {...fieldConfig} isSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.password:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <PasswordFormField {...fieldConfig} isSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.textarea:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <TextareaFormField {...fieldConfig} isSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.file:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <FileFormField {...fieldConfig} isSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.email:
                      return (
                        <DefaultFieldWrapper key={name} name={name} title={title}>
                          <EmailFormField {...fieldConfig} isSubmitting={isSubmitting} />
                        </DefaultFieldWrapper>
                      );
                    case FormFieldType.submit:
                      return (
                        <FieldWrapper key={name}>
                          <SubmitButton {...fieldConfig} isSubmitting={isSubmitting} />
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
