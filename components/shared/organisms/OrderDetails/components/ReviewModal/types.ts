import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type TRatingInput = {
  name: string;
};

export type TReviewForm = {
  closeModal: () => void;
  orderId: string;
};

export type TReviewModal = {
  order: OrderInfoFragment;
};
