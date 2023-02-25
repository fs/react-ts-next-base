import React, { useState } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import ActionLink from 'components/shared/atoms/ActionLink';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import SelectPropertiesModal from './SelectPropertiesModal';
import { Subtitle, Row, Description, Wrapper } from './styled';

const SelectProperties = ({
  disabledPropertiesSelect,
  properties,
  selectedProperties,
  setSelectedProperties,
  setFieldValue,
  values,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  return (
    <Wrapper>
      <Subtitle>Параметры товара</Subtitle>
      <Row>
        <Button
          label="Выбрать характеристики товара"
          shape="extra-rounded"
          size="extra-large"
          $width="18rem"
          onClick={() => setIsOpen(true)}
          testId="select-properties-modal-button"
        />
        <Description>
          Если ваших характеристик нет в предложенном списке, напишите{` `}
          <ActionLink onClick={onSupportRequestLinkClick}>в поддержку</ActionLink>
          <br />
          Как только администраторы сайта добавят, указанную вами, характеристику мы пришлем вам
          сообщение и вы сможете создать товар
        </Description>
      </Row>
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} $width="31.875rem">
        <SelectPropertiesModal
          disabledPropertiesSelect={disabledPropertiesSelect}
          properties={properties}
          setIsOpen={setIsOpen}
          selectedProperties={selectedProperties}
          setSelectedProperties={setSelectedProperties}
          setFieldValue={setFieldValue}
          values={values}
        />
      </ModalWindow>
    </Wrapper>
  );
};

export default SelectProperties;
