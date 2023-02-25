import React, { useState, useEffect } from 'react';
import NiceModal from '@ebay/nice-modal-react';

import useNotifier from 'hooks/useNotifier';
import useCurrentUser from 'hooks/useCurrentUser';
import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import {
  useCreateCompanyLocations,
  useUpdateCompanyLocation,
} from 'lib/apollo/hooks/actions/companyLocation';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { VERIFIED } from 'config/constants/status';

import ModalWindow from 'components/shared/atoms/ModalWindow';
import Loader from 'components/shared/atoms/Loader';
import GeolocationModal from 'components/shared/molecules/Modal/GeolocationModal';

import DeliveryAddressModalForm from './DeliveryAddressModalForm';

import { Address, StyledLink } from './styled';

const DeliveryAddressModal = ({ values, setFieldValue }) => {
  const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(values?.address);
  const { city, setCity } = useCity();
  const { user, isGuest } = useCurrentUser();

  const { mainCompany } = user || {};
  const { id: mainCompanyId, legalForm, officialName } = mainCompany || {};
  const companyName = `${legalForm?.shortName} “${officialName}”`;

  const {
    locations,
    loading: loadingLocation,
    refetch: refetchLocations,
  } = useCompanyLocations({
    companyId: mainCompanyId,
    statuses: [VERIFIED],
    skip: isGuest,
  });
  const [createCompanyLocations] = useCreateCompanyLocations({
    companyId: mainCompanyId,
    onSubmit: refetchLocations,
  });
  const [updateCompanyLocation] = useUpdateCompanyLocation(mainCompanyId);
  const { setError } = useNotifier();

  const clearDeliveryFields = () => {
    setFieldValue('deliveryMethod', null);
    setFieldValue('deliveryService', null);
    setFieldValue('pickupDate', null);
    setFieldValue('deliveryPoint', null);
  };

  const onSelectAddress = location => {
    setFieldValue('address', location);
    clearDeliveryFields();
    setIsOpenModalAddress(false);
  };

  const onCloseModalAddress = show => {
    setIsOpenModalAddress(show);
    setSelectedLocation(values?.address || null);
  };

  const onAddNewAddress = async submitValues => {
    const { companyLocationId, cityId, address, postcode, phoneNumber, comment } = submitValues;
    let result;
    const location = {
      cityId,
      address,
      postcode,
      phoneNumber,
      comment,
      companyLicenses: [],
    };

    try {
      result = companyLocationId
        ? await updateCompanyLocation({ companyLocationId, ...location })
        : await createCompanyLocations({ companyLocations: [location] });
    } catch (error) {
      setError(error);
    }

    if (result) {
      const newLocation = companyLocationId ? result : result[0];
      setFieldValue('address', newLocation);
      setSelectedLocation(newLocation);
    }
  };

  useEffect(() => {
    if (!loadingLocation) {
      const defaultLocation = isGuest
        ? { id: city.id, address: `г. ${city.name}` }
        : locations.find(({ main }) => main);
      setFieldValue('address', defaultLocation);
      setSelectedLocation(defaultLocation);
    }
  }, [loadingLocation, city.id, city.name]);

  const showGuestModal = () =>
    NiceModal.show(GeolocationModal, {
      setCity,
      initialStep: 'CHOOSE_LOCATION',
      initialValue: city ? { label: city.name, value: city.id } : null,
    });

  return (
    <>
      {!loadingLocation ? (
        <>
          {values.address && (
            <Address data-testid="current-delivery-address">{values?.address.address}</Address>
          )}
          <StyledLink
            onClick={isGuest ? showGuestModal : () => setIsOpenModalAddress(true)}
            data-testid="select-delivery-address-modal"
          >
            {values.address ? 'Изменить' : <strong>Выберите адрес доставки</strong>}
          </StyledLink>
        </>
      ) : (
        <Loader variant="simple" size={24} />
      )}

      <ModalWindow
        isOpen={isOpenModalAddress}
        setIsOpen={onCloseModalAddress}
        $width="45.75rem"
        padding={0}
      >
        <DeliveryAddressModalForm
          companyName={companyName}
          onAddNewAddress={onAddNewAddress}
          locations={locations}
          onSelectAddress={onSelectAddress}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </ModalWindow>
    </>
  );
};

export default DeliveryAddressModal;
