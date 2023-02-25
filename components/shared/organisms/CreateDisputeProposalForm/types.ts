import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { CreateDisputeProposalInput } from 'graphql/types';
import { FormikHelpers } from 'formik';

export type TProposalFormValues = {
  proposal: CreateDisputeProposalInput;
};

export enum EVariant {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}

export type TCreateDisputeProposalForm = {
  onSubmit: (values: TProposalFormValues, actions: FormikHelpers<TProposalFormValues>) => void;
  order: OrderInfoFragment;
  onCloseDispute: () => void;
  dispute: DisputeFragment;
  variant: `${EVariant}`;
};

export type getProposalFieldsInput = {
  dispute: DisputeFragment;
  deliveryPrice: number;
  variant: `${EVariant}`;
};
