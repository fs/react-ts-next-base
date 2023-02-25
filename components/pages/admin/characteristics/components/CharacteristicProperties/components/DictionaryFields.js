import React from 'react';
import { FieldArray, useFormikContext } from 'formik';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Icon from 'components/shared/atoms/Icon';

import { fields } from '../../../fields';

import { GroupTitle, InputGroup, TitleWrapper } from './styled';

const DictionaryFields = () => {
  const { values } = useFormikContext();
  return (
    <>
      <TitleWrapper>
        <GroupTitle>Создание селектора</GroupTitle>
      </TitleWrapper>
      <FieldArray
        name={fields.selectors}
        render={arrayHelpers => (
          <>
            {values[fields.selectors] &&
              values[fields.selectors].length > 0 &&
              values[fields.selectors].map((selector, index) => (
                <InputGroup key={index}>
                  <Input
                    rounded
                    placeholder="Введите название селектора"
                    title="Название для селектора"
                    name={`${fields.selectors}.${index}.name`}
                    testId="selectorName"
                  />
                  <Button
                    icon={<Icon $color="greyC4" $size={15} name="close" />}
                    iconType="only"
                    shape="rounded"
                    size="medium"
                    type="button"
                    disabled={values[fields.selectors].length <= 1}
                    variant="outlined-neutral"
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </InputGroup>
              ))}
            <Button
              icon={<Icon $color="white" name="plus" />}
              iconType="leading"
              label="Добавить строку"
              shape="rounded"
              size="medium"
              type="button"
              variant="primary"
              $width="100%"
              $mb="16"
              onClick={() => arrayHelpers.push({ name: '' })}
            />
          </>
        )}
      />
    </>
  );
};

export default DictionaryFields;
