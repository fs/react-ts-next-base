import { ComponentProps, ReactNode } from 'react';
import type { FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

import * as formFields from './formFields';

// collect object values types
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export enum FormFieldType {
  password = 'password',
  textarea = 'textarea',
  select = 'select',
  checkbox = 'checkbox',
  text = 'text',
  file = 'file',
  submit = 'submit',
  email = 'email',
}

export type BaseFormFieldConfig = {
  type: FormFieldType;
  name: string;
  isSubmitting: boolean;
  label?: string;
  title?: string;
  testId?: string;
  disabled?: boolean;
};

type FormikProps = {
  validationSchema?: Yup.AnySchema;
  initialValue?: unknown;
};

type FieldsUnionPropsTypes = ComponentProps<InferValueTypes<typeof formFields>>;

// (type1|type2) => Omit<type1,'prop1'>|Omit<type1,'prop1'>
// @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
// eslint-disable-next-line
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type FormFieldConfig = DistributiveOmit<FieldsUnionPropsTypes, 'isSubmitting'> & FormikProps;

export type FormType<TFormValues extends FormikValues = FormikValues> = {
  fields: FormFieldConfig[];
  onSubmit: (
    values: TFormValues,
    formikHelpers: FormikHelpers<TFormValues>,
  ) => void | Promise<void>;
};

export type TDefaultFieldWrapper = {
  name: BaseFormFieldConfig['name'];
  title: BaseFormFieldConfig['title'];
  children: ReactNode;
};
