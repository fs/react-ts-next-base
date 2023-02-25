import React, { useState } from 'react';

import { phoneFormatter } from 'helpers';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import MapLocationModal from 'components/shared/organisms/MapLocationModal';

import { AddAddressButton } from '../../../dashboard/companyAddresses/components/Addresses/styled';
import {
  DeliveryAddressContent,
  Title,
  Subtitle,
  AddressesList,
  ActionsWrapper,
  Description,
  AddressListItem,
  LocationDescription,
  City,
  Text,
  Comment,
} from './styled';

const DeliveryAddressModalForm = ({
  companyName,
  locations,
  onAddNewAddress,
  selectedLocation,
  setSelectedLocation,
  onSelectAddress,
}) => {
  const [isShowMapModal, setIsShowMapModal] = useState(false);
  const [editableLocation, setEditableLocation] = useState(null);

  const onAddressEdit = location => {
    if (!location || !location.id) return;

    setEditableLocation(location);
    setIsShowMapModal(true);
  };

  const changeVisibilityAddressModal = isModalVisible => {
    setIsShowMapModal(isModalVisible);

    if (!isModalVisible) setEditableLocation(null);
  };

  return (
    <>
      <DeliveryAddressContent>
        <Title data-testid="delivery-address-modal-title">Выберите адрес доставки</Title>
        <Subtitle>
          Варианты доставки и скорость доставки могут различаться <br />
          для разных мест
        </Subtitle>
        <AddressesList>
          <AddAddressButton onClick={() => setIsShowMapModal(true)}>
            <Icon name="plus" $size={30} $color="greyCC" $mb={16} />
            <span>Добавить адрес</span>
          </AddAddressButton>

          {locations.map((location, index) => {
            const { id, address, phoneNumber, comment, city } = location;

            return (
              <AddressListItem
                selected={id === selectedLocation?.id}
                key={id}
                onClick={() => setSelectedLocation(location)}
                data-testid={`delivery-address-item-${index}`}
              >
                <LocationDescription>
                  <City>{city?.name}</City>
                  <Text>{address}</Text>
                  {phoneNumber && <Text>Контактный номер: {phoneFormatter(phoneNumber)}</Text>}
                  {comment && (
                    <Comment title={comment?.length > 25 ? comment : ''}>
                      Комментарий: {comment}
                    </Comment>
                  )}
                </LocationDescription>
                <Button
                  label="Редактировать"
                  variant="hollow-change"
                  iconType="leading"
                  icon={<Icon name="pencil-square" $color="orange" $size={20} $mr={12} />}
                  size="small"
                  $ml={-16}
                  onClick={() => onAddressEdit(location)}
                />
              </AddressListItem>
            );
          })}
        </AddressesList>
      </DeliveryAddressContent>
      <ActionsWrapper>
        <Description>
          Напоминаем! Вы покупаете от компании {companyName}. Если это ошибка,
          <br /> смените компанию в Личном кабинете или в боковом меню шапки сайта.
        </Description>
        <Button
          label="Подтвердить"
          variant="confirm"
          type="button"
          testId="change-delivery-address-submit-button"
          onClick={() => onSelectAddress(selectedLocation)}
        />
      </ActionsWrapper>

      <ModalWindow isOpen={isShowMapModal} setIsOpen={changeVisibilityAddressModal} $width="45rem">
        <MapLocationModal
          setIsShowMapModal={changeVisibilityAddressModal}
          onAddAddress={onAddNewAddress}
          location={editableLocation}
        />
      </ModalWindow>
    </>
  );
};

export default DeliveryAddressModalForm;
