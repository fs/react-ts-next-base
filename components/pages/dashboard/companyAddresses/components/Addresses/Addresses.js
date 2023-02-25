import React, { useState } from 'react';
import useRouter from 'hooks/useRouter';

import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import {
  useCreateCompanyLocations,
  useUpdateCompanyLocation,
  useDestroyCompanyLocation,
  useMarkCompanyLocationAsMain,
} from 'lib/apollo/hooks/actions/companyLocation';
import useNotifier from 'hooks/useNotifier';

import { DASHBOARD_COMPANY_ADDRESSES } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import TutorialModal from 'components/shared/atoms/TutorialModal';
import AddressInfo from 'components/shared/molecules/AddressInfo';

import { BUYER } from 'config/constants/directions';
import AddressModal from '../AddressModal';

import { Wrapper, Title, AddressesList, AddAddressButton } from './styled';

const Addresses = ({ companyId, company, query }) => {
  const { newCompany, isFirst } = query;
  const { pushRoute } = useRouter();

  const [isOpenTutorial, setIsOpenTutorial] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(!!newCompany);
  const [editableLocation, setEditableLocation] = useState(null);

  const { locations, refetch: refetchLocations } = useCompanyLocations({ companyId });
  const [createCompanyLocations] = useCreateCompanyLocations({
    companyId,
    onSubmit: refetchLocations,
  });
  const [updateCompanyLocation] = useUpdateCompanyLocation(companyId);
  const [destroyCompanyLocation] = useDestroyCompanyLocation(companyId);
  const [markCompanyLocationAsMain] = useMarkCompanyLocationAsMain(companyId);

  const { setError } = useNotifier();

  const { direction } = company;
  const isBuyer = direction === BUYER;

  const onAddressEdit = location => {
    if (!location || !location.id) return;

    setEditableLocation(location);
    setIsAddressModalVisible(true);
  };

  const changeVisibilityAddressModal = isModalVisible => {
    setIsAddressModalVisible(isModalVisible);

    if (!isModalVisible) {
      setIsOpenTutorial(!!isFirst);
      setEditableLocation(null);
    }
  };

  const onSaveAddress = async ({
    companyLocationId,
    cityId,
    address,
    companyLicenses,
    postcode,
    phoneNumber,
    comment,
  }) => {
    const location = {
      cityId,
      address,
      postcode,
      phoneNumber,
      comment,
      companyLicenses: companyLicenses.filter(({ number }) => !!number),
    };

    try {
      companyLocationId
        ? await updateCompanyLocation({ companyLocationId, ...location })
        : await createCompanyLocations({ companyLocations: [location] });
    } catch (error) {
      setError(error);
    }
  };

  const closeModalTutorial = show => {
    setIsOpenTutorial(show);
    pushRoute({
      pathname: DASHBOARD_COMPANY_ADDRESSES,
      query: {
        ...query,
        isFirst: undefined,
        newCompany: undefined,
      },
    });
  };

  return (
    <Wrapper>
      <Title>Адреса</Title>

      <AddressesList>
        <AddressModal
          isAddressModalOpen={isAddressModalVisible}
          changeVisibilityAddressModal={changeVisibilityAddressModal}
          onSaveAddress={onSaveAddress}
          isBuyer={isBuyer}
          location={editableLocation}
        >
          <AddAddressButton data-cy="create-address-button">
            <Icon name="plus" $size={30} $color="greyCC" $mb={16} />
            <span>Добавить адрес</span>
          </AddAddressButton>
        </AddressModal>

        {locations.map(location => (
          <AddressInfo
            location={location}
            key={location.id}
            isBuyer={isBuyer}
            onAddressDestroy={destroyCompanyLocation}
            onSelectAddressAsMain={markCompanyLocationAsMain}
            onAddressEdit={onAddressEdit}
            rounded
          />
        ))}
      </AddressesList>

      <ModalWindow isOpen={isOpenTutorial} setIsOpen={closeModalTutorial} padding={0}>
        <TutorialModal />
      </ModalWindow>
    </Wrapper>
  );
};

export default Addresses;
