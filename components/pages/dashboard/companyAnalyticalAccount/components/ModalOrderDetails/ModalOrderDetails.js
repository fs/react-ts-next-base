import React, { useState } from 'react';

import ModalWindow from 'components/shared/atoms/ModalWindow';

import ModalOrderDetailsForm from './ModalOrderDetailsForm';

import { StyledLink } from './styled';

const ModalOrderDetails = ({ company, orderId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);

  return (
    <>
      <StyledLink onClick={onOpenModal}>Заказ № {orderId}</StyledLink>

      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} padding={0}>
        <ModalOrderDetailsForm company={company} orderId={orderId} />
      </ModalWindow>
    </>
  );
};

export default ModalOrderDetails;
