import * as Yup from 'yup';

import {
  EMAIL_INVALID,
  INVALID_FORMAT,
  PASSWORD_INVALID_FORMAT,
  PASSWORD_INVALID_LENGTH,
  PHONE_INVALID,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { passwordRegularExp, phoneRegularExp } from 'config/constants/regularExpressions';

export const initialValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  phoneNumber: '+7',
  email: '',
  password: '',
  smsCode: '',
};

export const validationSchema = Yup.object().shape({
  lastName: Yup.string().required(REQUIRED_FIELD),
  firstName: Yup.string().required(REQUIRED_FIELD),
  middleName: Yup.string(),
  phoneNumber: Yup.string().matches(phoneRegularExp, PHONE_INVALID).required(REQUIRED_FIELD),
  email: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
  smsCode: Yup.string(),
  password: Yup.string()
    .required(REQUIRED_FIELD)
    .trim()
    .min(6, PASSWORD_INVALID_LENGTH)
    .matches(passwordRegularExp, PASSWORD_INVALID_FORMAT),
  checkboxes: Yup.object().test(
    'correct',
    INVALID_FORMAT,
    value => !Object.values(value).some(checked => !checked),
  ),
});
