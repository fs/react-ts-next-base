import { ChangeEvent, FC, useMemo, useState } from 'react';
import type { FormikHelpers } from 'formik';

import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useUpdateUser } from 'lib/apollo/hooks/actions/user';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';

import { ImageUploader } from 'graphql/types';

import ProfileFormContent from './ProfileFormContent';

import { TFormValues, TProfileForm } from './types';

const ProfileForm: FC<TProfileForm> = ({ user }) => {
  const { setSuccess } = useNotifier();
  const [updateUser] = useUpdateUser({
    onSubmit: () => setSuccess('Profile updated successfully'),
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

    let uploadedAvatar: ImageUploader | undefined;
    if (avatar) {
      const presignData = await presignFile({ type: avatar.type, filename: avatar.name });

      if (!presignData) {
        throw new Error('Unsigned file');
      }

      uploadedAvatar = await uploadFile(presignData, avatar);
    }
    await updateUser({ ...values, avatar: uploadedAvatar });

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
