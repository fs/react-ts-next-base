import React from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import { useUpdateUser } from 'lib/apollo/hooks/actions/currentUser';

import { Wrapper, InputsWrapper } from './styled';

const EditName = ({ user }) => {
  const { firstName, lastName, middleName } = user || {};
  const [updateUser] = useUpdateUser();

  const initialValues = {
    lastName: lastName || '',
    firstName: firstName || '',
    middleName: middleName || '',
  };

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required(REQUIRED_FIELD),
    firstName: Yup.string().required(REQUIRED_FIELD),
    middleName: Yup.string(),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await updateUser(values);

    setSubmitting(false);
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <FormikForm>
            <InputsWrapper>
              <Input
                variant="secondary"
                textAlign="center"
                type="text"
                name="lastName"
                testId="lastName"
                placeholder="Фамилия"
              />
              <Input
                variant="secondary"
                textAlign="center"
                type="text"
                name="firstName"
                testId="firstName"
                placeholder="Имя"
              />
              <Input
                variant="secondary"
                textAlign="center"
                type="text"
                name="middleName"
                testId="middleName"
                placeholder="Отчество"
              />
            </InputsWrapper>

            <Button
              label="Подтвердить"
              type="submit"
              $width="100%"
              testId="submit-profile-button"
              disabled={isSubmitting || !values.lastName || !values.firstName}
            />
          </FormikForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default EditName;
