import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { mockProduct } from '__tests__/mocks/mockProducts';

import { StatusEnum } from 'graphql/types';
import ProductCardSimple from '../index';
import { ProductCardWrapper, Title, SubTitle, Row } from './styled';

export default {
  title: 'organisms/ProductCardSimple',
  component: ProductCardSimple,
  argTypes: {},
  args: {
    variant: 'default',
    product: mockProduct,
  },
} as ComponentMeta<typeof ProductCardSimple>;

export const Demo: ComponentStory<typeof ProductCardSimple> = args => {
  return (
    <ProductCardWrapper>
      <ProductCardSimple {...args} />
    </ProductCardWrapper>
  );
};

export const Variants: ComponentStory<typeof ProductCardSimple> = args => {
  return (
    <>
      <Title>{`variant="default"`}</Title>
      <Row>
        <ProductCardWrapper>
          <SubTitle>{`deleted="true"`}</SubTitle>
          <ProductCardSimple {...args} product={{ ...mockProduct, deleted: true }} />
        </ProductCardWrapper>
        <ProductCardWrapper>
          <SubTitle>{`status="REJECTED"`}</SubTitle>
          <ProductCardSimple {...args} product={{ ...mockProduct, status: StatusEnum.Rejected }} />
        </ProductCardWrapper>
        <ProductCardWrapper>
          <SubTitle>{`status="VERIFIED"`}</SubTitle>
          <ProductCardSimple {...args} product={{ ...mockProduct, status: StatusEnum.Verified }} />
        </ProductCardWrapper>
        <ProductCardWrapper>
          <SubTitle>{`status="NOT_VERIFIED"`}</SubTitle>
          <ProductCardSimple
            {...args}
            product={{ ...mockProduct, status: StatusEnum.NotVerified }}
          />
        </ProductCardWrapper>
      </Row>

      <Title>{`variant="admin-priority"`}</Title>
      <Row>
        <ProductCardWrapper>
          <SubTitle>{`prioritized="true"`}</SubTitle>
          <ProductCardSimple
            {...args}
            variant="admin_priority"
            product={{
              ...mockProduct,
              prioritized: true,
              canAddToPriorityList: false,
              canRemoveFromPriorityList: true,
            }}
          />
        </ProductCardWrapper>
        <ProductCardWrapper>
          <SubTitle>{`prioritized="false"`}</SubTitle>
          <ProductCardSimple
            {...args}
            variant="admin_priority"
            product={{
              ...mockProduct,
              prioritized: false,
              canAddToPriorityList: true,
              canRemoveFromPriorityList: false,
            }}
          />
        </ProductCardWrapper>
      </Row>
    </>
  );
};
