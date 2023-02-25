import React, { useState, useEffect } from 'react';

import { phoneRegularExp, smsCodeRegularExp } from 'config/constants/regularExpressions';
import ErrorDecorator from 'decorators/ErrorDecorator';
import useNotifier from 'hooks/useNotifier';
import useTimer from 'hooks/useTimer';

import Button from 'components/shared/atoms/Button';

import { Wrapper, Input, ErrorWrapper, CodeInputWrapper } from './styled';

const VerificationForm = ({ verificationForm }) => {
  const { onCodeChange, onSendCode, buttonLabel, smsCode, phoneNumber } = verificationForm;
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const isValidPhoneNumber = phoneNumber?.match(phoneRegularExp);

  const [seconds, resetTimer] = useTimer(59);

  const onChange = event => {
    event.preventDefault();
    const { value } = event.target;
    onCodeChange(value);

    const isCodeValid = !value || value.match(smsCodeRegularExp);
    setCodeError(isCodeValid ? false : 'Неверный код');
  };

  const { setError } = useNotifier();

  const onCodeResend = async () => {
    setIsCodeSended(false);
    setIsSubmitting(true);
    try {
      await onSendCode();

      setIsCodeSended(true);
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
    resetTimer();
    setIsSubmitting(false);
  };

  useEffect(() => {
    setIsCodeSended(false);
  }, [phoneNumber]);

  return (
    <Wrapper>
      <Button
        label={
          !isCodeSended
            ? buttonLabel
            : seconds <= 0
            ? 'Отправить код еще раз'
            : `Выслать код повторно через 00:${seconds.toString().padStart(2, '0')}`
        }
        $width="100%"
        disabled={isSubmiting || (isCodeSended && seconds > 0) || !isValidPhoneNumber}
        onClick={onCodeResend}
        testId="verification-button"
      />
      <CodeInputWrapper>
        <Input
          onChange={onChange}
          value={smsCode}
          placeholder="Код"
          name="verification-code"
          data-testid="verification-code-input"
        />
        {codeError && <ErrorWrapper>{codeError}</ErrorWrapper>}
      </CodeInputWrapper>
    </Wrapper>
  );
};

export default VerificationForm;
