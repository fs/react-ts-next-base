import * as Yup from 'yup';

import {
  MAX_DISCOUNT,
  MAX_PERCENT,
  MIN_DISCOUNT,
  MIN_PERCENT,
  REQUIRED_FIELD,
  REQUIRED_FIELDS,
} from 'config/constants/errorsText';
import { NO_SALE } from 'config/constants/discount';

export const getFieldsWeeklyDiscounts = (discount = {}) => {
  const { id, amount, weekday } = discount;

  return [
    {
      type: 'hidden',
      name: 'id',
      initialValue: id,
    },
    {
      type: 'number-input',
      name: 'amount',
      initialValue: amount || undefined,
      title: 'Размер скидки',
      placeholder: 'Размер скидки',
      suffix: '%',
      validationSchema: Yup.number()
        .min(0, MIN_PERCENT)
        .max(100, MAX_PERCENT)
        .required(REQUIRED_FIELD),
    },
    {
      type: 'select',
      name: 'weekday',
      initialValue: weekday || undefined,
      title: 'День недели',
      placeholder: 'День недели',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
  ];
};

export const getFieldsPeriodDiscounts = (discount = {}) => {
  const { id, amount, startDate, endDate } = discount;

  return [
    {
      type: 'hidden',
      name: 'id',
      initialValue: id,
    },
    {
      type: 'number-input',
      name: 'amount',
      initialValue: amount || undefined,
      title: 'Размер скидки',
      placeholder: 'Размер скидки',
      suffix: '%',
      validationSchema: Yup.number()
        .min(0, MIN_PERCENT)
        .max(100, MAX_PERCENT)
        .required(REQUIRED_FIELD)
        .nullable(),
    },
    {
      name: 'startDate',
      title: 'Начало периода',
      initialValue: startDate || undefined,
      placeholder: 'Начало периода',
      validationSchema: Yup.date().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'endDate',
      title: 'Конец периода',
      initialValue: endDate || undefined,
      placeholder: 'Конец периода',
      validationSchema: Yup.date().required(REQUIRED_FIELD).nullable(),
    },
  ];
};

export const validationSchemaVariantsWeekly = Yup.array()
  .test(
    'check-field',
    REQUIRED_FIELDS,
    value =>
      !value.some(({ amount, weekday }) =>
        weekday === NO_SALE ? false : !weekday || amount === undefined,
      ),
  )
  .test('less-100', MAX_DISCOUNT, value => !value.some(({ amount }) => amount > 100))
  .test('more-0', MIN_DISCOUNT, value => !value.some(({ amount }) => amount < 0));

export const validationSchemaVariantsPeriod = Yup.array()
  .test(
    'check-fields',
    REQUIRED_FIELDS,
    value =>
      !value.some(({ amount, startDate, endDate }) =>
        startDate !== null ? !amount || startDate === undefined || endDate === undefined : false,
      ),
  )
  .test(
    'less-100',
    MAX_DISCOUNT,
    value => !value.some(({ amount, startDate }) => (startDate !== null ? amount > 100 : false)),
  )
  .test(
    'more-0',
    MIN_DISCOUNT,
    value => !value.some(({ amount, startDate }) => (startDate !== null ? amount < 0 : false)),
  );

export const weeklyDiscountsSingleValidationSchema = Yup.array().of(
  Yup.object().shape({
    ...getFieldsWeeklyDiscounts().reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.validationSchema }),
      {},
    ),
  }),
);

export const periodDiscountsSingleValidationSchema = Yup.array().of(
  Yup.object().shape({
    ...getFieldsPeriodDiscounts().reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.validationSchema }),
      {},
    ),
  }),
);
