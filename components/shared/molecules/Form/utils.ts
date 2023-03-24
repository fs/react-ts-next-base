import type { FormikValues } from 'formik';
import * as Yup from 'yup';

import { FormFieldConfig } from './types';

type ValidationSchema = {
  [key: string]: Yup.AnySchema;
};

type FormikProps<FormValues> = {
  initialValues: FormValues;
  validationSchema: ValidationSchema;
};

export const collectFormikProps = <FormValues extends FormikValues = FormikValues>(
  fields: FormFieldConfig[],
): FormikProps<FormValues> => {
  const init: FormikProps<FormValues> = { initialValues: {} as FormValues, validationSchema: {} };
  return fields.reduce((acc, { initialValue, name, validationSchema }) => {
    if (initialValue !== null) {
      acc.initialValues[name as keyof FormValues] = initialValue as FormikValues[typeof name];
    }
    if (validationSchema) {
      acc.validationSchema[name] = validationSchema;
    }
    return acc;
  }, init);
};
