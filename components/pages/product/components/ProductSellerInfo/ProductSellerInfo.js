import React from 'react';
import Link from 'next/link';

import { COMPANY } from 'config/routes';

import LogoCompany from 'components/shared/atoms/LogoCompany';
import Rating from 'components/shared/atoms/Rating';
import ActionLink from 'components/shared/atoms/ActionLink';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QuestionSellerModal from 'components/shared/molecules/QuestionSellerModal';

import {
  ProductSellerInfoWrapper,
  Title,
  Row,
  Col,
  LogoWrapper,
  SellerInfo,
  SellerName,
  RatingWrapper,
  CountSellerReviews,
  SellerLinks,
  StyledLink,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  QuestionWrapper,
} from './styled';

const sellerLinks = [
  {
    name: 'seller-review',
    url: COMPANY,
    query: { reviews: true },
    label: 'Читать отзывы о продавце',
  },
  {
    name: 'seller-products',
    url: COMPANY,
    query: { products: true },
    label: 'Посмотреть все товары продавца',
  },
];

const ProductSellerInfo = ({ company = {}, question }) => {
  const { unofficialName, rating, id: companyId, receivedReviewsCount } = company;

  return (
    <ProductSellerInfoWrapper>
      <Title>Информация о продавце товара:</Title>
      <Row question={question}>
        <div>
          <Col>
            <LogoWrapper>
              <Link href={{ pathname: COMPANY, query: { companyId } }} passHref>
                <LogoCompany company={company} />
              </Link>
            </LogoWrapper>
            <SellerInfo>
              <SellerName>
                <ActionLink
                  label={unofficialName}
                  size={14}
                  $color="black"
                  href={{ pathname: COMPANY, query: { companyId } }}
                />
              </SellerName>

              <RatingWrapper>
                <Rating rating={rating} />
              </RatingWrapper>

              <CountSellerReviews>Количество отзывов: {receivedReviewsCount}</CountSellerReviews>
            </SellerInfo>
          </Col>
          {/* https://www.pivotaltracker.com/story/show/184279049 */}
          {/* {question && (
            <QuestionWrapper>
              <QuestionSellerModal />
            </QuestionWrapper>
          )} */}
        </div>

        <SellerLinks question={question}>
          {sellerLinks.map(({ url, label, name, query }, i) => (
            <StyledLink
              data-testid={name}
              data-cy={name}
              $question={question}
              href={{ pathname: url, query: { companyId, ...query } }}
              passHref
              key={i}
            >
              {label}
            </StyledLink>
          ))}
        </SellerLinks>
      </Row>
    </ProductSellerInfoWrapper>
  );
};

export default ProductSellerInfo;
