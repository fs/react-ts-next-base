import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import { NOT_VERIFIED } from 'config/constants/status';
import { SELLER } from 'config/constants/directions';

import Button from 'components/shared/atoms/Button';
import ConfirmCompanyField from '../ConfirmCompanyField';
import ConfirmCompanyLogo from '../ConfirmCompanyLogo';
import ConfirmConfirmationRecords from '../ConfirmConfirmationRecords';

import { FormWrapper, ActionsWrapper } from './styled';

const ConfirmCompanyForm = ({ form, company }) => {
  const { fields, attachmentFields, initialValues, validationSchema, onSubmit } = form;
  const { logo, companyConfirmationRecords } = attachmentFields;
  const { direction, status } = company;
  const isSeller = direction === SELLER;

  const isEditable = status === NOT_VERIFIED;
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, setFieldValue, values, errors }) => (
        <FormikForm>
          <FormWrapper>
            {fields.map((field, index) => (
              <ConfirmCompanyField
                field={field}
                key={index}
                values={values}
                isEditable={isEditable}
              />
            ))}
          </FormWrapper>

          <ConfirmCompanyLogo logo={logo} name="logo" values={values} isEditable={isEditable} />

          {isSeller && (
            <>
              <ConfirmConfirmationRecords
                name="companyConfirmationRecords"
                companyConfirmationRecords={companyConfirmationRecords}
                values={values}
                isEditable={isEditable}
              />
            </>
          )}

          {isEditable && (
            <ActionsWrapper>
              <Button
                type="submit"
                label="Запросить изменения"
                variant="change"
                shape="rounded"
                testId="request-company-reject"
                disabled={
                  isSubmitting ||
                  Object.values(values.comment).every(value => !value) ||
                  Object.values(errors).length
                }
                onClick={() => setFieldValue('confirm', false)}
              />
              <Button
                type="submit"
                label="Подтвердить"
                variant="confirm"
                shape="rounded"
                testId="request-company-confirm"
                disabled={isSubmitting || Object.values(values.comment).some(value => value)}
                onClick={() => setFieldValue('confirm', true)}
              />
            </ActionsWrapper>
          )}
        </FormikForm>
      )}
    </Formik>
  );
};

export default ConfirmCompanyForm;
