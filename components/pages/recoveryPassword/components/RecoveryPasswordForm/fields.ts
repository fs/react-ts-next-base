import * as Yup from 'yup';

import { EMAIL_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';

export const initialValues = {
  email: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email(EMAIL_INVALID).max(255).required(REQUIRED_FIELD),
});
