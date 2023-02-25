import React from 'react';

import Rate from 'components/shared/atoms/Rate';
import Rating from 'components/shared/atoms/Rating';
import LogoCompany from 'components/shared/atoms/LogoCompany';
import Categories from 'components/shared/atoms/Categories';

import { dateAndTimeFormat } from 'helpers';

import {
  ReviewWrapper,
  RowDetails,
  ProductInfo,
  PhotoProductWrapper,
  PhotoProduct,
  LogoWrapper,
  Row,
  ProductDetails,
  Name,
  Category,
  ProductRateSection,
  ProductCode,
  CreatedAtDate,
  CompanyInfo,
  ReviewContent,
  Text,
  ReviewerNameWrapper,
} from '../styled';

const ProductReviewItem = ({ review, isSeller }) => {
  const {
    product: { id: productId, name: productName, variants, category, rating },
    createdAt,
    seller,
    buyer,
    productRating: reviewRating,
    productBody: reviewText,
  } = review;

  const reviewerCompany = isSeller ? buyer : seller;
  const { officialName: companyName } = reviewerCompany;

  return (
    <ReviewWrapper>
      <RowDetails>
        <ProductInfo>
          <Row>
            <PhotoProductWrapper>
              <PhotoProduct src={variants[0]?.variantPhotos[0]?.imageUrl} />
            </PhotoProductWrapper>
            <ProductDetails>
              <Name>{productName}</Name>
              <Category>
                <strong>Категория товара:</strong>
                <span>
                  <Categories category={category} />
                </span>
              </Category>
            </ProductDetails>
          </Row>
          <ProductRateSection>
            <ProductCode>Код товара: {productId}</ProductCode>
            <Rate rating={rating} />
          </ProductRateSection>
        </ProductInfo>

        <CompanyInfo>
          <ReviewerNameWrapper>
            <CreatedAtDate>{dateAndTimeFormat(createdAt)}</CreatedAtDate>
            <strong>{companyName}</strong>
          </ReviewerNameWrapper>
          <LogoWrapper>
            <LogoCompany company={reviewerCompany} $width="5rem" />
          </LogoWrapper>
        </CompanyInfo>
      </RowDetails>

      <ReviewContent>
        <Rating rating={reviewRating} hideRatingCount />
        <Text>{reviewText}</Text>
      </ReviewContent>
    </ReviewWrapper>
  );
};

export default ProductReviewItem;
