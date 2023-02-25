import React from 'react';
import Link from 'next/link';
import { ADMIN_COMPANY } from 'config/routes';

import { useUpdateCustomerCompanyReview } from 'lib/apollo/hooks/actions/review';

import Rating from 'components/shared/atoms/Rating';
import ActionLink from 'components/shared/atoms/ActionLink';
import LogoCompany from 'components/shared/atoms/LogoCompany';
import ReviewComment from 'components/shared/atoms/ReviewComment';

import {
  Wrapper,
  SellerInfoWrapper,
  SellerName,
  Product,
  Comment,
  CompaniesWrapper,
  RatingWrapper,
  RatingTitle,
} from './styled';

const CompanyReview = ({ review }) => {
  const { companyBody, companyRating, seller, buyer, id: reviewId } = review;
  const { unofficialName: sellerUnofficialName, id: sellerId } = seller;
  const { unofficialName: buyerUnofficialName, id: buyerId } = buyer;

  const [updateReview] = useUpdateCustomerCompanyReview({ reviewId });

  return (
    <Wrapper data-testid="company-review-item">
      <Product>
        <RatingWrapper>
          <RatingTitle> Оценка: </RatingTitle>
          <Rating hideRatingCount rating={companyRating} />
        </RatingWrapper>
        <CompaniesWrapper>
          <SellerInfoWrapper>
            <SellerName>
              Покупатель:
              <br />
              <ActionLink
                label={buyerUnofficialName}
                bold
                size={14}
                $color="black"
                href={{ pathname: ADMIN_COMPANY, query: { companyId: buyerId } }}
              />
            </SellerName>
            <Link href={{ pathname: ADMIN_COMPANY, query: { companyId: buyerId } }}>
              <LogoCompany $width="3.2rem" company={buyer} />
            </Link>
          </SellerInfoWrapper>
          <SellerInfoWrapper>
            <SellerName>
              Продавец:
              <br />
              <ActionLink
                label={sellerUnofficialName}
                bold
                size={14}
                $color="black"
                href={{ pathname: ADMIN_COMPANY, query: { companyId: sellerId } }}
              />
            </SellerName>
            <Link href={{ pathname: ADMIN_COMPANY, query: { companyId: sellerId } }}>
              <LogoCompany $width="3.2rem" company={seller} />
            </Link>
          </SellerInfoWrapper>
        </CompaniesWrapper>
      </Product>
      <Comment>
        <ReviewComment editable updateReview={updateReview} reviewBody={companyBody} />
      </Comment>
    </Wrapper>
  );
};

export default CompanyReview;
