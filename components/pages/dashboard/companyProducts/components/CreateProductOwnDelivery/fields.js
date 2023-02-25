import uniqueId from 'lodash/uniqueId';
import * as Yup from 'yup';
import {
  IMPOSSIBLE,
  INVALID_DAYS_COUNT,
  NECESSARILY,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';

export const getFreeFields = (deliveryCity = {}) => {
  const {
    id = uniqueId,
    city,
    minCost,
    minDays: initialMinDays,
    maxDays: initialMaxDays,
  } = deliveryCity;
  return [
    {
      type: 'hidden',
      name: 'id',
      initialValue: id,
      value: id,
    },
    {
      type: 'select',
      name: 'cityId',
      initialValue: city?.id || '',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'number',
      name: 'minCost',
      initialValue: minCost || '',
      validationSchema: Yup.number().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'number',
      name: 'minDays',
      initialValue: initialMinDays || '',
      validationSchema: Yup.number()
        .when(['maxDays'], (maxDays, schema, { value: minDays }) =>
          minDays > maxDays ? schema.lessThan(maxDays, IMPOSSIBLE) : schema.required(NECESSARILY),
        )
        .min(1, INVALID_DAYS_COUNT)
        .nullable(),
    },
    {
      type: 'number',
      name: 'maxDays',
      initialValue: initialMaxDays || '',
      validationSchema: Yup.number().required(NECESSARILY).min(1, INVALID_DAYS_COUNT).nullable(),
    },
  ];
};
const freeFields = getFreeFields();

export const getPaidFields = (deliveryCity = {}) => {
  const {
    id = uniqueId(),
    city,
    price,
    minWeight: initialMinWeight,
    maxWeight: initialMaxWeight,
    minDays: initialMinDays,
    maxDays: initialMaxDays,
  } = deliveryCity;
  return [
    {
      type: 'hidden',
      name: 'id',
      initialValue: id,
      value: id,
    },
    {
      type: 'select',
      name: 'cityId',
      initialValue: city?.id || '',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'number',
      name: 'price',
      initialValue: price || '',
      validationSchema: Yup.number().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'number',
      name: 'minWeight',
      initialValue: initialMinWeight || '',
      validationSchema: Yup.number()
        .when(['maxWeight'], (maxWeight, schema, { value: minWeight }) =>
          minWeight > maxWeight
            ? schema.lessThan(maxWeight, IMPOSSIBLE)
            : schema.required(NECESSARILY),
        )
        .nullable(),
    },
    {
      type: 'number',
      name: 'maxWeight',
      initialValue: initialMaxWeight || '',
      validationSchema: Yup.number().required(NECESSARILY).nullable(),
    },
    {
      type: 'number',
      name: 'minDays',
      initialValue: initialMinDays || '',
      validationSchema: Yup.number()
        .when(['maxDays'], (maxDays, schema, { value: minDays }) =>
          minDays > maxDays ? schema.lessThan(maxDays, IMPOSSIBLE) : schema.required(NECESSARILY),
        )
        .min(1, INVALID_DAYS_COUNT)
        .nullable(),
    },
    {
      type: 'number',
      name: 'maxDays',
      initialValue: initialMaxDays || '',
      validationSchema: Yup.number().required(NECESSARILY).min(1, INVALID_DAYS_COUNT).nullable(),
    },
  ];
};
const paidFields = getPaidFields();

export const freeDeliveriesValidationSchema = Yup.array().of(
  Yup.object().shape({
    ...freeFields.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.validationSchema }),
      {},
    ),
  }),
);

export const paidDeliveriesValidationSchema = Yup.array().of(
  Yup.object().shape({
    ...paidFields.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.validationSchema }),
      {},
    ),
  }),
);
