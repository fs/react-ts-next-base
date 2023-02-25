import React, { useEffect, useState } from 'react';

import ErrorDecorator from 'decorators/ErrorDecorator';
import { phoneRegularExp } from 'config/constants/regularExpressions';
import useNotifier from 'hooks/useNotifier';

import { useSendSmsCode } from 'lib/apollo/hooks/actions/auth';
import Button from 'components/shared/atoms/Button';

import CodeConfirmationInput from './CodeConfirmationInput';
import { Wrapper } from './styled';

const PhoneVerificationForm = ({ phoneNumber, onSmsCodeChange }) => {
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sendSmsCode] = useSendSmsCode();
  const { setError } = useNotifier();

  const isValidPhoneNumber = phoneNumber?.match(phoneRegularExp);

  const onPhoneSubmit = async () => {
    try {
      setIsSubmitting(true);

      await sendSmsCode(phoneNumber);

      setIsSubmitting(false);
      setIsCodeSended(true);
    } catch (err) {
      const errorMessage = new ErrorDecorator(err);
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsCodeSended(false);
  }, [phoneNumber]);

  return (
    <Wrapper>
      {!isCodeSended ? (
        <Button
          label="ПРИСЛАТЬ КОД"
          $width="12.5rem"
          disabled={isSubmitting || !isValidPhoneNumber}
          onClick={onPhoneSubmit}
          testId="phoneVerification"
          isLoading={isSubmitting}
        />
      ) : (
        <CodeConfirmationInput
          onSmsCodeChange={onSmsCodeChange}
          setIsCodeSended={setIsCodeSended}
        />
      )}
    </Wrapper>
  );
};

export default PhoneVerificationForm;
