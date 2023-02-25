import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Checkbox from 'components/shared/atoms/Checkbox';
import VerificationForm from 'components/shared/molecules/VerificationForm';

import { Wrapper, Title, CheckboxesWrapper } from './styled';

const EditProfileForm = ({
  form,
  verificationForm,
  title: titleForm,
  checkboxes,
  setValue = () => {},
}) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    field: { name: fieldName, title, placeholder },
  } = form;

  const onChangeFieldValue = (value, setFieldValue) => {
    setFieldValue(fieldName, value);
    setValue(value);
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <FormikForm>
            <Title>{titleForm}</Title>

            <Input
              type="text"
              name={fieldName}
              testId={fieldName}
              placeholder={placeholder}
              title={title}
              onChange={({ target: { value } }) => onChangeFieldValue(value, setFieldValue)}
            />

            {verificationForm && <VerificationForm verificationForm={verificationForm} />}

            <Input
              type="password"
              name={`${fieldName}Password`}
              testId={`${fieldName}-password`}
              placeholder="Текущий пароль"
              title="Текущий пароль"
              autoComplete="new-password"
            />

            <CheckboxesWrapper>
              {checkboxes.map(({ name, label, onChange, checked }) => (
                <Checkbox
                  key={name}
                  name={`${fieldName}-${name}`}
                  label={label}
                  onChange={onChange}
                  checked={checked}
                />
              ))}
            </CheckboxesWrapper>

            <Button
              label="Подтвердить"
              type="submit"
              $width="100%"
              testId="submit-button"
              isLoading={isSubmitting}
              disabled={isSubmitting || Object.values(values).some(value => !value)}
            />
          </FormikForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default EditProfileForm;
