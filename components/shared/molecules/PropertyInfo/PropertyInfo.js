import React from 'react';

import { ADMIN_CHARACTERISTIC } from 'config/routes';
import Button from 'components/shared/atoms/Button';

import { PropertyItem, PropertyName } from './styled';

const PropertyInfo = ({ id, name }) => {
  return (
    <PropertyItem data-testid="property-wrapper" key={id}>
      <PropertyName>{name}</PropertyName>
      <Button
        label="Подробнее"
        shape="rounded"
        size="small"
        href={{ pathname: ADMIN_CHARACTERISTIC, query: { propertyId: id } }}
      />
    </PropertyItem>
  );
};

export default PropertyInfo;
