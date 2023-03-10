import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';

import useNotifier from 'hooks/useNotifier';
import { usePasswordRecovery } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { TFormValues } from './types';
import { FormContentWrapper } from './styled';
import { initialValues, validationSchema } from './fields';

const RecoveryPasswordForm = () => {
  const [recoveryPassword, detailMessage] = usePasswordRecovery();
  const { setInfo } = useNotifier();

  useEffect(() => {
    if (detailMessage) setInfo(detailMessage);
  }, [detailMessage]);

  const onSubmit = async (values: TFormValues) => {
    await recoveryPassword(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <FormContentWrapper>
            <Input
              name="email"
              type="email"
              title="Email"
              placeholder="Email"
              testId="input-email"
            />
            <Button
              type="submit"
              testId="submit-button"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              label="Submit"
            />
          </FormContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default RecoveryPasswordForm;
