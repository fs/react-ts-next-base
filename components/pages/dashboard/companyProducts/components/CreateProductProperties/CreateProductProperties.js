import React, { useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import * as Yup from 'yup';
import head from 'lodash/head';

import {
  ProductDraftStepEnum,
  VariantUnitKindEnum,
  VariantUnitQuantityKindEnum,
} from 'graphql/types';
import { useSubmitProductPropertiesStep } from 'lib/apollo/hooks/actions/product';
import { useProperties } from 'lib/apollo/hooks/state/properties';
import useNotifier from 'hooks/useNotifier';

import { MIN_PHOTOS_LENGTH, REQUIRED_FIELDS } from 'config/constants/errorsText';
import { DICTIONARY_PROPERTY, INTEGER_PROPERTY } from './constants';

import { getFieldsVariants } from './fields';

import CreateProductPropertiesForm from './CreateProductPropertiesForm';

import { Title } from '../_shared/styled';

const CreateProductProperties = ({ product, onSubmitStep, readOnly = false }) => {
  const { id: productId, variants: initialVariants, category, draftStep } = product;
  const { id: categoryIds } = category || {};

  const [destroyedVariants, setDestroyedVariants] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState(
    initialVariants[0]?.variantProperties?.map(
      ({ property: { id, displayName, __typename: type } }) => ({
        value: id,
        label: displayName,
        type,
      }),
    ) || [],
  );
  const [defaultVariant, setDefaultVariant] = useState({
    id: uniqueId(),
    expirationDate: undefined,
    variantPhotos: [],
    variantCertificates: [],
    variantInstructions: [],
    variantProperties: selectedProperties.map(({ value, label, type }) => ({
      propertyId: value,
      propertyLabel: label,
      propertyType: type,
      propertyValue: '',
    })),
  });

  const [submitProductPropertiesStep] = useSubmitProductPropertiesStep();
  const { properties, loading: loadingProperties } = useProperties({ categoryIds });
  const { setError } = useNotifier();

  const onAddVariant = ({ pushVariant }) => {
    pushVariant({ ...defaultVariant, id: uniqueId() });
  };

  const onSubmit = async ({ variants, unitKind, unitQuantityKind }, { setSubmitting }) => {
    if (readOnly) {
      onSubmitStep(ProductDraftStepEnum.Address);
      return;
    }

    const variantsValues = variants.map(
      ({
        id,
        variantProperties,
        variantPhotos,
        expirationDate,
        variantCertificates,
        variantInstructions,
        unitQuantity,
        initial,
      }) => {
        const variantValue = {
          variantProperties: variantProperties.map(({ propertyId, propertyValue, propertyType }) =>
            propertyType === DICTIONARY_PROPERTY
              ? {
                  propertyId,
                  dictionaryPropertyOptionId: propertyValue,
                }
              : propertyType === INTEGER_PROPERTY
              ? {
                  propertyId,
                  integerValue: propertyValue,
                }
              : {
                  propertyId,
                  stringValue: propertyValue,
                },
          ),
          variantPhotos: variantPhotos.map(({ image }) =>
            image.url ? { imageRemoteUrl: image.url } : { image },
          ),
          variantCertificates: variantCertificates.map(({ image }) =>
            image.url ? { attachmentRemoteUrl: image.url } : { attachment: image },
          ),
          variantInstructions: variantInstructions.map(({ image }) =>
            image.url ? { attachmentRemoteUrl: image.url } : { attachment: image },
          ),
        };
        const unit =
          unitKind === VariantUnitKindEnum.Item
            ? { unitKind, unitQuantity: null, unitQuantityKind: null }
            : { unitQuantity, unitKind, unitQuantityKind };

        if (initial) {
          return {
            ...variantValue,
            ...unit,
            expirationDate: expirationDate || null,
            id,
          };
        }

        return {
          ...variantValue,
          ...unit,
          expirationDate: expirationDate || null,
        };
      },
    );

    try {
      setSubmitting(true);

      const productUpdated = await submitProductPropertiesStep({
        productId,
        variants: [...variantsValues, ...destroyedVariants],
      });

      setSubmitting(false);
      if (productUpdated) onSubmitStep(ProductDraftStepEnum.Address);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!loadingProperties)
      setSelectedProperties(items =>
        items.map(selectedProperty =>
          selectedProperty.type === INTEGER_PROPERTY
            ? {
                ...selectedProperty,
                unit: properties.find(({ id }) => id === selectedProperty.value)?.unit,
              }
            : selectedProperty,
        ),
      );
  }, [loadingProperties]);

  useEffect(() => {
    setDefaultVariant(items => ({
      ...items,
      variantProperties: selectedProperties.map(({ value, label, type }) => ({
        propertyId: value,
        propertyLabel: label,
        propertyType: type,
        propertyValue: '',
      })),
    }));
  }, [selectedProperties]);

  const initialValues = {
    unitKind: head(initialVariants)?.unitKind || VariantUnitKindEnum.Item,
    unitQuantityKind: head(initialVariants)?.unitQuantityKind || VariantUnitQuantityKindEnum.Item,
    variants: initialVariants.length
      ? initialVariants.map(variant => {
          return getFieldsVariants(variant).reduce(
            (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
            {},
          );
        })
      : [defaultVariant],
  };

  const unionChecks = {
    variantPhotos: Yup.array().test('check-length', MIN_PHOTOS_LENGTH, value => !!value.length),
    variantProperties: Yup.array().test('properties-test', REQUIRED_FIELDS, value =>
      value.every(property => property.propertyValue),
    ),
    expirationDate: Yup.string()
      .nullable()
      .test('test-date', REQUIRED_FIELDS, value => value || value === null),
  };
  const validationSchema = Yup.object().shape({
    variants: Yup.array().when('unitKind', {
      is: unitKind => unitKind === VariantUnitKindEnum.Item,
      then: schema => schema.of(Yup.object().shape(unionChecks)),
      otherwise: schema =>
        schema.of(
          Yup.object().shape({ ...unionChecks, unitQuantity: Yup.number().required().min(1) }),
        ),
    }),
  });

  const form = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <>
      <Title data-cy="create-product-properties-title">Шаг 2: Параметры товара</Title>
      <CreateProductPropertiesForm
        readOnly={readOnly}
        form={form}
        disabledPropertiesSelect={loadingProperties}
        selectedProperties={selectedProperties}
        setSelectedProperties={setSelectedProperties}
        properties={properties}
        onAddVariant={onAddVariant}
        setDestroyedVariants={setDestroyedVariants}
        draftStep={draftStep}
      />
    </>
  );
};

export default CreateProductProperties;
