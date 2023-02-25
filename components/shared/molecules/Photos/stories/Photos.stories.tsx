import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Photos from '../index';

const images = Array(5)
  .fill('')
  .map((_, index) => ({
    id: `${index + 1}`,
    url: `${process.env.ASSET_HOST}/images/products-mock/product-${index + 1}.png`,
    metadata: { filename: 'filename' },
  }));

export default {
  title: 'molecules/Photos',
  component: Photos,
  argTypes: {},
  args: {
    images,
    editable: true,
    zoomable: true,
    loading: false,
    onRemovePhoto: () => {},
  },
} as ComponentMeta<typeof Photos>;

export const Demo: ComponentStory<typeof Photos> = args => {
  return <Photos {...args} />;
};
