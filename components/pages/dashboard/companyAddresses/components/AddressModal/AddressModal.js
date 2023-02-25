import React from 'react';

import ModalWindow from 'components/shared/atoms/ModalWindow';
import MapLocationModal from 'components/shared/organisms/MapLocationModal';

import { titles } from './constants';
import { StyledLink } from './styled';

const AddressModal = ({
  children,
  onSaveAddress,
  isBuyer,
  isAddressModalOpen,
  changeVisibilityAddressModal,
  location,
}) => {
  return (
    <>
      <StyledLink onClick={() => changeVisibilityAddressModal(true)}>{children}</StyledLink>
      <ModalWindow
        isOpen={isAddressModalOpen}
        setIsOpen={changeVisibilityAddressModal}
        $width="40rem"
      >
        <MapLocationModal
          withLicensesInfo
          location={location}
          onAddAddress={onSaveAddress}
          setIsShowMapModal={changeVisibilityAddressModal}
          customTitle={isBuyer ? titles.main.buyer : titles.main.seller}
          licenseTitle={isBuyer ? titles.license.buyer : titles.license.seller}
        />
      </ModalWindow>
    </>
  );
};

export default AddressModal;
