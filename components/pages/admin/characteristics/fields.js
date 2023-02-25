import * as Yup from 'yup';
import { INVALID_LENGTH, REQUIRED_FIELD } from 'config/constants/errorsText';
import { PROPERTY_TYPE } from 'config/constants/properties';
import { isNil } from 'lodash';

export const fields = {
  displayName: 'displayName',
  name: 'name',
  type: 'type',
  checkedUnit: 'checkedUnit',
  unitName: 'unitName',
  selectors: 'selectors',
};

export const initialValues = {
  [fields.displayName]: '',
  [fields.name]: '',
  [fields.type]: '',
  [fields.checkedUnit]: false,
  [fields.unitName]: '',
  [fields.selectors]: [{ name: '' }],
  parentIdDepth0: '',
};
export const validationSchema = Yup.object().shape({
  [fields.displayName]: Yup.string().required(REQUIRED_FIELD).max(30, INVALID_LENGTH(30)),
  [fields.name]: Yup.string().required(REQUIRED_FIELD).max(100, INVALID_LENGTH(100)),
  [fields.type]: Yup.string().required(REQUIRED_FIELD).nullable(),
  [fields.selectors]: Yup.array().when(fields.type, {
    is: type => type === PROPERTY_TYPE.DICTIONARY_PROPERTY,
    then: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(REQUIRED_FIELD).max(20, INVALID_LENGTH(20)),
      }),
    ),
  }),
  [fields.unitName]: Yup.string().when([fields.type, fields.checkedUnit], {
    is: (type, checkedUnit) => type === PROPERTY_TYPE.INTEGER_PROPERTY && checkedUnit,
    then: Yup.string().required(REQUIRED_FIELD).max(20, INVALID_LENGTH(20)),
  }),
  parentIdDepth0: Yup.string().when(['parentIdDepth1', 'parentIdDepth2', 'parentIdDepth3'], {
    is: (parentIdDepth1, parentIdDepth2, parentIdDepth3) => {
      return isNil(parentIdDepth1) && isNil(parentIdDepth2) && isNil(parentIdDepth3);
    },
    then: Yup.string().required(REQUIRED_FIELD).nullable(),
  }),
});
