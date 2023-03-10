import * as Yup from 'yup';

import {
  EMAIL_INVALID,
  PASSWORD_INVALID_FORMAT,
  PASSWORD_INVALID_LENGTH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { passwordRegularExp } from 'config/constants/regularExpressions';

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(REQUIRED_FIELD),
  lastName: Yup.string().required(REQUIRED_FIELD),
  email: Yup.string().email(EMAIL_INVALID).max(255).required(REQUIRED_FIELD),
  password: Yup.string()
    .required(REQUIRED_FIELD)
    .trim()
    .min(6, PASSWORD_INVALID_LENGTH)
    .matches(passwordRegularExp, PASSWORD_INVALID_FORMAT),
});
