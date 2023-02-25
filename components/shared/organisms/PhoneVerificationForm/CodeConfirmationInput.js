import React, { useState } from 'react';

import useTimer from 'hooks/useTimer';
import { smsCodeRegularExp } from 'config/constants/regularExpressions';

import { Input, ErrorWrapper, FakeLink } from './styled';

const CodeConfirmationInput = ({ onSmsCodeChange, setIsCodeSended }) => {
  const [codeError, setCodeError] = useState(false);

  const [seconds, resetTimer] = useTimer(59);

  const onCodeChange = event => {
    event.preventDefault();
    const { value } = event.target;
    onSmsCodeChange(value);

    const isCodeValid = !value || value.match(smsCodeRegularExp);
    setCodeError(isCodeValid ? false : 'Неверный код');
  };

  const onCodeResend = () => {
    setIsCodeSended(false);
    resetTimer();
  };

  return (
    <>
      <Input onChange={onCodeChange} data-cy="codeInput" data-testid="codeInput" />
      {codeError ? (
        <ErrorWrapper>{codeError}</ErrorWrapper>
      ) : (
        <>
          {seconds <= 0 ? (
            <FakeLink onClick={onCodeResend}>Отправить код еще раз</FakeLink>
          ) : (
            <FakeLink>Отправить код через 0:{`${seconds}`.padStart(2, '0')}</FakeLink>
          )}
        </>
      )}
    </>
  );
};

export default CodeConfirmationInput;
