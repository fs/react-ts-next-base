import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import type { FormikHelpers } from 'formik';

import useNotifier from 'hooks/useNotifier';
import { useFileUpload } from 'hooks/useFileUpload';
import { useUpdateUser } from 'lib/apollo/hooks/actions/user';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';

import { ImageUploader } from 'graphql/types';

import ProfileFormContent from './ProfileFormContent';

import { TFormValues, TProfileForm } from './types';

const ProfileForm: FC<TProfileForm> = ({ user }) => {
  const { setSuccess, setError } = useNotifier();
  const [updateUser] = useUpdateUser({
    onSubmit: () => setSuccess('Пользователь успешно обновлен'),
  });
  const [presignFile] = usePresignFile();
  const [uploadFile] = useFileUpload();

  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  const temporaryUrl = useMemo(() => (avatar ? URL.createObjectURL(avatar) : null), [avatar]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = event;

    if (files === null) {
      setAvatar(undefined);
      return;
    }

    if (validity.valid) {
      setAvatar(files[0]);
    }
  };

  const onSubmit = async (values: TFormValues, { setSubmitting }: FormikHelpers<TFormValues>) => {
    setSubmitting(true);

    try {
      let uploadedAvatar: ImageUploader | undefined;
      if (avatar) {
        const presignData = await presignFile({ type: avatar.type, filename: avatar.name });

        if (!presignData) {
          throw new Error('Unsigned file');
        }

        uploadedAvatar = await uploadFile(presignData, avatar);
      }
      await updateUser({ ...values, avatar: uploadedAvatar });
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  };

  return (
    <ProfileFormContent
      temporaryUrl={temporaryUrl}
      user={user}
      onSubmit={onSubmit}
      handleAvatarChange={handleAvatarChange}
    />
  );
};
export default ProfileForm;
