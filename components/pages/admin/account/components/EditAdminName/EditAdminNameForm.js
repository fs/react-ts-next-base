import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import EditAdminAccountButtons from '../EditAdminAccountButtons';
import AdminAccountInput from '../AdminAccountInput';

import { InputsWrapper, InputWrapper } from './styled';

const EditAdminNameForm = ({ form, editable, onToggleEditable }) => {
  const { fields, initialValues, validationSchema, onSubmit } = form;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <InputsWrapper>
            {fields.map(({ title, name, type, placeholder }, index) => (
              <InputWrapper key={index}>
                <AdminAccountInput
                  title={title}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  disabled={isSubmitting || !editable}
                />
              </InputWrapper>
            ))}
          </InputsWrapper>

          <EditAdminAccountButtons
            onToggleEditable={onToggleEditable}
            editable={editable}
            isSubmitting={isSubmitting}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default EditAdminNameForm;
