import React from 'react';
import Link from 'next/link';

import { ADMIN_COMPANY, COMPANY } from 'config/routes';

import { useUpdateCustomerProductReview } from 'lib/apollo/hooks/actions/review';

import Rate from 'components/shared/atoms/Rate';
import Rating from 'components/shared/atoms/Rating';
import ActionLink from 'components/shared/atoms/ActionLink';
import Categories from 'components/shared/atoms/Categories';
import LogoCompany from 'components/shared/atoms/LogoCompany';
import ReviewComment from 'components/shared/atoms/ReviewComment';

import {
  Wrapper,
  ImageWrapper,
  Logo,
  ProductWrapper,
  ProductInfo,
  SellerInfoWrapper,
  Name,
  CategoriesWrapper,
  ProductCode,
  ProductDetails,
  SellerName,
  Product,
  Buyer,
  BuyerInfo,
  LogoWrapper,
  Code,
  CommentSection,
} from './styled';

const ProductReview = ({ review, editable, isAdminPage }) => {
  const {
    productBody,
    productRating,
    id: reviewId,
    product: { category, id, rating, name },
    seller,
    variant: { variantPhotos },
    buyer,
  } = review;

  const { unofficialName: sellerUnofficialName, id: sellerId } = seller;
  const { unofficialName: buyerUnofficialName, id: buyerId } = buyer;

  const [updateReview] = useUpdateCustomerProductReview({ reviewId });
  const route = isAdminPage ? ADMIN_COMPANY : COMPANY;

  return (
    <Wrapper data-testid="product-review-item">
      <Product>
        <ProductWrapper>
          <ImageWrapper>
            <Logo src={variantPhotos[0]?.imageUrl} />
          </ImageWrapper>
          <ProductInfo>
            <Name> {name} </Name>
            <ProductDetails>
              <CategoriesWrapper>
                <strong>Категория товара:</strong>
                <br />
                {category ? <Categories category={category} /> : 'не выбрана'}
              </CategoriesWrapper>
              <ProductCode>
                <Code>Код товара: {id}</Code>
                <Rate rating={rating} />
              </ProductCode>
            </ProductDetails>
          </ProductInfo>
        </ProductWrapper>
        <SellerInfoWrapper>
          <SellerName>
            Продавец:
            <br />
            <ActionLink
              label={sellerUnofficialName}
              href={{ pathname: route, query: { companyId: sellerId } }}
              bold
              size={14}
              $color="black"
            />
          </SellerName>
          <LogoWrapper>
            <Link href={{ pathname: route, query: { companyId: sellerId } }}>
              <LogoCompany $width="5rem" company={seller} />
            </Link>
          </LogoWrapper>
        </SellerInfoWrapper>
      </Product>
      <CommentSection>
        <Buyer>
          <BuyerInfo>
            {isAdminPage ? (
              <Link href={{ pathname: route, query: { companyId: buyerId } }}>
                <LogoCompany $width="3rem" company={buyer} />
              </Link>
            ) : (
              <LogoCompany $width="3rem" company={buyer} />
            )}
            <div>
              <span> Покупатель: </span>
              {isAdminPage ? (
                <ActionLink
                  label={buyerUnofficialName}
                  href={{ pathname: route, query: { companyId: buyerId } }}
                  bold
                  size={14}
                  $color="black"
                />
              ) : (
                <Name> {buyerUnofficialName} </Name>
              )}
            </div>
          </BuyerInfo>
          <div>
            Оценка:
            <Rating hideRatingCount rating={productRating} />
          </div>
        </Buyer>
        <ReviewComment editable={editable} reviewBody={productBody} updateReview={updateReview} />
      </CommentSection>
    </Wrapper>
  );
};

export default ProductReview;
