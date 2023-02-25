import React, { useCallback, useEffect, useState } from 'react';
import uniqBy from 'lodash/uniqBy';

import Button from 'components/shared/atoms/Button';

import {
  ProductPropertiesWrapper,
  Title,
  Property,
  PropertyLabel,
  PropertyValuesWrapper,
} from './styled';

import { propertyTypes } from '../ProductContent/constants';

const ProductProperties = ({
  variants,
  onSelectProperty,
  remainingVariants,
  setRemainingVariants,
  setFieldValue,
}) => {
  const stockVariants = variants.filter(
    ({ stock, soldQuantity, minShipmentLot }) => stock - soldQuantity >= minShipmentLot,
  );

  const properties = variants[0]?.variantProperties || [];

  const defaultSelectedProperties = useCallback(() => {
    if (stockVariants.length === 0) {
      return [];
    }
    const cheapestVariant = stockVariants.reduce((prev, current) =>
      current.discountPrice < prev.discountPrice ? current : prev,
    );

    return cheapestVariant.variantProperties.map(
      ({
        property: { id, __typename: type },
        dictionaryPropertyOption,
        integerValue,
        stringValue,
      }) => ({
        id,
        value:
          type === propertyTypes.DICTIONARY_PROPERTY
            ? dictionaryPropertyOption?.id
            : type === propertyTypes.INTEGER_PROPERTY
            ? integerValue
            : stringValue,
      }),
    );
  }, [stockVariants]);

  const [selectedProperties, setSelectedProperties] = useState(defaultSelectedProperties());

  const photoIds =
    variants
      ?.map(({ variantPhotos }) => variantPhotos)
      .flat(1)
      .map(({ id }) => id) || [];

  const propertyHandler = (propertyId, propertyValueId) => {
    setSelectedProperties(
      selectedProperties.map(property =>
        property.id === propertyId
          ? { ...property, value: property.value === propertyValueId ? null : propertyValueId }
          : property,
      ),
    );
  };

  const getUniqProperties = useCallback(
    propertyId =>
      uniqBy(
        variants
          .map(({ variantProperties }) =>
            variantProperties.find(({ property }) => property.id === propertyId),
          )
          .map(({ integerValue, stringValue, dictionaryPropertyOption }) =>
            integerValue
              ? { id: integerValue, value: integerValue }
              : stringValue
              ? { id: stringValue, value: stringValue }
              : { id: dictionaryPropertyOption.id, value: dictionaryPropertyOption.name },
          ),
        'value',
      ),
    [variants],
  );

  const isDisabledProperty = useCallback(
    (propertyId, type, propertyValueId, value) =>
      remainingVariants.every(({ variantProperties }) => {
        const { integerValue, stringValue, dictionaryPropertyOption } = variantProperties.find(
          ({ property }) => property.id === propertyId,
        );
        return selectedProperties.filter(el => el.value).length === 1 &&
          propertyId === selectedProperties.find(el => el.value).id
          ? false
          : type === propertyTypes.DICTIONARY_PROPERTY
          ? dictionaryPropertyOption?.id !== propertyValueId
          : type === propertyTypes.INTEGER_PROPERTY
          ? value !== integerValue
          : value !== stringValue;
      }) ||
      stockVariants.every(({ variantProperties }) => {
        const { integerValue, stringValue, dictionaryPropertyOption } = variantProperties.find(
          ({ property }) => property.id === propertyId,
        );
        return (
          integerValue !== value &&
          stringValue !== value &&
          dictionaryPropertyOption?.id !== propertyValueId
        );
      }),
    [remainingVariants, selectedProperties],
  );

  useEffect(() => {
    setRemainingVariants(
      stockVariants.filter(({ variantProperties }) => {
        return selectedProperties
          .filter(({ value }) => value)
          .every(({ id, value }) => {
            const variantProperty = variantProperties.find(({ property }) => property.id === id);
            return (
              variantProperty.dictionaryPropertyOption?.id === value ||
              variantProperty?.integerValue === value ||
              variantProperty?.stringValue === value
            );
          });
      }),
    );
  }, [selectedProperties]);

  useEffect(() => {
    const { minShipmentLot, variantPhotos } = remainingVariants[0] || { variantPhotos: {} };
    setFieldValue('quantity', minShipmentLot || 1);
    if (selectedProperties.some(({ value }) => value)) {
      const photoIndex = photoIds.findIndex(idx => idx === variantPhotos[0]?.id);
      onSelectProperty(photoIndex);
    }
  }, [remainingVariants]);

  return (
    <ProductPropertiesWrapper>
      <Title>Выберите характеристики товара чтобы увидеть остальные параметры</Title>
      {properties.map(
        ({ property: { id: propertyId, displayName, unit, __typename: type } }, propertyIndex) => (
          <Property key={propertyId}>
            <PropertyLabel>{displayName}</PropertyLabel>
            <PropertyValuesWrapper>
              {getUniqProperties(propertyId).map(({ id: propertyValueId, value }, i) => (
                <Button
                  label={`${value} ${type === propertyTypes.INTEGER_PROPERTY ? unit : ''}`}
                  variant={
                    selectedProperties.find(({ id }) => id === propertyId)?.value ===
                    propertyValueId
                      ? 'confirm'
                      : 'outlined-neutral'
                  }
                  shape="extra-rounded"
                  testId={`property-${propertyIndex}-${i}`}
                  onClick={() => propertyHandler(propertyId, propertyValueId)}
                  disabled={isDisabledProperty(propertyId, type, propertyValueId, value)}
                  key={i}
                />
              ))}
            </PropertyValuesWrapper>
          </Property>
        ),
      )}
    </ProductPropertiesWrapper>
  );
};

export default ProductProperties;
