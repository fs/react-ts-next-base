import React from 'react';

import { PropertiesList, PropertiesListItem } from './styled';

const VariantProperties = ({ variantProperties }) => (
  <PropertiesList>
    {variantProperties.map(
      ({ dictionaryPropertyOption, property, integerValue, stringValue }, index) => {
        return (
          <PropertiesListItem key={index}>
            {!!index && ' / '}
            <span>
              {property.displayName}:{' '}
              {integerValue || stringValue || dictionaryPropertyOption?.name}
            </span>
          </PropertiesListItem>
        );
      },
    )}
  </PropertiesList>
);

export default VariantProperties;
