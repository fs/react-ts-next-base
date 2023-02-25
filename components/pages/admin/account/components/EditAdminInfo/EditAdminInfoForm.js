import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import EditAdminAccountButtons from '../EditAdminAccountButtons';
import AdminAccountInput from '../AdminAccountInput';

import { Row } from './styled';

const EditAdminInfoForm = ({ form, editable, onToggleEditable }) => {
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
          <Row>
            {fields.map(({ type, name, title, placeholder }, index) => (
              <AdminAccountInput
                title={title}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={isSubmitting || !editable}
                key={index}
              />
            ))}
          </Row>

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

export default EditAdminInfoForm;
