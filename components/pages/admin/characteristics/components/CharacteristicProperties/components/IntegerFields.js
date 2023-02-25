import React from 'react';
import { useField } from 'formik';

import Switch from 'components/shared/atoms/Switch';
import Input from 'components/shared/atoms/Input';

import { fields } from '../../../fields';

import { GroupTitle, TitleWrapper } from './styled';

const IntegerFields = () => {
  const [, { value: checkedUnit }] = useField(fields.checkedUnit);

  return (
    <>
      <TitleWrapper>
        <GroupTitle>Единица измерения</GroupTitle>
        <Switch name={fields.checkedUnit} />
      </TitleWrapper>
      {checkedUnit && (
        <Input
          placeholder="Введите название единицы измерения"
          title="Название для единицы измерения"
          name={fields.unitName}
          testId="units-field"
        />
      )}
    </>
  );
};

export default IntegerFields;
