import React, { useState, useRef } from 'react';

import useCurrentUser from 'hooks/useCurrentUser';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';

import { DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';
import { directions } from './constants';

import ProductPhotos from '../ProductPhotos';
import ProductSellerInfo from '../ProductSellerInfo';
import ProductCardForm from '../ProductCardForm';

import { ProductContentWrapper, Col, BreadcrumbsWrapper, ColContent } from './styled';

const ProductContent = ({ product = {}, loading, defaultUrl }) => {
  const { isRegisteredUser, isUserBuyer } = useCurrentUser();

  const { variants, company } = product;

  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [scroll, setScroll] = useState(0);
  const refThumbnails = useRef(null);
  const photoWidth = 82;
  const shownThumbnails = Math.floor((refThumbnails.current?.clientWidth + 8) / photoWidth) || 6;
  const scrolledPhotos = Math.round(scroll / photoWidth);

  const onSelectThumbnail = direction => {
    setSelectedPhoto(index => (direction === directions.LEFT ? index - 1 : index + 1));
    if (direction === directions.RIGHT && selectedPhoto + 2 >= shownThumbnails + scrolledPhotos) {
      refThumbnails.current.scrollLeft = scroll + photoWidth;
    } else if (direction === directions.LEFT && selectedPhoto - 1 <= scrolledPhotos) {
      refThumbnails.current.scrollLeft = scroll - photoWidth;
    }
  };

  const onSelectProperty = photoIdx => {
    setSelectedPhoto(photoIdx);
    if (photoIdx >= shownThumbnails + scrolledPhotos || photoIdx <= scrolledPhotos) {
      refThumbnails.current.scrollLeft = photoIdx * photoWidth;
    }
  };

  return (
    <ProductContentWrapper>
      <Col>
        {loading ? (
          <Loader />
        ) : (
          <>
            <BreadcrumbsWrapper>
              <Breadcrumbs
                url={defaultUrl}
                variant="secondary"
                back
                text="Вернуться назад"
                params={defaultUrl === DASHBOARD_COMPANY_PRODUCTS ? { companyId: company?.id } : {}}
              />
            </BreadcrumbsWrapper>
            <ColContent>
              <ProductPhotos
                variants={variants}
                selectedPhoto={selectedPhoto}
                setSelectedPhoto={setSelectedPhoto}
                refThumbnails={refThumbnails}
                setScroll={setScroll}
                onSelectThumbnail={onSelectThumbnail}
                isFavoritesShown={isUserBuyer && !company?.myRole}
                product={product}
              />
              <ProductSellerInfo
                company={company}
                question={isRegisteredUser && !company?.myRole}
              />
            </ColContent>
          </>
        )}
      </Col>
      <Col>
        {loading ? (
          <Loader />
        ) : (
          <ProductCardForm product={product} onSelectProperty={onSelectProperty} />
        )}
      </Col>
    </ProductContentWrapper>
  );
};

export default ProductContent;
