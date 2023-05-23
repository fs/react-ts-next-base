import { useEffect } from 'react';
import * as Yup from 'yup';

import useNotifier from 'hooks/useNotifier';
import { usePasswordRecovery } from 'lib/apollo/hooks/actions/auth';

import { EMAIL_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';

import Form, { FormFieldType } from 'components/shared/molecules/Form';

import { TFormValues } from './types';

const RecoveryPasswordForm = () => {
  const [recoveryPassword, detailMessage] = usePasswordRecovery();
  const { setInfo } = useNotifier();

  useEffect(() => {
    if (detailMessage) setInfo(detailMessage);
  }, [detailMessage]);

  const form = {
    fields: [
      {
        type: FormFieldType.text,
        name: 'email',
        title: 'Email',
        placeholder: 'Email',
        testId: 'input-email',
        initialValue: '',
        validationSchema: Yup.string().email(EMAIL_INVALID).max(255).required(REQUIRED_FIELD),
      },
      {
        type: FormFieldType.submit,
        name: 'Submit',
        testId: 'submit-button',
      },
    ],
    onSubmit: async (values: TFormValues) => {
      await recoveryPassword(values);
    },
  };

  return <Form form={form} $width="20rem" />;
};

export default RecoveryPasswordForm;
