import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { mockProduct } from '__tests__/mocks/mockProducts';

import { StatusEnum } from 'graphql/types';
import ProductCard from '../index';
import {
  ProductCardWrapper,
  Title,
  SubTitle,
  ProductRowWrapper,
  ProductTileWrapper,
} from './styled';
import { EVariant } from '../types';

export default {
  title: 'organisms/ProductCard',
  component: ProductCard,
  argTypes: {
    isFavoriteModalShown: {
      description: 'show confirm modal on favorite button click (hearth)',
    },
  },
  args: {
    view: 'tile',
    variant: 'catalog',
    isFavoriteModalShown: false,
    $width: '100%',
    product: mockProduct,
  },
} as ComponentMeta<typeof ProductCard>;

export const Demo: ComponentStory<typeof ProductCard> = args => {
  const { view } = args;
  return <ProductCard {...args} $width={view === 'row' ? '100%' : '16.5rem'} />;
};

export const Variants: ComponentStory<typeof ProductCard> = args => {
  return (
    <>
      <Title>{`view="tile"`}</Title>
      <ProductTileWrapper>
        {Object.values(EVariant).map((variant, index) => (
          <ProductCardWrapper key={index}>
            <SubTitle>{`variant="${variant}"`}</SubTitle>
            <ProductCard {...args} view="tile" $width="16.5rem" variant={variant} />
          </ProductCardWrapper>
        ))}
      </ProductTileWrapper>

      <Title>{`view="row"`}</Title>
      <ProductRowWrapper>
        {Object.values(EVariant).map((variant, index) => (
          <ProductCardWrapper key={index}>
            <SubTitle>{`variant="${variant}"`}</SubTitle>
            <ProductCard {...args} view="row" $width="100%" variant={variant} />
          </ProductCardWrapper>
        ))}
      </ProductRowWrapper>
    </>
  );
};

export const Statuses: ComponentStory<typeof ProductCard> = args => {
  return (
    <>
      <ProductTileWrapper>
        <ProductCardWrapper>
          <SubTitle>{`status="NOT_VERIFIED"`}</SubTitle>
          <ProductCard
            {...args}
            view="tile"
            $width="16.5rem"
            variant="company"
            product={{ ...mockProduct, draft: false, status: StatusEnum.NotVerified }}
          />
        </ProductCardWrapper>

        <ProductCardWrapper>
          <SubTitle>{`status="REJECTED"`}</SubTitle>
          <ProductCard
            {...args}
            view="tile"
            $width="16.5rem"
            variant="company"
            product={{ ...mockProduct, draft: true, status: StatusEnum.Rejected }}
          />
        </ProductCardWrapper>

        <ProductCardWrapper>
          <SubTitle>draft</SubTitle>
          <ProductCard
            {...args}
            view="tile"
            $width="16.5rem"
            variant="company"
            product={{ ...mockProduct, draft: true, status: StatusEnum.NotVerified }}
          />
        </ProductCardWrapper>

        <ProductCardWrapper>
          <SubTitle>{`status="OUT_OF_STOCK"`}</SubTitle>
          <ProductCard
            {...args}
            view="tile"
            $width="16.5rem"
            variant="company"
            product={{ ...mockProduct, draft: false, status: StatusEnum.OutOfStock }}
          />
        </ProductCardWrapper>
      </ProductTileWrapper>
    </>
  );
};
