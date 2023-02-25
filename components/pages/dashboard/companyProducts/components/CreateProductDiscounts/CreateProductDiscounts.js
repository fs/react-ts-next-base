import React, { useState } from 'react';
import * as Yup from 'yup';
import uniqueId from 'lodash/uniqueId';
import useRouter from 'hooks/useRouter';

import {
  useSubmitProductDiscountsStep,
  useCreateProductTemplate,
} from 'lib/apollo/hooks/actions/product';
import useNotifier from 'hooks/useNotifier';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';
import {
  SINGLE_DISCOUNT,
  DISCOUNT_FOR_VARIANTS,
  NO_DISCOUNT,
  WEEKLY_DISCOUNTS,
  NO_SALE,
  SUM,
  MAX,
} from 'config/constants/discount';
import CreateProductDiscountsForm from './CreateProductDiscountsForm';
import {
  getFieldsWeeklyDiscounts,
  getFieldsPeriodDiscounts,
  weeklyDiscountsSingleValidationSchema,
  periodDiscountsSingleValidationSchema,
  validationSchemaVariantsWeekly,
  validationSchemaVariantsPeriod,
} from './fields';

import { Title } from '../_shared/styled';
import { productTypes } from '../../constants';

const defaultWeeklyDiscountsFields = {
  amount: '',
  weekday: '',
};

const defaultPeriodDiscountsFields = {
  amount: '',
  startDate: '',
  endDate: '',
};

const radio = [
  { label: 'Единая скидка на все товары', value: SINGLE_DISCOUNT },
  { label: 'Скидка на каждый товар по отдельности', value: DISCOUNT_FOR_VARIANTS },
  { label: 'Нет скидки', value: NO_DISCOUNT },
];

const discountMethodRadio = [
  {
    label: 'Суммировать скидки',
    value: SUM,
    tooltip:
      'Например: Вы выбрали скидку в понедельник 5% И с дд.мм.гг-дд.мм.гг скидка 20%. Если выбранное покупателем число выпало на понедельник, скидка будет составлять 25%',
  },
  {
    label: 'В этот день действует бóльшая скидка',
    value: MAX,
    tooltip:
      'Например: Вы выбрали скидку в понедельник 5% И с дд.мм.гг-дд.мм.гг скидка 20%. Если выбранное покупателем число выпало на понедельник, скидка будет 20%, как наибольшая',
  },
];

