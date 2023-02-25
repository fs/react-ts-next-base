import React, { FC, useState } from 'react';
import { ErrorMessage, useField } from 'formik';

import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import RejectComment from 'components/shared/atoms/RejectComment';

import { TFile, TUploadedFile } from 'config/types';
import { RejectCommentWrapper } from '../CompanyInfoForm/styled';
import { AddFileWrapper, AddPhotoButtonWrapper, ErrorWrapper } from './styled';
import { TAcceptFilesUploadProps } from './types';

const AcceptFilesUpload: FC<TAcceptFilesUploadProps> = ({
  name,
  setFieldValue = () => {},
  values,
}) => {
  const { companyConfirmationRecords, rejectionComments, isRejectedCompany } = values;
  const { companyConfirmationRecords: comment } = rejectionComments || {};
  const editable = !!(!isRejectedCompany || comment);
  const limitPhotos = 10;
  const islimitPhotosExceeded = values[name].length >= limitPhotos;
  const temporaryUrl = companyConfirmationRecords.map(
    ({
      attachmentRemoteUrl,
      url,
      attachment: {
        id,
        metadata: { filename },
      },
    }): TFile => ({
      id,
      url: attachmentRemoteUrl || url,
      metadata: { filename },
    }),
  );
  const [loading, setLoading] = useState(false);

  const [_, __, { setTouched }] = useField(name);

  const onRemoveFile = (imageId: string) => {
    setTouched(true);
    setFieldValue(
      name,
      companyConfirmationRecords.filter(({ attachment }) => attachment.id !== imageId),
    );
  };

  const onChange = (uploadedFiles: TUploadedFile[]) => {
    setTouched(true);
    setFieldValue(name, [
      ...companyConfirmationRecords,
      ...uploadedFiles.map(({ uploadedFile, url }) => ({ url, attachment: uploadedFile })),
    ]);
  };

  return (
    <>
      {!!(isRejectedCompany && comment) && (
        <RejectCommentWrapper>
          <RejectComment comment={comment} />
        </RejectCommentWrapper>
      )}
      <AddFileWrapper>
        {editable && !islimitPhotosExceeded ? (
          <AddPhotoButtonWrapper>
            <AddPhotosModal
              testId={`add-files-modal--${name}`}
              loading={loading}
              setLoading={setLoading}
              onChange={onChange}
              onRemovePhoto={onRemoveFile}
              temporaryUrl={temporaryUrl}
              isDisabled={false}
              documentFormats={['photo', 'video', 'pdf']}
              limitUpload={limitPhotos - values[name].length}
            />
          </AddPhotoButtonWrapper>
        ) : (
          !companyConfirmationRecords.length && 'Отсутствуют'
        )}
        <Photos
          loading={loading}
          images={temporaryUrl}
          onRemovePhoto={onRemoveFile}
          editable={editable}
          testId="list-photos-companyConfirmationRecords"
        />
      </AddFileWrapper>
      <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </>
  );
};

export default AcceptFilesUpload;
