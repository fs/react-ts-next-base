import React, { useState, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';

import { useProducts } from 'lib/apollo/hooks/state/products';

import { RATING } from 'config/constants/orders';

import Slider from 'components/shared/molecules/Slider';
import ProductCard from 'components/shared/organisms/ProductCard';

import { ProductsList, ProductWrapper } from './styled';

const ProductsSlider = () => {
  const [windowWidth, setWindowWidth] = useState(1024);

  const { products } = useProducts({
    orderBy: RATING,
    first: 12,
  });

  const slideItemsAmount = useMemo(() => {
    if (windowWidth < 800) return 2;
    if (windowWidth < 1024) return 3;
    return 4;
  }, [windowWidth]);

  useEffect(() => {
    const widthHandler = throttle(() => setWindowWidth(window.innerWidth), 200);
    window.addEventListener('resize', widthHandler);
    widthHandler();
    return () => window.removeEventListener('resize', widthHandler);
  }, []);

  const slides = [];
  for (let i = 0; i < products.length; i += slideItemsAmount) {
    slides.push(
      <ProductsList key={i}>
        {products.slice(i, i + slideItemsAmount).map(product => {
          return (
            <ProductWrapper key={product.id}>
              <ProductCard product={product} />
            </ProductWrapper>
          );
        })}
      </ProductsList>,
    );
  }

  return <Slider>{slides}</Slider>;
};

export default ProductsSlider;
