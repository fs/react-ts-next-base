import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';

import { useSendSmsCode } from 'lib/apollo/hooks/actions/auth';
import { useCreateWithdrawal } from 'lib/apollo/hooks/actions/companies';
import useCurrentUser from 'hooks/useCurrentUser';
import useTimer from 'hooks/useTimer';

import Button from 'components/shared/atoms/Button';

import {
  ModalPhoneConfirmationWrapper,
  Title,
  InputsWrapper,
  Input,
  ResendCodeWrapper,
  Timer,
} from './styled';

const WITHDRAWAL = 'WITHDRAWAL';
const ModalPhoneConfirmation = ({ accountValues, onCloseModal, companyId }) => {
  const inputs = Array(6).fill(0);
  const refInputs = useRef([]);

  const [sendSmsCode] = useSendSmsCode();
  const [createWithdrawal] = useCreateWithdrawal({ companyId });
  const { user } = useCurrentUser();
  const [seconds, resetTimer] = useTimer(59);

  const onResendCode = async () => {
    await sendSmsCode(user?.phoneNumber);
    resetTimer();
  };

  const onChange = ({ value, index, setFieldValue }) => {
    if (value.length === 1) {
      setFieldValue(`number_${index}`, value);
      if (index >= inputs.length - 1) return;
      refInputs.current[index + 1].focus();
    }
  };

  const onKeyDown = ({ value, key, index, selectionStart, setFieldValue }) => {
    const caretPosition = refInputs.current[index].selectionStart;

    const clearInput = inputIndex => {
      refInputs.current[inputIndex].focus();
      setFieldValue(`number_${inputIndex}`, '');
    };

    if (key === 'Backspace') {
      if (caretPosition === 0) {
        if (index !== 0) clearInput(index - 1);
      } else {
        clearInput(index);
      }
    }

    if (key === 'Delete') {
      if (caretPosition === 1 || !value) {
        if (index !== inputs.length - 1) clearInput(index + 1);
      } else {
        clearInput(index);
      }
    }

    if (key === 'ArrowLeft' && index && selectionStart === 0) {
      refInputs.current[index - 1].focus();
    }
    if (key === 'ArrowRight' && index < inputs.length - 1 && (selectionStart === 1 || !value)) {
      refInputs.current[index + 1].focus();
    }
  };

  const onSubmit = async values => {
    const confirmationCode = Object.values(values).join('');
    const input = {
      ...accountValues,
      transferType: WITHDRAWAL,
      smsCode: confirmationCode,
    };
    await createWithdrawal(input);

    onCloseModal();
  };

  const initialValues = inputs.reduce(
    (obj, _, index) => Object.assign(obj, { [`number_${index}`]: '' }),
    {},
  );

  const validationSchema = Yup.object().shape(
    inputs.reduce(
      (obj, _, index) =>
        Object.assign(obj, {
          [`number_${index}`]: Yup.string().required().nullable(),
        }),
      {},
    ),
  );

  useEffect(() => {
    refInputs.current = refInputs.current.slice(0, 6);
    refInputs.current[0].focus();
  }, []);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, values, setFieldValue, errors, touched }) => (
        <FormikForm autoComplete="off">
          <ModalPhoneConfirmationWrapper>
            <Title>
              Введите высланный вам
              <br />
              код по SMS
            </Title>

            <InputsWrapper>
              {inputs.map((_, index) => {
                const name = `number_${index}`;
                return (
                  <Input
                    name={name}
                    data-testid={name}
                    value={values[name] || ''}
                    autoComplete="false"
                    onChange={({ target: { value } }) => onChange({ value, index, setFieldValue })}
                    key={index}
                    ref={el => {
                      refInputs.current[index] = el;
                      return el;
                    }}
                    onKeyDown={({ key, target: { value, selectionStart } }) =>
                      onKeyDown({ value, key, index, selectionStart, setFieldValue })
                    }
                    error={errors[name] && touched[name]}
                  />
                );
              })}
            </InputsWrapper>

            <ResendCodeWrapper>
              {seconds <= 0 ? (
                <Button
                  label="Отправить SMS повторно"
                  variant="hollow-primary"
                  size="small"
                  onClick={onResendCode}
                />
              ) : (
                <Timer>0:{seconds.toString().padStart(2, '0')}</Timer>
              )}
            </ResendCodeWrapper>

            <Button label="Подтвердить" variant="confirm" type="submit" disable={isSubmitting} />
          </ModalPhoneConfirmationWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ModalPhoneConfirmation;
