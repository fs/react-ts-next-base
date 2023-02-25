import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input';

import { FormWrapper, ErrorWrapper } from './styled';

const ResetForm = ({ form }) => {
  const { fields, initialValues, validationSchema, onSubmit } = form;

  return (
    <FormWrapper data-cy="new-password-form">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <FormikForm>
            {fields.map(({ type, name, testId, placeholder }) => {
              return (
                <Input
                  type={type}
                  name={name}
                  testId={testId}
                  placeholder={placeholder}
                  key={name}
                  variant="underlined"
                />
              );
            })}
            <Button
              label="ПОДТВЕРДИТЬ"
              type="submit"
              $width="10rem"
              testId="submit-button"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            />
            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </FormWrapper>
  );
};
export default ResetForm;
