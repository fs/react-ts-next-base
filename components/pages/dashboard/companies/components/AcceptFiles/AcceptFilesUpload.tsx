import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage, useField } from 'formik';

import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import { TFile, TUploadedFile } from 'config/types';

import { AddFileWrapper, ErrorWrapper } from './styled';
import { TAcceptFilesUploadProps } from './types';

const AcceptFilesUpload: FC<TAcceptFilesUploadProps> = ({ name }) => {
  const [{ value: companyConfirmationRecords }, , { setValue }] = useField(name);
  const [temporaryUrl, setTemporaryUrl] = useState<TFile[]>(
    companyConfirmationRecords.map(({ attachment }: { attachment: TFile }) => ({
      ...attachment,
    })),
  );
  const [loading, setLoading] = useState(false);
  const limitPhotos = 10;
  const islimitPhotosExceeded = companyConfirmationRecords.length >= limitPhotos;

  const onRemoveFile = (imageId: string) => {
    setTemporaryUrl(temporaryUrl.filter(item => item.id !== imageId));
    setValue(
      companyConfirmationRecords.filter(
        ({ attachment }: { attachment: TFile }) => attachment.id !== imageId,
      ),
    );
  };

  const onChange = async (uploadedFiles: TUploadedFile[]) => {
    setTemporaryUrl([
      ...temporaryUrl,
      ...uploadedFiles.map(({ uploadedFile, url }) => ({
        id: uploadedFile.id,
        url,
        metadata: { filename: uploadedFile.metadata.filename },
      })),
    ]);
    setValue([
      ...companyConfirmationRecords,
      ...uploadedFiles.map(({ uploadedFile }) => ({ attachment: uploadedFile })),
    ]);
  };

  useEffect(
    () => () => {
      setTemporaryUrl([]);
      setValue([]);
    },
    [],
  );

  return (
    <>
      <AddFileWrapper>
        {!islimitPhotosExceeded && (
          <AddPhotosModal
            testId={`add-files-modal--${name}`}
            loading={loading}
            setLoading={setLoading}
            onChange={onChange}
            onRemovePhoto={onRemoveFile}
            isDisabled={false}
            temporaryUrl={temporaryUrl}
            documentFormats={['photo', 'video', 'pdf']}
            limitUpload={limitPhotos - companyConfirmationRecords.length}
          />
        )}
        <Photos
          loading={loading}
          images={temporaryUrl}
          onRemovePhoto={onRemoveFile}
          $ml={16}
          testId="list-photos-companyConfirmationRecords"
        />
      </AddFileWrapper>
      <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </>
  );
};

export default AcceptFilesUpload;
