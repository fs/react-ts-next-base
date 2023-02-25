import * as Yup from 'yup';

import { DisputeProposalReturnPayerEnum } from 'graphql/types';
import { INVALID_COMMENT_LENGTH, REQUIRED_FIELD } from 'config/constants/errorsText';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { TFormValues } from './types';

export const validationSchema = Yup.object().shape({
  dispute: Yup.object().shape({
    productDelivered: Yup.boolean().required(REQUIRED_FIELD).nullable(),
    reason: Yup.string().required(REQUIRED_FIELD).nullable(),
    comment: Yup.string()
      .max(800, ({ value }) => INVALID_COMMENT_LENGTH(800, value.length))
      .nullable(),
    attachments: Yup.array(),
  }),
  proposal: Yup.object().shape({
    returnRequired: Yup.boolean().required(REQUIRED_FIELD).nullable(),
    returnQuantity: Yup.number().nullable(),
    productReturnAmount: Yup.number().required(REQUIRED_FIELD).nullable(),
    deliveryReturnAmount: Yup.number().nullable(),
    returnPayer: Yup.string().required(REQUIRED_FIELD).nullable(),
  }),
});

export const getInitialValues = (order: OrderInfoFragment): TFormValues => {
  const { quantity, itemPrice, deliveryPrice } = order;
  return {
    dispute: {
      productDelivered: true,
      reason: undefined,
      comment: '',
      attachments: [],
    },
    proposal: {
      returnRequired: true,
      returnQuantity: quantity,
      productReturnAmount: itemPrice ? quantity * itemPrice : 0,
      deliveryReturnAmount: deliveryPrice,
      returnPayer:
        deliveryPrice === 0
          ? DisputeProposalReturnPayerEnum.Buyer
          : DisputeProposalReturnPayerEnum.Seller,
    },
  };
};
