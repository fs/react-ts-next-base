import React from 'react';
import * as Yup from 'yup';

import { useSubmitProductPricesStep } from 'lib/apollo/hooks/actions/product';
import { ProductDraftStepEnum } from 'graphql/types';
import useNotifier from 'hooks/useNotifier';

import {
  MIN_COUNT,
  MIN_PHOTOS_LENGTH,
  REQUIRED_FIELD,
  REQUIRED_FIELDS,
  WHOLESALE_REQUIRED,
} from 'config/constants/errorsText';
import CreateProductPricesForm from './CreateProductPricesForm';

import { getFieldsVariants } from './fields';

import { Title } from '../_shared/styled';

const radio = [
  { label: '10%', value: 10 },
  { label: '18%', value: 18 },
  { label: '20%', value: 20 },
  { label: 'НДС не облагается', value: 0 },
];

const tables = [
  {
    name: 'piecesale',
    title: 'Настройте ценники поштучной продажи',
    description: 'Внимание! Цену нужно указать за единицу товара, а не за групповую упаковку.',
    colWidth: 175,
  },
  {
    name: 'wholesale',
    title: 'Настройте ценники оптовых продаж',
    description: 'Внимание! Цену нужно указать за единицу товара, а не за групповую упаковку.',
    descriptionPrice:
      'Цена за товар для оптовых продаж не должна превышать цену товара для поштучной продажи',
    colWidth: 265,
  },
];

const CreateProductPrices = ({ product, onSubmitStep, readOnly = false }) => {
  const {
    id: productId,
    variants: initialVariants,
    vat: initialVat,
    productConfirmationRecords: initialProductConfirmationRecords,
    wholesaleLot: initialWholesaleLot,
    draftStep,
  } = product;

  const [submitProductPricesStep] = useSubmitProductPricesStep();
  const { setError } = useNotifier();

  const onSubmit = async (
    { vat, wholesaleLot, variants, productConfirmationRecords },
    { setSubmitting },
  ) => {
    if (readOnly) {
      onSubmitStep(ProductDraftStepEnum.Discounts);
      return;
    }
    const submitValues = {
      productId,
      vat,
      productConfirmationRecords: productConfirmationRecords.map(({ attachment }) =>
        attachment.url ? { attachmentRemoteUrl: attachment.url } : { attachment },
      ),
      wholesaleLot: wholesaleLot || null,
      variants: variants.map(variant => ({
        ...variant,
        wholesalePrice: variant.wholesalePrice || null,
      })),
    };

    try {
      setSubmitting(true);

      const productUpdated = await submitProductPricesStep(submitValues);

      setSubmitting(false);
      if (productUpdated) onSubmitStep(ProductDraftStepEnum.Discounts);
    } catch (error) {
      setError(error);
    }
  };

  const variantsInitialValues = initialVariants.map(variant => {
    return getFieldsVariants(variant).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const initialValues = {
    vat: initialVat,
    wholesaleLot: initialWholesaleLot || '',
    variants: variantsInitialValues,
    productConfirmationRecords: initialProductConfirmationRecords.length
      ? initialProductConfirmationRecords.map(({ attachmentUrl, id }) => ({
          attachment: { id, url: attachmentUrl },
        }))
      : [],
  };

  const validationSchema = Yup.object().shape({
    vat: Yup.number().required(REQUIRED_FIELD).nullable(),
    wholesaleLot: Yup.number()
      .when(['variants'], (variants, schema, { value: wholesaleLot }) => {
        if (wholesaleLot) {
          return schema.test(
            'select-price',
            'Укажите оптовую цену',
            () => !variants.some(({ wholesalePrice }) => !wholesalePrice),
          );
        }
        if (wholesaleLot === 0) {
          return schema.moreThan(1, MIN_COUNT);
        }
        if (wholesaleLot === undefined && variants.some(({ wholesalePrice }) => wholesalePrice)) {
          return schema.required(WHOLESALE_REQUIRED);
        }
        return schema;
      })
      .nullable(),
    variants: Yup.array().test(
      'check-variants',
      REQUIRED_FIELDS,
      value =>
        !value.some(({ price, stock, minShipmentLot }) => !price || !stock || !minShipmentLot),
    ),
    productConfirmationRecords: Yup.array().test(
      'check-length',
      MIN_PHOTOS_LENGTH,
      value => !!value.length,
    ),
  });

  return (
    <>
      <Title data-cy="create-product-prices-title">Шаг 6: Цены</Title>
      <CreateProductPricesForm
        readOnly={readOnly}
        radio={radio}
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        tables={tables}
        variants={initialVariants}
        draftStep={draftStep}
      />
    </>
  );
};

export default CreateProductPrices;
