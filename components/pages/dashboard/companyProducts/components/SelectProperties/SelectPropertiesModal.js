import React, { useState } from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Select from 'components/shared/atoms/Selects/Select';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import { useModal } from '@ebay/nice-modal-react';
import {
  ModalWrapper,
  ModalTitle,
  Subtitle,
  SelectedPropertiesWrapper,
  NoSelectedProperties,
  ActionsWrapper,
  ModalHelperTextWrapper,
} from './styled';

const SelectPropertiesModal = ({
  disabledPropertiesSelect,
  properties,
  setIsOpen,
  selectedProperties,
  setSelectedProperties,
  setFieldValue,
  values,
}) => {
  const options = properties.map(({ id, displayName, __typename: type, unit }) => ({
    value: id,
    label: displayName,
    type,
    unit,
  }));
  const [checkedProperties, setCheckedProperties] = useState(selectedProperties);
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  const onRemoveSelectedProperty = value => {
    setCheckedProperties(items => items.filter(property => property.value !== value));
  };

  const onChangeSelect = newOptions => {
    setCheckedProperties(newOptions);
  };

  const onSubmit = () => {
    setSelectedProperties(checkedProperties);
    setFieldValue(
      'variants',
      values.variants.map(variant => ({
        ...variant,
        variantProperties: checkedProperties.map(
          ({ value, label, type }) =>
            variant.variantProperties.find(({ propertyId }) => value === propertyId) || {
              propertyId: value,
              propertyLabel: label,
              propertyType: type,
              propertyValue: '',
            },
        ),
      })),
    );
    setIsOpen(false);
  };

  return (
    <ModalWrapper>
      <div>
        <ModalTitle>Выберите все характеристики вашего товара</ModalTitle>
        <Select
          name="properties"
          value={checkedProperties}
          options={options}
          isMulti
          onChange={onChangeSelect}
          placeholder="Выберите характеристики товара"
          closeMenuOnSelect={false}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          disabled={disabledPropertiesSelect}
          $mb={20}
        />
        <ModalHelperTextWrapper>
          Если ваших характеристик нет в предложенном списке, напишите <br />
          <ActionLink onClick={onSupportRequestLinkClick}>в поддержку</ActionLink>.
          <br />
          Как только администраторы сайта добавят характеристику мы пришлем вам сообщение и вы
          сможете создать товар.
          <br /> А пока вернитесь в Шаг 1 и опишите ваши характеристики в поле “Описание товара”
        </ModalHelperTextWrapper>
        <Subtitle>Выбранные характеристики товара:</Subtitle>
        {checkedProperties.length ? (
          <SelectedPropertiesWrapper>
            {checkedProperties.map(({ value, label }) => (
              <Button
                label={label}
                variant="confirm"
                shape="extra-rounded"
                iconType="trailing"
                icon={
                  <Icon
                    name="close"
                    $color="white"
                    $size={14}
                    onClick={() => onRemoveSelectedProperty(value)}
                    data-testid={`checked-property-${value}-remove`}
                  />
                }
                key={value}
                testId={`checked-property-${value}`}
                $mb={12}
                $mr={12}
              />
            ))}
          </SelectedPropertiesWrapper>
        ) : (
          <NoSelectedProperties data-testid="no-selected-properties">
            Нет выбранных характеристик товара
          </NoSelectedProperties>
        )}
      </div>
      <ActionsWrapper>
        <Button label="Применить" testId="select-properties-submit-button" onClick={onSubmit} />
      </ActionsWrapper>
    </ModalWrapper>
  );
};

export default SelectPropertiesModal;