const CreateProductDiscounts = ({ product, query, readOnly = false }) => {
  const {
    id: productId,
    variants: initialVariants,
    weeklyDiscounts: initialWeeklyDiscounts,
    periodDiscounts: initialPeriodDiscounts,
    discountMethod: initialDiscountMethod,
    template: isTemplate,
  } = product;

  const initialDiscountType = initialVariants.some(
    ({ weeklyDiscounts, periodDiscounts }) => weeklyDiscounts.length || periodDiscounts.length,
  )
    ? DISCOUNT_FOR_VARIANTS
    : initialWeeklyDiscounts.length || initialPeriodDiscounts.length
    ? SINGLE_DISCOUNT
    : NO_DISCOUNT;

  const [discountsType, setDiscountsType] = useState(initialDiscountType);

  const [createProductTemplate] = useCreateProductTemplate();
  const [submitProductDiscountsStep] = useSubmitProductDiscountsStep();
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const onChangeRadio = value => {
    setDiscountsType(value);
  };

  const onAddDiscount = ({ nameDiscount, push }) => {
    push(
      nameDiscount === WEEKLY_DISCOUNTS
        ? { id: uniqueId(), ...defaultWeeklyDiscountsFields }
        : { id: uniqueId(), ...defaultPeriodDiscountsFields },
    );
  };

  const onSubmit = async (
    {
      periodDiscounts,
      weeklyDiscounts,
      variants_weeklyDiscounts,
      variants_periodDiscounts,
      template,
      discountMethod,
    },
    { setSubmitting },
  ) => {
    const singleDiscounts = discountsType === SINGLE_DISCOUNT;
    const discountsForVariant = discountsType === DISCOUNT_FOR_VARIANTS;
    const submitValues = {
      periodDiscounts: singleDiscounts
        ? periodDiscounts.map(({ amount, startDate, endDate }) => ({ amount, startDate, endDate }))
        : [],
      weeklyDiscounts: singleDiscounts
        ? weeklyDiscounts.map(({ amount, weekday }) => ({ amount, weekday }))
        : [],
      productId,
      discountMethod,
      discountsForVariant,
      variants: discountsForVariant
        ? initialVariants.map(({ id }, i) => ({
            id,
            weeklyDiscounts: [variants_weeklyDiscounts[i]]
              .filter(({ weekday }) => weekday !== NO_SALE)
              .map(({ amount, weekday }) => ({ amount, weekday })),
            periodDiscounts: [variants_periodDiscounts[i]]
              .filter(({ startDate }) => startDate !== null)
              .map(({ amount, startDate, endDate }) => ({
                amount,
                startDate,
                endDate,
              })),
          }))
        : [],
    };

    try {
      setSubmitting(true);
      let productUpdated;
      if (!template) {
        productUpdated = await submitProductDiscountsStep(submitValues);
      } else if (template) {
        await createProductTemplate(submitValues);
      }

      setSubmitting(false);
      if (productUpdated) {
        pushRoute({
          pathname: DASHBOARD_COMPANY_PRODUCTS,
          query: { ...query, type: isTemplate ? productTypes.TEMPLATE : productTypes.ACTIVE },
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  const weeklyDiscountsInitialValues = initialWeeklyDiscounts.map(discount => {
    return getFieldsWeeklyDiscounts(discount).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const periodDiscountsInitialValues = initialPeriodDiscounts.map(discount => {
    return getFieldsPeriodDiscounts(discount).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const variantsWeeklyDiscountsInitialValues = initialVariants.map(({ weeklyDiscounts }) => {
    return getFieldsWeeklyDiscounts(weeklyDiscounts[0]).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const variantsPeriodDiscountsInitialValues = initialVariants.map(({ periodDiscounts }) => {
    return getFieldsPeriodDiscounts(periodDiscounts[0]).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const initialValues = {
    radio: initialDiscountType,
    weeklyDiscounts: initialWeeklyDiscounts.length
      ? weeklyDiscountsInitialValues
      : [{ id: uniqueId(), ...defaultWeeklyDiscountsFields }],
    periodDiscounts: initialPeriodDiscounts.length
      ? periodDiscountsInitialValues
      : [{ id: uniqueId(), ...defaultPeriodDiscountsFields }],
    variants_weeklyDiscounts: variantsWeeklyDiscountsInitialValues,
    variants_periodDiscounts: variantsPeriodDiscountsInitialValues,
    discountMethod: initialDiscountMethod,
  };

  const validationSchema = Yup.object().shape({
    radio: Yup.string().required(REQUIRED_FIELD).nullable(),
    weeklyDiscounts:
      discountsType === SINGLE_DISCOUNT ? weeklyDiscountsSingleValidationSchema : undefined,
    periodDiscounts:
      discountsType === SINGLE_DISCOUNT ? periodDiscountsSingleValidationSchema : undefined,
    variants_weeklyDiscounts:
      discountsType === DISCOUNT_FOR_VARIANTS ? validationSchemaVariantsWeekly : undefined,
    variants_periodDiscounts:
      discountsType === DISCOUNT_FOR_VARIANTS ? validationSchemaVariantsPeriod : undefined,
  });

  return (
    <>
      <Title data-cy="create-product-discounts-title">Шаг 7: Параметры скидки</Title>
      <CreateProductDiscountsForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        radio={radio}
        discountMethodRadio={discountMethodRadio}
        onChangeRadio={onChangeRadio}
        onAddDiscount={onAddDiscount}
        variants={initialVariants}
        isTemplate={isTemplate}
        readOnly={readOnly}
      />
    </>
  );
};

export default CreateProductDiscounts;
