import React, { useState } from 'react';
import { ErrorMessage } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import Photo from 'components/shared/molecules/Photos/Photo';
import UploadAvatarModal from 'components/shared/molecules/UploadAvatarModal';
import GenerateLogoButton from 'components/shared/molecules/GenerateLogoButton';

import { useModal } from '@ebay/nice-modal-react';
import { AddLogoCompanyWrapper, AddPhotoButtonWrapper, LogoWrapper, ErrorWrapper } from './styled';

const LogoUpload = ({ setFieldValue, values }) => {
  const { logo, officialName } = values;
  const [temporaryLogoUrl, setTemporaryLogoUrl] = useState(null);

  const onAddLogo = (uploadedLogo, url) => {
    setTemporaryLogoUrl(url);
    setFieldValue('logo', uploadedLogo);
  };

  const onRemoveLogo = () => {
    setFieldValue('logo', null);
    setTemporaryLogoUrl(null);
  };

  const cropAvatarModal = useModal(UploadAvatarModal);
  const openCropAvatarModal = () => cropAvatarModal.show({ onSubmit: onAddLogo, rounded: false });

  return (
    <AddLogoCompanyWrapper>
      <span>Загрузите логотип компании</span>
      <AddPhotoButtonWrapper>
        <Button
          onClick={openCropAvatarModal}
          testId="logo-company-modal-button"
          variant="dashed-primary"
          size="extra-large"
          shape="extra-rounded"
          iconType="only"
          icon={<Icon name="camera" $color="blue" />}
        />
      </AddPhotoButtonWrapper>
      {logo && temporaryLogoUrl && (
        <LogoWrapper>
          <Photo url={temporaryLogoUrl} name="logo" onRemovePhoto={onRemoveLogo} />
        </LogoWrapper>
      )}
      {!logo && (
        <GenerateLogoButton
          name="logo"
          word={officialName}
          setLogo={setTemporaryLogoUrl}
          setFieldValue={setFieldValue}
        />
      )}
      <ErrorMessage name="logo">{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </AddLogoCompanyWrapper>
  );
};

export default LogoUpload;
