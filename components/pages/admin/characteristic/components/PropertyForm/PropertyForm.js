import React, { useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import { Formik, Form as FormikForm } from 'formik';

import { PROPERTY_TYPE_NAME, PROPERTY_TYPE } from 'config/constants/properties';

import {
  useUpdateDictionaryProperty,
  useUpdateIntegerProperty,
  useUpdateStringProperty,
} from 'lib/apollo/hooks/actions/properties';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import DictionaryProperty from '../DictionaryProperty';
import DestroyPropertyButton from '../DestroyPropertyButton';
import { validationSchema } from './fields';

import {
  AlertMessage,
  ButtonsWrapper,
  CharacteristicPath,
  FieldWrapper,
  Subtitle,
  Title,
} from './styled';

const PropertyForm = ({ property }) => {
  const {
    id,
    name,
    __typename: type,
    categoryPath,
    canDestroy: { value: canBeDestroyed },
  } = property;

  const [updateIntegerProperty] = useUpdateIntegerProperty(id);
  const [updateDictionaryProperty] = useUpdateDictionaryProperty(id);
  const [updateStringProperty] = useUpdateStringProperty(id);
  const updatePropertyModal = useModal(SimpleModal);

  const characteristicsPath = categoryPath
    .map(({ name: categoryName }) => categoryName)
    .join(' / ');

  const showEditProperty = (values, { setSubmitting }) => {
    setSubmitting(false);
    updatePropertyModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async () => {
        switch (type) {
          case PROPERTY_TYPE.INTEGER_PROPERTY:
            await updateIntegerProperty(values);
            break;
          case PROPERTY_TYPE.DICTIONARY_PROPERTY:
            await updateDictionaryProperty(values);
            break;
          case PROPERTY_TYPE.STRING_PROPERTY:
            await updateStringProperty(values);
            break;
          default:
            console.error(`unknown property type ${type}`);
        }
      },
      title: 'Редактирование характеристики',
      description: (
        <>
          Вы уверены что хотите сохранить изменения в характеристике <b>{name}</b>?
        </>
      ),
      acceptText: 'Подтвердить',
    });
  };

  const typeFields = useMemo(() => {
    switch (type) {
      case PROPERTY_TYPE.INTEGER_PROPERTY:
        return (
          <>
            <Subtitle> Единица измерения </Subtitle>
            <FieldWrapper>
              <Input name="unit" rounded readOnly />
            </FieldWrapper>
          </>
        );
      case PROPERTY_TYPE.DICTIONARY_PROPERTY:
        return <DictionaryProperty propertyId={id} />;
      default:
        return <></>;
    }
  }, [type]);

  const initialValues = {
    ...property,
    type,
    typeName: PROPERTY_TYPE_NAME[type],
    dictionaryPropertyOptions: [],
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={showEditProperty}
      >
        <FormikForm>
          <Title>{name}</Title>
          <CharacteristicPath>
            Характеристика относится к:
            <b> {characteristicsPath} </b>
          </CharacteristicPath>
          <Subtitle> Название </Subtitle>
          <FieldWrapper>
            <Input
              name="displayName"
              rounded
              title="Пользовательское название"
              testId="display-name"
              iconType="trailing"
              icon={<Icon name="pencil" $color="blue" $size={14} $mr={12} />}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Input
              name="name"
              rounded
              title="Название для администраторов"
              testId="name"
              iconType="trailing"
              icon={<Icon name="pencil" $color="blue" $size={14} $mr={12} />}
            />
          </FieldWrapper>
          <Input name="typeName" rounded title="Формат поля" readOnly />
          {typeFields}
          <ButtonsWrapper>
            <DestroyPropertyButton id={id} name={name} canBeDestroyed={canBeDestroyed} />
            <Button
              label="Сохранить"
              $width="8.75rem"
              shape="rounded"
              size="small"
              variant="change"
              type="submit"
              testId="edit-property-button"
            />
          </ButtonsWrapper>
        </FormikForm>
      </Formik>
      <AlertMessage>
        <Icon name="exclamation-square" $size={24} $mr={20} $color="orange" />
        <div>
          Вы ограниченно можете редактировать характеристику, так как она уже используется.
          Подразумевается, что вы можете добавить новые поля, но не можете удалить уже созданные.
          Так же вы можете изменить название характеристики.
        </div>
      </AlertMessage>
    </>
  );
};

export default PropertyForm;
