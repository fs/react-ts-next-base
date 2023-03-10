import * as Yup from 'yup';

import { EMAIL_INVALID, REQUIRED_FIELDS } from 'config/constants/errorsText';

export const initialValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email(EMAIL_INVALID).max(255).required(REQUIRED_FIELDS),
  password: Yup.string().required(REQUIRED_FIELDS),
});
