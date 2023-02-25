import React from 'react';

import { COMPANY } from 'config/routes';
import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';

import Rating from 'components/shared/atoms/Rating';
import ActionLink from 'components/shared/atoms/ActionLink';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import {
  CartHeaderContainer,
  Content,
  Info,
  CompanyLogoWrapper,
  RatingWrapper,
  Col,
  CompanyInfoWrapper,
  Name,
} from './styled';

type TCartHeader = { sellerCompany: CompanyInfoFragment; companyId: string };

const CartHeader = ({ sellerCompany, companyId }: TCartHeader) => {
  const { unofficialName, rating, receivedReviewsCount } = sellerCompany;
  return (
    <CartHeaderContainer>
      <Content>
        <Info>
          <CompanyLogoWrapper>
            <LogoCompany company={sellerCompany} />
          </CompanyLogoWrapper>

          <CompanyInfoWrapper>
            <Name>{unofficialName}</Name>
            <RatingWrapper>
              <Rating rating={rating || 0} />
              <Col>Количество отзывов: {receivedReviewsCount}</Col>
              <Col>
                <ActionLink
                  label="Читать отзывы на эту компанию"
                  $color="white"
                  size={16}
                  href={{ pathname: COMPANY, query: { companyId, reviews: true } }}
                />
              </Col>
            </RatingWrapper>
          </CompanyInfoWrapper>
        </Info>
      </Content>
    </CartHeaderContainer>
  );
};

export default CartHeader;
