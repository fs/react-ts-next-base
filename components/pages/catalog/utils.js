import { catalogCategories } from './constants';

const intListValues = ['minPrice', 'maxPrice', 'rating', 'companyRating'];

const condition = item => !!item;

export const sanitizeProperties = properties => {
  const intPreparedProps = { ...properties };

  intListValues.forEach(fieldName => {
    intPreparedProps[fieldName] = +properties[fieldName];
  });

  const filteredProperties = Object.fromEntries(
    Object.entries(intPreparedProps).filter(([_, value]) => condition(value)),
  );
  return filteredProperties;
};
export const prepareProperties = properties => {
  const { textProperties, dictionaryProperties, integerProperties } = properties;

  return {
    ...sanitizeProperties(properties),
    textProperties: textProperties ? textProperties?.filter(condition) : [],
    dictionaryProperties: dictionaryProperties ? dictionaryProperties?.filter(condition) : [],
    integerProperties: integerProperties ? integerProperties?.filter(condition) : [],
  };
};

export const excludeSpecificProperties = properties => {
  const removeKeysList = ['textProperties', 'dictionaryProperties', 'integerProperties'];
  const result = {};
  const keys = Object.keys(properties);
  keys.forEach(key => {
    if (!removeKeysList.includes(key)) {
      result[key] = properties[key];
    }
  });
  return result;
};

export const typeMapper = gqlType => {
  switch (gqlType) {
    case 'DictionaryProperty':
      return 'dictionary-select';
    case 'IntegerProperty':
      return 'range';
    default:
      return 'text';
  }
};

export const prefixMapper = gqlType => {
  switch (gqlType) {
    case 'DictionaryProperty':
      return 'dictionaryProperties';
    case 'IntegerProperty':
      return 'integerProperties';
    default:
      return 'textProperties';
  }
};

export const getQueryParamsByCategory = category => {
  return category === catalogCategories.USED
    ? { condition: category }
    : category === catalogCategories.SALE
    ? { discounted: true }
    : {};
};
