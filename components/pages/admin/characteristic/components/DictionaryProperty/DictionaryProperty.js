import React from 'react';
import { FieldArray, useField } from 'formik';

import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { fields } from '../PropertyForm/fields';
import { InputGroup, Subtitle, SelectOption } from './styled';

const DictionaryProperty = ({ propertyId }) => {
  const { loading, dictionaryPropertyOptions } = useDictionaryPropertyOptions({ propertyId });
  const [, { value }] = useField(fields.selectors);
  return (
    <>
      <Subtitle> Селектор </Subtitle>
      <FieldArray
        name={fields.selectors}
        render={arrayHelpers => (
          <>
            {!loading &&
              dictionaryPropertyOptions.map(({ name, id }) => (
                <SelectOption data-testid="existed-property-option" key={id}>
                  {name}
                </SelectOption>
              ))}
            {value &&
              value.length > 0 &&
              value.map((selector, index) => (
                <InputGroup key={index}>
                  <Input
                    rounded
                    placeholder="Введите название селектора"
                    name={`${fields.selectors}.${index}.name`}
                    testId="property-option-input"
                  />
                  <Button
                    icon={<Icon $color="greyC4" $size={15} name="close" />}
                    iconType="only"
                    shape="rounded"
                    size="medium"
                    type="button"
                    variant="outlined-neutral"
                    testId="remove-option-button"
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </InputGroup>
              ))}
            <Button
              icon={<Icon $color="white" name="plus" />}
              iconType="leading"
              label="Добавить строку"
              shape="rounded"
              type="button"
              $mb="16"
              $width="100%"
              testId="add-option-button"
              onClick={() => arrayHelpers.push({ name: '' })}
            />
          </>
        )}
      />
    </>
  );
};

export default DictionaryProperty;
