import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { productSortValues } from 'config/constants/productSortValues';
import { LightWrapper, Wrapper } from './styled';

import Sorter from '../index';

export default {
  title: 'atoms/Sorter',
  component: Sorter,
  args: {
    variant: 'default',
    $width: '15rem',
    options: productSortValues,
  },
} as ComponentMeta<typeof Sorter>;

const Template: ComponentStory<typeof Sorter> = args => <Sorter {...args} />;

export const Demo = Template.bind({});

export const Variant: ComponentStory<typeof Sorter> = args => {
  return (
    <>
      <LightWrapper>
        <Sorter {...args} variant="default" />
      </LightWrapper>
      <Wrapper>
        <Sorter {...args} variant="light" />
      </Wrapper>
    </>
  );
};
