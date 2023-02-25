import React from 'react';

import { AUTH } from 'config/routes';

import Button from 'components/shared/atoms/Button';
import { productsList } from 'config/constants/productsList';

import PromoVideo from './PromoVideo';
import SearchInput from '../SearchInput';

import { PageContainer, Wrapper, Header, Description, ProductsList, Product, Dash } from './styled';

const Promo = ({ query }) => {
  return (
    <PageContainer>
      <PromoVideo />

      <Wrapper>
        <Header>
          ТОРГОВАЯ ПЛОЩАДКА ДЛЯ БИЗНЕСА
          <br />
          МЕЛКИМ, СРЕДНИМ И КРУПНЫМ ОПТОМ
        </Header>

        <Description>
          <p>Цены всегда актуальные и низкие</p>
          <p>Товары всегда качественные и в наличии</p>
          <p>Покупка всегда в 3 клика с доставкой</p>
        </Description>
        <ProductsList>
          {productsList.map((product, index) => (
            <Product key={index}>
              {product}
              {index !== productsList.length - 1 && <Dash>|</Dash>}
            </Product>
          ))}
        </ProductsList>
        <Button
          label="ПРИСОЕДИНИТЬСЯ"
          size="extra-large"
          $width="15.5rem"
          href={{ pathname: AUTH, query: { signup: true } }}
        />
      </Wrapper>
      <SearchInput query={query} />
    </PageContainer>
  );
};

export default Promo;
