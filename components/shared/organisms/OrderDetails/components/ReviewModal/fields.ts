import * as Yup from 'yup';
import { INVALID_COMMENT_LENGTH, REQUIRED_FIELD } from 'config/constants/errorsText';

export type TFormValues = {
  companyRating: number;
  companyBody: string;
  productRating: number;
  productBody: string;
};

export const initialValues = {
  companyRating: 0,
  companyBody: '',
  productRating: 0,
  productBody: '',
};

export const validationSchema = Yup.object().shape({
  companyRating: Yup.number().required(REQUIRED_FIELD).min(1, REQUIRED_FIELD).nullable(),
  companyBody: Yup.string()
    .required(REQUIRED_FIELD)
    .max(500, ({ value }) => INVALID_COMMENT_LENGTH(500, value.length))
    .nullable(),
  productRating: Yup.number().required(REQUIRED_FIELD).min(1, REQUIRED_FIELD).nullable(),
  productBody: Yup.string()
    .required(REQUIRED_FIELD)
    .max(500, ({ value }) => INVALID_COMMENT_LENGTH(500, value.length))
    .nullable(),
});
