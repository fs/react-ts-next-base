import { VariantFragment } from 'graphql/fragments/__generated__/variantInfo.generated';

export type TOrderSummary = {
  itemPrice?: number | null;
  summaryCount: number;
  onChangeOrderQuantity?: (count: number) => void;
  loadingQuantity: boolean;
  variant: VariantFragment;
};
