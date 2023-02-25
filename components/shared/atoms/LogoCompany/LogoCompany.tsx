import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import UploadAvatarModal from 'components/shared/molecules/UploadAvatarModal';

import { Uploader } from 'graphql/types';
import { useModal } from '@ebay/nice-modal-react';
import { useUpdateCompanyLogo } from 'lib/apollo/hooks/actions/companies';

import { TLogoCompany } from './types';
import { LogoWrapper, ImageWrapper, Logo, EditLogo } from './styled';

const LogoCompany = ({ edit = false, company, $width = 'auto' }: TLogoCompany) => {
  const { id: companyId, officialName, logoUrl } = company || {};

  const [updateCompanyLogo] = useUpdateCompanyLogo();
  const onEditCompanyLogo = async (uploadedLogo: Uploader) => {
    await updateCompanyLogo({ logo: uploadedLogo, companyId });
  };

  const cropAvatarModal = useModal(UploadAvatarModal);
  const openCropAvatarModal = () =>
    cropAvatarModal.show({ onSubmit: onEditCompanyLogo, rounded: false });

  return (
    <LogoWrapper edit={edit}>
      <ImageWrapper>
        <Logo $width={$width} alt={`${officialName}`} src={logoUrl} />
      </ImageWrapper>
      {edit && (
        <EditLogo>
          <Button
            testId="edit-logo-company-button"
            shape="circle"
            icon={<Icon name="pencil" $color="grey" $size={14} />}
            iconType="only"
            variant="hollow"
            onClick={openCropAvatarModal}
          />
        </EditLogo>
      )}
    </LogoWrapper>
  );
};

export default LogoCompany;
