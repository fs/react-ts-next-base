import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import { useModal } from '@ebay/nice-modal-react';

import { phoneFormatter } from 'helpers';
import { ADMIN_ADDRESSES, ADMIN_COMPANY } from 'config/routes';
import { NOT_VERIFIED, VERIFIED } from 'config/constants/status';

import {
  useAcceptCompanyLocation,
  useDestroyCustomerCompanyLocation,
  useRejectCompanyLocation,
} from 'lib/apollo/hooks/actions/companyLocation';

import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import ActionLink from 'components/shared/atoms/ActionLink';
import FilesSection from 'components/shared/molecules/FilesSection';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import { initialReasonValue, ModalInput, validationSchemaReason } from './ModalInput';

import {
  Title,
  Wrapper,
  Comment,
  ContactWrapper,
  AddressInfo,
  ButtonsWrapper,
  LicensesWrapper,
} from './styled';

const AddressCard = ({ location }) => {
  const { pushRoute } = useRouter();

  const {
    company: { officialName, legalForm, unofficialName, id: companyId },
    comment,
    address,
    status,
    postcode,
    phoneNumber,
    companyLicenses,
    id: companyLocationId,
    canBeDestroyed,
    city,
  } = location;
  const isVerified = status === VERIFIED;

  const onLocationChange = () => pushRoute(ADMIN_ADDRESSES);

  const [acceptCompanyLocation] = useAcceptCompanyLocation({ onSubmit: onLocationChange });
  const [rejectCompanyLocation] = useRejectCompanyLocation({ onSubmit: onLocationChange });
  const [destroyCompanyLocation] = useDestroyCustomerCompanyLocation({
    onSubmit: onLocationChange,
  });
  const ConfirmCompanyLocationModal = useModal(SimpleModal);
  const DestroyCompanyLocationModal = useModal(SimpleModal);
  const RejectCompanyLocationModal = useModal(SimpleModal);

  const showConfirmCompanyLocation = () => {
    ConfirmCompanyLocationModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await acceptCompanyLocation(companyLocationId);
      },
      title: 'Подтверждение адреса с лицензией',
      description: `Нажимая “Подтвердить”, вы добавите адрес с лицензией компании “${unofficialName}” на сайт`,
    });
  };

  const showDestroyCompanyLocation = () =>
    DestroyCompanyLocationModal.show({
      variant: 'alert',
      roundedButton: true,
      onSubmit: async () => {
        await destroyCompanyLocation(companyLocationId);
      },
      title: 'Удаление адреса с лицензией',
      description: (
        <>
          Нажимая “Подтвердить”, вы удалите у компании
          <b>{` ${legalForm?.shortName} “${officialName}”`}</b>
          <br />
          Адрес:
          <b>{` ${address}, ${postcode}`}</b>
        </>
      ),
    });

  const showRejectCompanyLocation = () => {
    RejectCompanyLocationModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async ({ rejectionReason }) => {
        await rejectCompanyLocation({ companyLocationId, rejectionReason });
      },
      title: 'Запросить изменения',
      description:
        'Нажимая “Подтвердить”, вы отправляете уведомление пользователю о том, что он должен отредактировать данные',
      form: {
        body: <ModalInput />,
        initialValues: initialReasonValue,
        validationSchema: validationSchemaReason,
      },
    });
  };

  const actionButtons = useMemo(() => {
    switch (status) {
      case NOT_VERIFIED:
        return (
          <>
            <Button
              label="Запросить изменения"
              variant="change"
              shape="rounded"
              size="small"
              onClick={showRejectCompanyLocation}
              testId="reject-location"
            />
            <Button
              $width="8.75rem"
              label="Подтвердить"
              variant="confirm"
              shape="rounded"
              size="small"
              onClick={showConfirmCompanyLocation}
              testId="accept-location"
            />
          </>
        );
      case VERIFIED:
        return (
          <Tooltip
            active={!canBeDestroyed}
            offset={[0, 4]}
            text="Удаление выбранного адреса невозможно, так как он используется в товарах компании."
          >
            <Button
              onClick={showDestroyCompanyLocation}
              $width="8.75rem"
              label="Удалить"
              variant="alert"
              shape="rounded"
              size="small"
              testId="destroy-location"
              disabled={!canBeDestroyed}
            />
          </Tooltip>
        );
      default:
        return <> </>;
    }
  }, [status]);

  return (
    <Wrapper isVerified={isVerified}>
      <ActionLink
        label={unofficialName}
        size={14}
        bold
        $color="black"
        data-testid="address-company-title"
        href={{ pathname: ADMIN_COMPANY, query: { companyId } }}
      />
      <AddressInfo>
        <ContactWrapper>
          <div> {city?.name} </div>
          <div> {address} </div>
          <div> {`Контактный номер: ${phoneFormatter(phoneNumber)}`}</div>
        </ContactWrapper>
        <Comment> {comment && `Комментарий: ${comment}`}</Comment>
      </AddressInfo>
      <Title> Лицензии: </Title>
      <LicensesWrapper>
        {companyLicenses.length
          ? companyLicenses.map(({ number, companyLicensePhotos, id }) => (
              <div key={id}>
                {`№ ${number}`}
                <FilesSection type="image" title="Фото лицензии" files={companyLicensePhotos} />
              </div>
            ))
          : 'На данном адресе нет лицензий'}
      </LicensesWrapper>
      <ButtonsWrapper>{actionButtons}</ButtonsWrapper>
    </Wrapper>
  );
};

export default AddressCard;
