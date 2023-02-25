import React from 'react';

import FilesSection from '../index';
import { urlType } from '../FilesSection';

const mockFiles = [
  {
    id: 128,
    imageUrl: `${process.env.ASSET_HOST}/images/products-mock/product.png`,
  },
  {
    id: 128,
    imageUrl: `${process.env.ASSET_HOST}/images/products-mock/product-2.png`,
  },
];

export default {
  title: 'molecules/FilesSection',
  component: FilesSection,
  argTypes: {
    title: {
      description: 'Title of files row',
      table: {
        type: { summary: 'String' },
      },
    },
    isTitleBold: {
      description: 'Is title bold',
      table: {
        type: { summary: 'Boolean' },
      },
    },
    type: {
      description: 'Type of document',
      table: {
        type: { summary: 'String' },
      },
      control: { type: 'select' },
      options: Object.keys(urlType),
    },
  },
  args: {
    title: 'Документы',
    isTitleBold: false,
    type: 'image',
    files: mockFiles,
  },
};

const Template = args => <FilesSection {...args} />;

export const Demo = Template.bind({});

export const EmptyFilesSection = Template.bind({});
EmptyFilesSection.args = {
  files: [],
};
