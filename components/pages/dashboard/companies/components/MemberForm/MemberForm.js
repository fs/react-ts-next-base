import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import { getCompanyDirection } from 'config/constants/directions';

import Button from 'components/shared/atoms/Button';
import Checkbox from 'components/shared/atoms/Checkbox';
import Input from 'components/shared/atoms/Input';

import {
  ButtonSubmitWrapper,
  CheckboxesTitle,
  CheckboxesWrapper,
  ErrorWrapper,
  InputsTitle,
  Subscription,
  Title,
  DirectionWrapper,
  Separator,
} from './styled';

const MemberForm = ({ form, checkedCompanies, setCheckedCompanies, companiesList }) => {
  const {
    title,
    submitLabel,
    checkboxTitle,
    subscription,
    fields,
    initialValues = {},
    validationSchema,
    onSubmit,
  } = form;

  const checkboxes = companiesList.map(
    ({ id, direction, officialName, legalForm: { shortName: legalFormShortName } }) => ({
      name: id,
      label: (
        <>
          <span>
            {legalFormShortName} “{officialName}”
          </span>
          <Separator />
          <DirectionWrapper type={direction}>{getCompanyDirection(direction)}</DirectionWrapper>
        </>
      ),
    }),
  );

  const onChangeCheckbox = (id, value) => {
    setCheckedCompanies(checkboxesChecked =>
      checkboxesChecked.map(item => ({ ...item, checked: item.id === id ? value : item.checked })),
    );
  };

  return (
    <>
      <Title data-testid="member-modal-title" data-cy="member-modal-title">
        {title}
      </Title>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, status }) => (
          <FormikForm>
            {fields && (
              <>
                <InputsTitle>e-mail пользователя</InputsTitle>

                {fields.map((field, i) => {
                  const { type, name, placeholder } = field;

                  return (
                    <Input
                      key={i}
                      type={type}
                      name={name}
                      testId={name}
                      placeholder={placeholder}
                    />
                  );
                })}
              </>
            )}

            <CheckboxesTitle>{checkboxTitle}</CheckboxesTitle>

            <CheckboxesWrapper>
              {checkboxes.map(({ name, label }) => (
                <Checkbox
                  checked={checkedCompanies.find(({ id }) => id === name).checked}
                  key={name}
                  name={`company-${name}`}
                  label={label}
                  onChange={value => onChangeCheckbox(name, value)}
                />
              ))}
            </CheckboxesWrapper>

            {subscription && <Subscription>{subscription}</Subscription>}

            <ButtonSubmitWrapper>
              <Button
                label={submitLabel}
                type="submit"
                testId="add-user-submit-button"
                isLoading={isSubmitting}
                disabled={isSubmitting || !checkedCompanies.some(({ checked }) => checked)}
                $mt={24}
              />
            </ButtonSubmitWrapper>

            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default MemberForm;
