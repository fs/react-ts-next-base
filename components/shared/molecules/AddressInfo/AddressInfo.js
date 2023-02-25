import React, { useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { ADMIN_ADDRESS, ADMIN_COMPANY } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import ActionLink from 'components/shared/atoms/ActionLink';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { phoneFormatter } from 'helpers';
import { getStatus, REJECTED } from 'config/constants/status';

import AddressCheckStatus from './AddressCheckStatus';

import {
  ItemWrapper,
  City,
  Text,
  Comment,
  Description,
  Actions,
  TooltipWrapper,
  Licenses,
  LicensesList,
  ActionsWrapper,
  MainAddressText,
  EditActions,
  DescriptionWrapper,
} from './styled';

const AddressInfo = ({
  location,
  isBuyer,
  rounded,
  isAdminAddresses,
  onAddressEdit,
  onAddressDestroy,
  onSelectAddressAsMain,
}) => {
  const {
    id,
    address,
    city,
    comment,
    phoneNumber,
    main,
    companyLicenses,
    postcode,
    canBeDestroyed,
    canBeUpdated,
    status,
    company: { officialName, id: companyId },
    verificationDeadlineAt,
  } = location;

  const locationAddress = [address, postcode].filter(Boolean).join(', ');

  const isVerified = getStatus(status);
  const isRejected = status === REJECTED;

  const destroyAddressModal = useModal(SimpleModal);
  const selectAddressAsMainModal = useModal(SimpleModal);

  const onDestroyButtonClick = async () => {
    await destroyAddressModal.show({
      roundedButton: isAdminAddresses,
      onSubmit: async () => {
        await onAddressDestroy(id);
      },
      title: 'Удаление адреса',
      description: 'Вы уверены, что хотите удалить выбранный адрес?',
    });
  };

  const onSelectAddressAsMainClick = async () => {
    await selectAddressAsMainModal.show({
      variant: 'confirm',
      onSubmit: async () => {
        await onSelectAddressAsMain(id);
      },
      title: 'Изменение основного адреса',
      description: 'Вы уверены, что хотите изменить основной адрес?',
    });
  };

  const actionButtons = useMemo(() => {
    if (isAdminAddresses) {
      return (
        <>
          {isVerified || isRejected ? (
            <Button
              size="small"
              $width="8.75rem"
              label="Подробнее"
              shape="rounded"
              href={{ pathname: ADMIN_ADDRESS, query: { addressId: id } }}
            />
          ) : (
            <Button
              variant="change"
              size="small"
              $width="8.75rem"
              label="Проверить"
              shape="rounded"
              href={{ pathname: ADMIN_ADDRESS, query: { addressId: id } }}
            />
          )}
        </>
      );
    }

    return (
      <EditActions>
        <TooltipWrapper>
          <Tooltip
            active={!canBeDestroyed}
            offset={[0, 4]}
            text="Удаление выбранного адреса невозможно, так как он уже используется в ваших товарах."
          >
            <Button
              variant="hollow"
              label="Удалить адрес"
              size="small"
              onClick={onDestroyButtonClick}
              icon={<Icon $color="grey" $size={16} name="trash-bin" />}
              iconType="leading"
              disabled={!canBeDestroyed}
              testId="destroy-location-button"
            />
          </Tooltip>
        </TooltipWrapper>
        {(isVerified || isRejected) && (
          <TooltipWrapper>
            <Tooltip
              active={!canBeUpdated}
              offset={[0, 4]}
              text="Редактирование выбранного адреса невозможно, так как он уже используется в ваших товарах."
            >
              <Button
                variant="hollow-change"
                label="Редактировать"
                size="small"
                icon={<Icon $color="orange" $size={20} name="pencil-square" />}
                iconType="leading"
                onClick={() => onAddressEdit(location)}
                disabled={!canBeUpdated}
              />
            </Tooltip>
          </TooltipWrapper>
        )}
      </EditActions>
    );
  });

  return (
    <ItemWrapper
      rounded={rounded}
      isMain={main && isBuyer}
      status={status}
      data-cy="address-item"
      data-testid="location-info-item"
      isAdminAddresses={isAdminAddresses}
    >
      <DescriptionWrapper>
        {!isVerified && (
          <AddressCheckStatus
            isAdminAddresses={isAdminAddresses}
            verificationDeadlineAt={verificationDeadlineAt}
            rounded={rounded}
            status={status}
          />
        )}
        <Description>
          {isAdminAddresses && (
            <ActionLink
              label={officialName}
              href={{ pathname: ADMIN_COMPANY, query: { companyId } }}
              $color="black"
              bold
              $size={14}
              style={{ display: 'block' }}
              $mb={16}
            />
          )}
          <City>{city?.name}</City>
          <Text>{locationAddress}</Text>
          {phoneNumber && <Text>Контактный номер: {phoneFormatter(phoneNumber)}</Text>}
          {comment && (
            <Comment title={comment?.length > 25 ? comment : ''}>Комментарий: {comment}</Comment>
          )}
        </Description>
      </DescriptionWrapper>

      <Actions>
        {!!companyLicenses.length && (
          <Licenses>
            <TooltipWrapper>
              <Tooltip
                text={
                  <LicensesList>
                    {companyLicenses.map(({ number }, i) => (
                      <div key={i}>Лицензия №{number}</div>
                    ))}
                  </LicensesList>
                }
                $width="auto"
              >
                <strong>На данном адресе есть лицензии</strong>
              </Tooltip>
            </TooltipWrapper>
          </Licenses>
        )}

        <ActionsWrapper>{actionButtons}</ActionsWrapper>

        {isBuyer && isVerified && (
          <>
            {main ? (
              <MainAddressText>Адрес выбран как основной</MainAddressText>
            ) : (
              <Button
                variant="neutral"
                label="Выбрать адрес как основной"
                $width="100%"
                size="small"
                shape="rounded"
                onClick={onSelectAddressAsMainClick}
                testId="select-main-location-button"
              />
            )}
          </>
        )}
      </Actions>
    </ItemWrapper>
  );
};

export default AddressInfo;
