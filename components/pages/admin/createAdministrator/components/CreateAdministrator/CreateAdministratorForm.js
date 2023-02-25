import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { Col, InputWrapper, Title, ActionWrapper } from './styled';

const CreateAdministratorForm = ({ form }) => {
  const { initialValues, validationSchema, onSubmit, fields } = form;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <FormikForm>
          <Col>
            {fields.map(({ type, title, name, placeholder }, index) => (
              <InputWrapper key={index}>
                <Title>{title}</Title>
                <Input type={type} name={name} testId={name} placeholder={placeholder} rounded />
              </InputWrapper>
            ))}
            <ActionWrapper>
              <Button
                type="submit"
                label="Сохранить"
                variant="confirm"
                shape="rounded"
                size="small"
                testId="create-admin-submit-button"
              />
            </ActionWrapper>
          </Col>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateAdministratorForm;
