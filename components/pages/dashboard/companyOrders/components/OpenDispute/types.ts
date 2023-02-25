import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { CreateDisputeInput, CreateDisputeProposalInput, DisputeReasonEnum } from 'graphql/types';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

export type TOpenDispute = {
  companyId: string;
  order: OrderInfoFragment;
};

export type TFormValues = {
  proposal: CreateDisputeProposalInput;
  dispute: Omit<CreateDisputeInput, 'reason'> & {
    reason?: DisputeReasonEnum;
  };
};

export type TOpenDisputeForm = {
  order: OrderInfoFragment;
  showCloseDispute: () => void;
  form: {
    onSubmit: (values: TFormValues, { setSubmitting }: FormikHelpers<TFormValues>) => void;
    initialValues: TFormValues;
    validationSchema: Yup.AnySchema;
  };
};
