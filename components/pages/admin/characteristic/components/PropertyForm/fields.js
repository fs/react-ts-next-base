import * as Yup from 'yup';
import { INVALID_LENGTH, REQUIRED_FIELD } from 'config/constants/errorsText';
import { PROPERTY_TYPE } from 'config/constants/properties';

export const fields = {
  displayName: 'displayName',
  name: 'name',
  type: 'type',
  selectors: 'dictionaryPropertyOptions',
};

export const validationSchema = Yup.object().shape({
  [fields.displayName]: Yup.string().required(REQUIRED_FIELD).max(30, INVALID_LENGTH(30)),
  [fields.name]: Yup.string().required(REQUIRED_FIELD).max(100, INVALID_LENGTH(100)),
  [fields.selectors]: Yup.array().when(fields.type, {
    is: type => type === PROPERTY_TYPE.DICTIONARY_PROPERTY,
    then: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(REQUIRED_FIELD).max(20, INVALID_LENGTH(20)),
      }),
    ),
  }),
});
