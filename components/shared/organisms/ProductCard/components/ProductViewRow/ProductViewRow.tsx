import React from 'react';
import plural from 'plural-ru';
import sumBy from 'lodash/sumBy';
import NiceModal from '@ebay/nice-modal-react';
import head from 'lodash/head';

import { dateFormat } from 'helpers';
import { humanizeUnitKind } from 'helpers/suffix';
import { CompanyDirectionEnum } from 'graphql/types';
import { PRODUCT, COMPANY, DASHBOARD_COMPANY_PRODUCT } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Rate from 'components/shared/atoms/Rate';
import Categories from 'components/shared/atoms/Categories';
import ActionLink from 'components/shared/atoms/ActionLink';
import ReviewsModal from 'components/shared/molecules/ReviewsModal';

import ProductImage from '../ProductImage';
import ActionButtons from '../ActionButtons';

import { TProductViewRow } from './types';
import {
  ProductImageWrapper,
  InfoContainer,
  MainSection,
  LeftCol,
  RightCol,
  LeftFlexCol,
  CodeCol,
  CompanyCol,
  DeliveryCol,
  DeliveryText,
  DeliveryCost,
  Name,
  Category,
  Code,
  Company,
  RateContainer,
  RateWrapper,
  LikesWrapper,
  SecondSection,
  Seller,
  Selled,
  RightColPrice,
  ProductPriceWrapper,
  PriceTitle,
  PriceWrapper,
  Price,
  FreeDeliveryCities,
} from './styled';

const ProductViewRow = ({
  product,
  price,
  variant,
  isFavoriteModalShown,
  isUserBuyer,
  refetchProducts,
  view,
}: TProductViewRow) => {
  const {
    id: productId,
    draft,
    template,
    name,
    rating: productRating,
    favoritesCount,
    variants,
    category,
    country,
    manufacturer,
    company: {
      id: companyId,
      unofficialName: companyName = '',
      receivedReviewsCount: companyReceivedReviewsCount,
      rating: companyRating,
      direction,
    },
    receivedReviewsCount: productReviewsCount,
  } = product;

  const isSeller = direction === CompanyDirectionEnum.Seller;
  const productName = name || 'название не выбрано';
  const [firstVariant] = variants;
  const { id: productArticle, expirationDate } = firstVariant || {};

  const showReviewsModal = () => {
    NiceModal.show(ReviewsModal, {
      productId,
      isSeller,
    });
  };

  const productHref = {
    pathname: variant === 'company' ? DASHBOARD_COMPANY_PRODUCT : PRODUCT,
    query: variant === 'company' ? { companyId, productId } : { productId },
  };

  return (
    <>
      <ProductImageWrapper>
        <ProductImage product={product} href={productHref} />
      </ProductImageWrapper>

      <InfoContainer>
        <MainSection>
          <LeftCol>
            <Name title={productName}>
              {draft || template ? (
                <>{productName}</>
              ) : (
                <ActionLink label={productName} href={productHref} bold $color="black" size={14} />
              )}
            </Name>

            <Category>
              <strong>Категория товара:</strong>
              <br />
              {category ? <Categories category={category} /> : 'не выбрана'}
            </Category>

            <RateContainer>
              <RateWrapper>
                <Rate rating={productRating} />
              </RateWrapper>
              <LikesWrapper>
                <Icon name="heart" $color="orange" $size={14} $mr={6} />
                {favoritesCount}
              </LikesWrapper>
              <Selled>{sumBy(variants, 'soldQuantity') ?? 0 ?? 0} Продано</Selled>

              <ActionLink
                onClick={showReviewsModal}
                label={plural(productReviewsCount ?? 0, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
                $ml={8}
              />
            </RateContainer>
          </LeftCol>

          <RightCol>
            <Seller>Продавец: </Seller>

            <ActionLink
              label={companyName}
              href={{ pathname: COMPANY, query: { companyId } }}
              bold
              $color="black"
              size={14}
            />

            <RateContainer>
              <RateWrapper>
                <Rate rating={companyRating} />
              </RateWrapper>
              <ActionLink
                label={plural(companyReceivedReviewsCount, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
                href={{ pathname: COMPANY, query: { companyId } }}
              />
            </RateContainer>
          </RightCol>
        </MainSection>

        <SecondSection>
          <LeftFlexCol>
            <CodeCol>
              <Code>Код товара: {productId}</Code>
              <Code>Артикул товара: {productArticle}</Code>
              {expirationDate && (
                <Code>
                  <strong>Годен до:</strong> {dateFormat(expirationDate)}
                </Code>
              )}
            </CodeCol>
            <CompanyCol>
              <Company>
                <strong>Производитель:</strong> {manufacturer || 'не выбран'}
              </Company>
              <Company>
                <strong>Страна производителя:</strong> {country?.name || 'не указана'}
              </Company>
            </CompanyCol>
            <DeliveryCol>
              <DeliveryText>
                <Icon name="truck" $color="blue" $size={18} $mr={10} />
                Бесплатная доставка
              </DeliveryText>
              <DeliveryCost>От 100 руб</DeliveryCost>
              <FreeDeliveryCities>
                <li>Казань</li>
                <li>Псков</li>
                <li>Москва</li>
              </FreeDeliveryCities>
              <ActionLink
                label="Посмотреть все"
                href={{ pathname: PRODUCT, query: { productId } }}
              />
            </DeliveryCol>
          </LeftFlexCol>

          <RightColPrice>
            <ProductPriceWrapper>
              <PriceTitle>Стоимость товара:</PriceTitle>
              <PriceWrapper>
                <Price>{price}</Price>
                {`руб./${humanizeUnitKind(head(variants)?.unitKind)}`}
              </PriceWrapper>
            </ProductPriceWrapper>

            <ActionButtons
              product={product}
              variant={variant}
              view={view}
              isFavoriteModalShown={isFavoriteModalShown}
              isUserBuyer={isUserBuyer}
              refetchProducts={refetchProducts}
            />
          </RightColPrice>
        </SecondSection>
      </InfoContainer>
    </>
  );
};

export default ProductViewRow;
