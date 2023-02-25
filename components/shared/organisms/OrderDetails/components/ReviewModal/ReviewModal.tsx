import React, { useState } from 'react';
import Link from 'next/link';

import { COMPANY } from 'config/routes';

import ModalWindow from 'components/shared/atoms/ModalWindow';
import Button from 'components/shared/atoms/Button';
import Rating from 'components/shared/atoms/Rating';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import ActionLink from 'components/shared/atoms/ActionLink';
import ReviewForm from './ReviewForm';
import { TReviewModal } from './types';
import {
  ModalWrapper,
  ModalHeader,
  CompanyInfo,
  LogoWrapper,
  CompanyName,
  OfficialName,
  CompanyRating,
} from './styled';

const ReviewModal = ({ order }: TReviewModal) => {
  const { id: orderId, seller } = order;

  const {
    id: sellerId,
    unofficialName,
    officialName: officialSellerName,
    rating,
    legalForm: { shortName: legalFormShortName },
  } = seller;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const openModal = () => setIsModalVisible(true);

  return (
    <>
      <Button label="Оставить отзыв" onClick={openModal} testId="review-modal-button" />

      <ModalWindow isOpen={isModalVisible} setIsOpen={closeModal} $width="35rem" padding={0}>
        <ModalWrapper>
          <ModalHeader>Оставить отзыв</ModalHeader>

          <CompanyInfo>
            <LogoWrapper>
              <Link href={{ pathname: COMPANY, query: { companyId: sellerId } }} passHref>
                <LogoCompany company={seller} />
              </Link>
            </LogoWrapper>
            <CompanyName>
              <ActionLink
                label={unofficialName}
                href={{ pathname: COMPANY, query: { companyId: sellerId } }}
                $color="black"
                bold
                size={16}
              />
              <OfficialName>
                Юридическое лицо: {legalFormShortName} “{officialSellerName}”
              </OfficialName>
            </CompanyName>
            <CompanyRating>
              <Rating rating={rating || 0} />
            </CompanyRating>
          </CompanyInfo>

          <ReviewForm closeModal={closeModal} orderId={orderId} />
        </ModalWrapper>
      </ModalWindow>
    </>
  );
};

export default ReviewModal;
