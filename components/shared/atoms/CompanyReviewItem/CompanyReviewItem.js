import React from 'react';
import Link from 'next/link';

import Rating from 'components/shared/atoms/Rating';
import ActionLink from 'components/shared/atoms/ActionLink';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import { COMPANY } from 'config/routes';
import { dateAndTimeFormat } from 'helpers';

import {
  ReviewWrapper,
  CompanyInfo,
  ReviewContentWrapper,
  ReviewContent,
  CreatedAtDate,
  ReviewerNameWrapper,
} from './styled';

const CompanyReviewItem = ({ review, isSeller = false, isAdmin = false, isCompany = true }) => {
  const text = isCompany ? 'companyBody' : 'productBody';
  const ratingName = isCompany ? 'companyRating' : 'productRating';
  const { [text]: reviewText, [ratingName]: rating, createdAt, seller, buyer } = review;
  const reviewerCompany = isSeller ? buyer : seller;
  const { officialName: companyName, id: companyId } = reviewerCompany;

  return (
    <ReviewWrapper>
      <CompanyInfo>
        <div>
          {isSeller || isAdmin ? (
            <LogoCompany company={reviewerCompany} $width="4rem" />
          ) : (
            <Link href={{ pathname: COMPANY, query: { companyId } }} passHref>
              <LogoCompany company={reviewerCompany} $width="4rem" />
            </Link>
          )}
        </div>
        <ReviewerNameWrapper>
          <CreatedAtDate>{dateAndTimeFormat(createdAt)}</CreatedAtDate>
          {isSeller || isAdmin ? (
            <b>{companyName}</b>
          ) : (
            <ActionLink
              label={companyName}
              bold
              $color="black"
              size={14}
              href={{ pathname: COMPANY, query: { companyId } }}
            />
          )}
        </ReviewerNameWrapper>
      </CompanyInfo>
      <ReviewContentWrapper>
        <Rating rating={rating} hideRatingCount />
        <ReviewContent>{reviewText}</ReviewContent>
      </ReviewContentWrapper>
    </ReviewWrapper>
  );
};

export default CompanyReviewItem;
