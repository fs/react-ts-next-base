import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { EVariant } from 'components/shared/organisms/CreateDisputeProposalForm/types';

export type TProposalFormFields = {
  order: OrderInfoFragment;
  variant?: `${EVariant}`;
};

type TRefund = {
  name: string;
  title: string;
  tooltip: string;
  inputTitle: string;
};

export type TAmountRefund = {
  maxAmount: number;
  refund: TRefund;
};
