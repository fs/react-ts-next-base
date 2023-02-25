import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import {
  useCreatePublicSupportRequest,
  useCreateSupportRequest,
} from 'lib/apollo/hooks/actions/support';
import useCurrentUser from 'hooks/useCurrentUser';

import { TFile, TUploadedFile } from 'config/types';
import { SupportRequestPhotoInput } from 'graphql/types';

import ModalWindow from 'components/shared/atoms/ModalWindow';
import SupportRequestForm from './components/SupportRequestForm';

import { TSupportRequestModal, TFormValues } from './types';
import { Header } from './styled';

const SupportRequestModal = NiceModal.create<TSupportRequestModal>(
  ({ initialSubject = '', orderId, onSubmitRequest = () => {} }) => {
    const [temporaryUrls, setTemporaryUrls] = useState<TFile[]>([]);
    const [images, setImages] = useState<SupportRequestPhotoInput[]>([]);

    const { visible, remove } = useModal();
    const { isRegisteredUser } = useCurrentUser();

    const onCreateRequest = () => {
      remove();
      onSubmitRequest();
    };

    const [createPublicSupportRequest] = useCreatePublicSupportRequest({
      onSubmit: onCreateRequest,
    });
    const [createSupportRequest] = useCreateSupportRequest({ onSubmit: onCreateRequest });

    const onRemovePhoto = (imageId: string) => {
      setTemporaryUrls(temporaryPhotos => temporaryPhotos.filter(item => item.id !== imageId));
      setImages(photos =>
        photos.filter(({ image }: SupportRequestPhotoInput) => image?.id !== imageId),
      );
    };

    const onAddPhoto = (uploadedFiles: TUploadedFile[]) => {
      setTemporaryUrls(temporaryPhotos => [
        ...temporaryPhotos,
        ...uploadedFiles.map(({ uploadedFile, url }) => ({
          id: uploadedFile.id,
          url,
          metadata: { filename: uploadedFile.metadata.filename },
        })),
      ]);
      setImages((photos: Array<SupportRequestPhotoInput>) => [
        ...photos,
        ...uploadedFiles.map(({ uploadedFile }) => ({ image: uploadedFile })),
      ]);
    };

    const onSubmit = async (
      { email, message, subject }: TFormValues,
      { setSubmitting }: FormikHelpers<TFormValues>,
    ) => {
      !isRegisteredUser && email
        ? await createPublicSupportRequest({ email, message, subject, images })
        : await createSupportRequest({ message, subject, images, orderId });

      setSubmitting(false);
    };

    return (
      <ModalWindow isOpen={visible} setIsOpen={remove} $width="27.625rem">
        <Header data-testid="help-modal-title">Напишите в службу поддержки</Header>
        <SupportRequestForm
          isGuest={!isRegisteredUser}
          onSubmit={onSubmit}
          onRemovePhoto={onRemovePhoto}
          onAddPhoto={onAddPhoto}
          temporaryUrls={temporaryUrls}
          initialSubject={initialSubject}
        />
      </ModalWindow>
    );
  },
);

export default SupportRequestModal;
