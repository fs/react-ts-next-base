import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import CompanyContent from './CompanyContent';
import ReviewContent from './ReviewContent';

import { Title, ActionsWrapper } from './styled';
import { TReviewDetailsModal } from './types';

const ReviewDetailsModal = NiceModal.create(({ order }: TReviewDetailsModal) => {
  const { productReview, companyReview, buyer, seller } = order || {};
  const isUserBuyer = !!buyer?.myRole;

  const { visible, hide } = useModal();
  const company = isUserBuyer ? seller : buyer;

  return (
    <ModalWindow isOpen={visible} setIsOpen={hide} $width="37rem" padding={0}>
      <Title>{isUserBuyer ? 'Ваш отзыв о продавце' : 'Отзыв от покупателя'}</Title>
      {company && <CompanyContent company={company} />}
      <ReviewContent companyReview={companyReview} productReview={productReview} />

      <ActionsWrapper>
        <Button label="Вернуться" variant="hollow" onClick={hide} />
      </ActionsWrapper>
    </ModalWindow>
  );
});

export default ReviewDetailsModal;
