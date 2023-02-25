import React from 'react';
import Link from 'next/link';

import { useSignUp } from 'lib/apollo/hooks/actions/auth';

import { AGREEMENT } from 'config/routes';

import RegistrationForm from 'components/shared/molecules/RegistrationForm';

import { Wrapper } from './styled';

const RegistrationFormContent = () => {
  const [signUp] = useSignUp();

  const checkboxes = [
    {
      name: 'agreement',
      label: (
        <Link href={AGREEMENT} target="_blank" rel="noreferrer">
          Соглашение с политикой обработки персональных данных
        </Link>
      ),
    },
  ];

  return (
    <Wrapper className="tab">
      <RegistrationForm checkboxes={checkboxes} action={signUp} />
    </Wrapper>
  );
};

export default RegistrationFormContent;
