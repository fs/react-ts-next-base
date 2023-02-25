import React from 'react';

import { brands } from 'config/constants/brands';

import { Wrapper, Header, BrandsList, BrandItem } from './styled';

const PopularBrands = () => {
  return (
    <Wrapper>
      <Header>Популярные бренды</Header>
      <BrandsList>
        {brands.map((brand, i) => (
          <BrandItem key={i}>
            <img src={`${process.env.ASSET_HOST}/images/brands/${brand}`} alt={brand} />
          </BrandItem>
        ))}
      </BrandsList>
    </Wrapper>
  );
};

export default PopularBrands;
