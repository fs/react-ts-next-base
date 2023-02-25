import React, { FC, useState } from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input/Input';
import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import { TFile, TUploadedFile } from 'config/types';

import { Row, Col } from '../styled';
import {
  LicenseWrapper,
  AddPhoto,
  TextPhoto,
  AddPhotoButtonWrapper,
  RemoveLicense,
} from './styled';
import { TLicenseProps } from './types';

const License: FC<TLicenseProps> = ({ values, setFieldValue = () => {}, licenseIndex, remove }) => {
  const fieldName = `companyLicenses.${licenseIndex}`;
  const licenseValues = values.companyLicenses[`${licenseIndex}`] as {
    companyLicensePhotos: { image: TFile }[];
    initial: any;
    number: any;
  };
  const [loading, setLoading] = useState(false);
  const [temporaryUrls, setTemporaryUrls] = useState<TFile[]>(
    licenseValues.companyLicensePhotos.map(({ image: { id, url, metadata } }) => ({
      id,
      url,
      metadata,
    })),
  );
  const limitPhotos = 7;
  const islimitPhotosExceeded = temporaryUrls.length >= limitPhotos;

  const onRemovePhoto = (imageId: string) => {
    setTemporaryUrls(temporaryUrls.filter(item => item.id !== imageId));
    setFieldValue(
      `${fieldName}.companyLicensePhotos`,
      licenseValues.companyLicensePhotos.filter(({ image }) => image.id !== imageId),
    );
  };

  const onChange = (uploadedFiles: TUploadedFile[]) => {
    setTemporaryUrls([
      ...temporaryUrls,
      ...uploadedFiles.map(({ uploadedFile, url }) => ({
        id: uploadedFile.id,
        url,
        metadata: { filename: uploadedFile.metadata.filename },
      })),
    ]);
    setFieldValue(`${fieldName}.companyLicensePhotos`, [
      ...(licenseValues.companyLicensePhotos || []),
      ...uploadedFiles.map(({ uploadedFile }) => ({ image: uploadedFile })),
    ]);
  };

  const onRemoveLicense = () => {
    if (licenseValues.initial) {
      setFieldValue(`${fieldName}.destroy`, true);
    } else remove(licenseIndex);
  };

  return (
    <LicenseWrapper>
      <Row>
        <Col>
          <Input
            type="text"
            name={`${fieldName}.number`}
            testId={`${fieldName}.number`}
            title="Впишите номер лицензии"
            placeholder="Впишите номер лицензии"
          />
        </Col>
      </Row>

      <AddPhoto>
        <TextPhoto isDisabled={!licenseValues.number}>
          Фото
          <br /> лицензии
        </TextPhoto>
        {!islimitPhotosExceeded && (
          <AddPhotoButtonWrapper>
            <AddPhotosModal
              testId="photo-license-modal-button"
              loading={loading}
              setLoading={setLoading}
              onChange={onChange}
              onRemovePhoto={onRemovePhoto}
              temporaryUrl={temporaryUrls}
              documentFormats={['photo']}
              isDisabled={!licenseValues.number}
              limitUpload={limitPhotos - temporaryUrls.length}
            />
          </AddPhotoButtonWrapper>
        )}
        <Photos loading={loading} images={temporaryUrls} onRemovePhoto={onRemovePhoto} />
      </AddPhoto>
      <RemoveLicense>
        <Button
          label="Удалить лицензию"
          variant="hollow"
          size="small"
          iconType="trailing"
          icon={<Icon name="trash-bin" $color="grey" $size={24} />}
          onClick={onRemoveLicense}
          testId="remove-license-button"
        />
      </RemoveLicense>
    </LicenseWrapper>
  );
};

export default License;
