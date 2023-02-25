import React, { useState } from 'react';
import { useFormikContext, ErrorMessage, FormikProps } from 'formik';

import { TFile, TUploadedFile } from 'config/types';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Photos from 'components/shared/molecules/Photos';
import FileInput from 'components/shared/molecules/FileInput';

import { TFormValues } from '../CreateReturnedShipment/fields';

import { AddFileWrapper, ErrorWrapper, UploadFilesDescription } from './styled';

type TUploadFilesReturnShipment = {
  name: string;
  dispute: DisputeFragment;
};

const UploadFilesReturnShipment = ({ name, dispute }: TUploadFilesReturnShipment) => {
  const { setFieldValue, values }: FormikProps<TFormValues> = useFormikContext();

  const [loading, setLoading] = useState(false);
  const [temporaryUrl, setTemporaryUrl] = useState<TFile[]>(
    dispute.returnedShipment?.attachments.map(({ id, attachmentUrl, originalFilename }) => ({
      id,
      url: attachmentUrl,
      metadata: { filename: originalFilename || 'attachment' },
    })) || [],
  );

  const limitPhotos = 10;
  const islimitPhotosExceeded = values.attachments.length >= limitPhotos;

  const onRemoveFile = (imageId: string) => {
    setTemporaryUrl(temporaryUrl.filter(item => item.id !== imageId));
    setFieldValue(
      name,
      values.attachments.filter(({ id }) => id !== imageId),
    );
  };

  const onChange = (uploadedFiles: TUploadedFile[]) => {
    setTemporaryUrl([
      ...temporaryUrl,
      ...uploadedFiles.map(({ uploadedFile, url }) => ({
        id: uploadedFile.id,
        url,
        metadata: { filename: uploadedFile.metadata.filename },
      })),
    ]);
    setFieldValue(name, [
      ...values.attachments,
      ...uploadedFiles.map(({ uploadedFile }) => ({
        attachment: uploadedFile,
        id: uploadedFile.id,
      })),
    ]);
  };

  return (
    <>
      <AddFileWrapper>
        {!islimitPhotosExceeded && (
          <Button
            variant="dashed-primary"
            size="extra-large"
            shape="extra-rounded"
            iconType="only"
            icon={<Icon name="camera" $color="blue" />}
            $mr={12}
          >
            <FileInput
              name={`input-button-${name}`}
              testId={`input-button-${name}`}
              action={onChange}
              setLoading={setLoading}
              format={['photo', 'pdf']}
              disabled={loading}
              limitUpload={limitPhotos - values.attachments.length}
            />
          </Button>
        )}
        <Photos onRemovePhoto={onRemoveFile} images={temporaryUrl} loading={loading} />
      </AddFileWrapper>
      <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>

      <UploadFilesDescription>
        <div>Доступные форматы загрузки: jpeg, png, pdf, bmp</div>
        <div>Размер загружаемых файлов не должен превышать 2 Мб/файл или фото</div>
      </UploadFilesDescription>
    </>
  );
};

export default UploadFilesReturnShipment;
