import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

import SelectField from 'components/shared/atoms/Selects/SelectField';
import Input from 'components/shared/atoms/Input';
import { PROPERTY_TYPE } from 'config/constants/properties';
import DictionaryFields from './components/DictionaryFields';
import IntegerFields from './components/IntegerFields';

import { CategoryWrapper } from './styled';
import { fields, initialValues } from '../../fields';

const propertyOptions = [
  { value: PROPERTY_TYPE.INTEGER_PROPERTY, label: 'Цифры' },
  { value: PROPERTY_TYPE.DICTIONARY_PROPERTY, label: 'Селектор' },
  { value: PROPERTY_TYPE.STRING_PROPERTY, label: 'Буквы' },
];

const renderAdditionalFields = type => {
  switch (type) {
    case PROPERTY_TYPE.INTEGER_PROPERTY:
      return <IntegerFields />;
    case PROPERTY_TYPE.DICTIONARY_PROPERTY:
      return <DictionaryFields />;
    case PROPERTY_TYPE.STRING_PROPERTY:
      return null;
    default:
      console.error(`unknown property type ${type}`);
      return null;
  }
};
const CharacteristicProperties = () => {
  const [, { value: selectedTypeId }] = useField(fields.type);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(fields.checkedUnit, initialValues.checkedUnit);
    setFieldValue(fields.unitName, initialValues.unitName);
    setFieldValue(fields.selectors, initialValues.selectors);
  }, [selectedTypeId]);

  return (
    <CategoryWrapper>
      <Input
        placeholder="Введите пользовательское название"
        title="Пользовательское название"
        name={fields.displayName}
        testId={fields.displayName}
      />
      <Input
        placeholder="Введите название для администраторов"
        title="Название для администраторов"
        name={fields.name}
        testId={fields.name}
      />
      <SelectField
        title="Формат поля"
        name={fields.type}
        options={propertyOptions}
        isClearable
        placeholder="Выберите формат поля"
        $mb={20}
      />
      {selectedTypeId && renderAdditionalFields(selectedTypeId)}
    </CategoryWrapper>
  );
};

export default CharacteristicProperties;
