import React from 'react';

import { mockProductReviews } from '__tests__/mocks/mockProductReviews';
import ProductReview from '../ProductReview';

export default {
  title: 'molecules/ProductReview',
  component: ProductReview,
  argTypes: {
    review: {
      description: 'Product review item',
      table: {
        type: { summary: 'Object' },
      },
    },
    showEditButton: {
      description: 'Show button for review edit or not',
      table: {
        type: { summary: 'Boolean' },
      },
    },
  },
  args: {
    review: mockProductReviews[0],
    showEditButton: false,
  },
};

const Template = args => <ProductReview {...args} />;

export const Demo = Template.bind({});
