import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import EditAdminAccountButtons from '../EditAdminAccountButtons';
import AdminAccountInput from '../AdminAccountInput';

const EditAdminPasswordForm = ({ form, onToggleEditable, editable }) => {
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

export default EditAdminPasswordForm;
