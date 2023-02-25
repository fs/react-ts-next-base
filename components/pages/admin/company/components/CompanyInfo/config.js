import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

export const initialReasonForBun = {
  reason: '',
};

export const validationSchemaReasonForBun = Yup.object().shape({
  reason: Yup.string().required(REQUIRED_FIELD),
});
