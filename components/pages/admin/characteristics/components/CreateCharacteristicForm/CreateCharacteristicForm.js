import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { isNil } from 'lodash';

import {
  useCreateDictionaryProperty,
  useCreateIntegerProperty,
  useCreateStringProperty,
} from 'lib/apollo/hooks/actions/properties';

import Button from 'components/shared/atoms/Button';
import { PROPERTY_TYPE } from 'config/constants/properties';
import CharacteristicCategory from '../CharacteristicCategory';
import CharacteristicProperties from '../CharacteristicProperties';

import { fields, initialValues, validationSchema } from '../../fields';

import {
  GroupTitle,
  TabContentWrapper,
  SubmitActionsWrapper,
  CharacteristicsPath,
  CharacteristicsDescription,
} from './styled';

const CreateCharacteristicForm = () => {
  const [characteristicsName, setCharacteristicsName] = useState({});
  const [lastSelectedCategory, setLastSelectedCategory] = useState(null);

  const characteristicsPath = Object.values(characteristicsName)
    .filter(el => !isNil(el))
    .join(' / ');

  const [createDictionaryProperty] = useCreateDictionaryProperty();
  const [createIntegerProperty] = useCreateIntegerProperty();
  const [createStringProperty] = useCreateStringProperty();

  const createProperty = (values, onSuccess) => {
    switch (values[fields.type]) {
      case PROPERTY_TYPE.INTEGER_PROPERTY:
        return createIntegerProperty(
          {
            name: values[fields.name],
            displayName: values[fields.displayName],
            unit: values[fields.unitName],
            categoryIds: values.categoryIds,
          },
          onSuccess,
        );
      case PROPERTY_TYPE.DICTIONARY_PROPERTY:
        return createDictionaryProperty(
          {
            name: values[fields.name],
            displayName: values[fields.displayName],
            dictionaryPropertyOptions: values[fields.selectors],
            categoryIds: values.categoryIds,
          },
          onSuccess,
        );
      case PROPERTY_TYPE.STRING_PROPERTY:
        return createStringProperty(
          {
            name: values[fields.name],
            displayName: values[fields.displayName],
            categoryIds: values.categoryIds,
          },
          onSuccess,
        );
      default:
        console.error(`prepareProperty unknown property type ${values[fields.type]}`);
        return null;
    }
  };
  return (
    <TabContentWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const preparedProperty = {
            ...values,
            categoryIds: [lastSelectedCategory?.value],
          };
          const onSuccess = () => {
            resetForm();
            setLastSelectedCategory(null);
            setCharacteristicsName({});
          };
          await createProperty(preparedProperty, onSuccess);

          setSubmitting(false);
        }}
      >
        {() => {
          return (
            <FormikForm>
              <GroupTitle>Название</GroupTitle>
              <CharacteristicProperties />
              <GroupTitle>Выберите категорию</GroupTitle>
              <CharacteristicCategory
                parentId={null}
                setCharacteristicsName={setCharacteristicsName}
                setLastSelectedCategory={setLastSelectedCategory}
              />
              {characteristicsPath && (
                <>
                  <CharacteristicsDescription>Вы выбрали:</CharacteristicsDescription>
                  <CharacteristicsPath>{characteristicsPath}</CharacteristicsPath>
                </>
              )}
              <SubmitActionsWrapper>
                <Button
                  shape="rounded"
                  size="medium"
                  type="submit"
                  label="Сохранить"
                  variant="confirm"
                  testId="create-property-button"
                />
              </SubmitActionsWrapper>
            </FormikForm>
          );
        }}
      </Formik>
    </TabContentWrapper>
  );
};

export default CreateCharacteristicForm;
