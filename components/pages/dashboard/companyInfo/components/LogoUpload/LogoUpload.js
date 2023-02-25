import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Photo from 'components/shared/molecules/Photos/Photo';
import RejectComment from 'components/shared/atoms/RejectComment';
import UploadAvatarModal from 'components/shared/molecules/UploadAvatarModal';
import GenerateLogoButton from 'components/shared/molecules/GenerateLogoButton';

import { useModal } from '@ebay/nice-modal-react';
import { RejectCommentWrapper } from '../CompanyInfoForm/styled';

import { AddLogoCompanyWrapper, LogoWrapper, ErrorWrapper } from './styled';

const LogoUpload = ({ name, setFieldValue, values }) => {
  const { logo, logoRemoteUrl, officialName, rejectionComments, isRejectedCompany } = values;
  const { logo: logoComment } = rejectionComments || {};
  const editable = !!(!isRejectedCompany || logoComment);

  const [temporaryLogoUrl, setTemporaryLogoUrl] = useState(logoRemoteUrl);

  const [_, __, { setTouched }] = useField(name);

  const onAddLogo = (uploadedLogo, url) => {
    setTemporaryLogoUrl(url);
    setFieldValue(name, uploadedLogo);
  };

  const onRemoveLogo = () => {
    setFieldValue(name, null);
    setFieldValue('logoRemoteUrl', null);
    setTemporaryLogoUrl(null);
    setTouched(true);
  };

  const cropAvatarModal = useModal(UploadAvatarModal);
  const openCropAvatarModal = () => cropAvatarModal.show({ onSubmit: onAddLogo, rounded: false });

  return (
    <>
      {!!logoComment && (
        <RejectCommentWrapper>
          <RejectComment comment={logoComment} />
        </RejectCommentWrapper>
      )}
      <AddLogoCompanyWrapper>
        {editable ? <span>Редактировать логотип компании</span> : <span>Логотип компании</span>}
        <LogoWrapper>
          {logoRemoteUrl || logo ? (
            <Photo
              url={logo ? temporaryLogoUrl : logoRemoteUrl}
              name={name}
              onRemovePhoto={onRemoveLogo}
              editable={editable}
            />
          ) : (
            <Button
              testId="logo-company-modal-button"
              variant="dashed-primary"
              size="extra-large"
              shape="extra-rounded"
              iconType="only"
              onClick={openCropAvatarModal}
              icon={<Icon name="camera" $color="blue" />}
            />
          )}
          <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
        </LogoWrapper>
        {!logo && !logoRemoteUrl && (
          <GenerateLogoButton
            name={name}
            word={officialName}
            setLogo={setTemporaryLogoUrl}
            setFieldValue={setFieldValue}
          />
        )}
      </AddLogoCompanyWrapper>
    </>
  );
};

export default LogoUpload;
