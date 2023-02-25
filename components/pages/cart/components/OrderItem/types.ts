import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

export type TOrderItem = {
  order: OrderInfoFragment;
  companyBuyerName?: string;
  companyId?: string;
  refetchAfterDestroy?: () => void;
};

type TFormValues = {
  summaryCount: number;
};

type TForm = {
  initialValues: TFormValues;
  onSubmit: (values: TFormValues) => void;
};

export type TOrderItemForm = {
  form: TForm;
  order: OrderInfoFragment;
  companyBuyerName?: string;
  showDestroyOrder: () => void;
  loadingQuantity: boolean;
  onChangeOrderQuantity: (count: number) => void;
};
