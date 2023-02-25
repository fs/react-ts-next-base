import * as Yup from 'yup';
import { FormikHelpers } from 'formik';
import { ParsedUrlQuery } from 'querystring';

import { ConditionEnum, ProductDraftStepEnum } from 'graphql/types';
import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';

export type TFormValues = {
  condition: ConditionEnum;
  name: string;
  manufacturer: string;
  country: string;
  description: string;
  categories: string[];
};

export type TCreateProductBasic = {
  product?: ProductInfoFragment;
  onSubmitStep?: (step: ProductDraftStepEnum) => void;
  isDraft?: boolean;
  query: ParsedUrlQuery;
  readOnly?: boolean;
};

export type TCreateProductBasicForm = {
  readOnly?: boolean;
  draftStep?: `${ProductDraftStepEnum}` | null;
  initialCountry: ProductInfoFragment['country'];
  form: {
    onSubmit: (values: TFormValues, { setSubmitting }: FormikHelpers<TFormValues>) => void;
    initialValues: TFormValues;
    validationSchema: Yup.AnySchema;
  };
};

export const parseQuery = (query: ParsedUrlQuery) => {
  return {
    companyId:
      Array.isArray(query.companyId) || query.companyId === undefined ? '' : query.companyId,
  };
};
