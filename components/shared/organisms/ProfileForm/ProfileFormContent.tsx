import { FC } from 'react';
import * as Yup from 'yup';

import Form, { FormFieldType, PasswordAutocomplete } from 'components/shared/molecules/Form';

import { TProfileFormContent } from './types';
import { FormWrapper, StyledTitle, AvatarWrapper, AvatarImg } from './styled';

const ProfileFormContent: FC<TProfileFormContent> = ({
  temporaryUrl,
  user,
  onSubmit,
  handleAvatarChange,
}) => {
  const { email, firstName, lastName, avatarUrl } = user;

  const fields = [
    {
      type: FormFieldType.file,
      name: 'avatar',
      title: 'Avatar',
      testId: 'avatar',
      accept: 'image/*',
      onChange: handleAvatarChange,
      initialValue: null,
    },
    {
      type: FormFieldType.text,
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      testId: 'first-name',
      initialValue: firstName || '',
      validationSchema: Yup.string(),
    },
    {
      type: FormFieldType.text,
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      testId: 'last-name',
      initialValue: lastName || '',
      validationSchema: Yup.string(),
    },
    {
      type: FormFieldType.text,
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      testId: 'email',
      initialValue: email || '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: FormFieldType.password,
      name: 'password',
      title: 'New Password',
      placeholder: 'New Password',
      testId: 'password',
      initialValue: '',
      validationSchema: Yup.string(),
      autoComplete: PasswordAutocomplete.newPassword,
    },
    {
      type: FormFieldType.password,
      name: 'currentPassword',
      title: 'Current Password',
      placeholder: 'Current Password',
      testId: 'current-password',
      initialValue: '',
      validationSchema: Yup.string().when(['password'], {
        is: (password: string) => password?.length > 0,
        then: Yup.string().required(
          'If you filled New Password, Current Password field should be filled too',
        ),
        otherwise: Yup.string(),
      }),
    },
    {
      type: FormFieldType.submit,
      name: 'Update',
      testId: 'submit-button',
    },
  ];

  const form = {
    fields,
    onSubmit,
  };

  const avatarSrc = temporaryUrl || avatarUrl;

  return (
    <FormWrapper>
      <StyledTitle data-testid="profile-form-title">Profile</StyledTitle>
      {avatarSrc && (
        <AvatarWrapper>
          <AvatarImg src={avatarSrc} />
        </AvatarWrapper>
      )}
      <Form form={form} />
    </FormWrapper>
  );
};
export default ProfileFormContent;
