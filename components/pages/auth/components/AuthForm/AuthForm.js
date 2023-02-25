import React from 'react';
import useRouter from 'hooks/useRouter';

import Tabs from 'components/shared/molecules/Tabs';

import LoginFormContent from './LoginFormContent';
import RegistrationFormContent from './RegistrationFormContent';
import { FormWrapper } from './styled';

const config = {
  signin: 'signin',
  signup: 'signup',
};

const AuthForm = ({ isSignUp }) => {
  const { pushRoute } = useRouter();

  const TABS = [
    {
      id: config.signin,
      name: 'Войти',
      content: <LoginFormContent />,
      action: () => pushRoute({ query: { [config.signin]: true } }),
    },
    {
      id: config.signup,
      name: 'Регистрация',
      content: <RegistrationFormContent />,
      action: () => pushRoute({ query: { [config.signup]: true } }),
    },
  ];

  return (
    <FormWrapper>
      <Tabs
        tabs={TABS}
        activeId={isSignUp ? config.signup : config.signin}
        variant="flat"
        withTransition
      />
    </FormWrapper>
  );
};

export default AuthForm;
