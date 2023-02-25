import React from 'react';
import Link from 'next/link';

import { AGREEMENT } from 'config/routes';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import RegistrationForm from 'components/shared/molecules/RegistrationForm';

import { useSignUpFromCart } from 'lib/apollo/hooks/actions/auth';
import { Title } from './styled';

const SignUpFromCartModal = NiceModal.create(() => {
  const { visible, hide } = useModal();
  const [signUpFromCart] = useSignUpFromCart({ onSubmit: hide });

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
    <ModalWindow isOpen={visible} setIsOpen={hide} $width="50rem" padding="2.375rem 4.125rem">
      <Title> Заполните форму, чтобы создать ваш личный кабинет </Title>
      <RegistrationForm checkboxes={checkboxes} action={signUpFromCart} />
    </ModalWindow>
  );
});

export default SignUpFromCartModal;
