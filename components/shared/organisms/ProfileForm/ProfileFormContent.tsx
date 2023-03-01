import React from 'react';
import * as Yup from 'yup';

import Form from 'components/shared/molecules/Form';

import { FormWrapper, StyledTitle, AvatarWrapper, AvatarImg } from './styled';
import { TFormValues, TProfileFormContent } from './types';

const ProfileFormContent: React.FunctionComponent<TProfileFormContent> = ({
  temporaryUrl,
  user,
  onSubmit,
  handleAvatarChange,
}) => {
  const { email, firstName, lastName, avatarUrl } = user;

  const fields = [
    {
      type: 'file',
      name: 'avatar',
      title: 'Avatar',
      testID: 'avatar',
      accept: 'image/*',
      onChange: handleAvatarChange,
      initialValue: null,
    },
    {
      type: 'text',
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      testID: 'first-name',
      initialValue: firstName || '',
      validationSchema: Yup.string(),
    },
    {
      type: 'text',
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      testID: 'last-name',
      initialValue: lastName || '',
      validationSchema: Yup.string(),
    },
    {
      type: 'text',
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      testID: 'email',
      initialValue: email || '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: 'password',
      name: 'password',
      title: 'New Password',
      placeholder: 'New Password',
      testID: 'password',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    {
      type: 'password',
      name: 'currentPassword',
      title: 'Current Password',
      placeholder: 'Current Password',
      testID: 'current-password',
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
      type: 'submit',
      name: 'Update',
      testID: 'submit-button',
      label: 'Update',
      initialValue: 'Update',
    },
  ];

  const form = {
    fields,
    submit: onSubmit,
  };

  const avatarSrc = temporaryUrl || avatarUrl;

  return (
    <FormWrapper>
      <StyledTitle data-cy="profile-form-title">Profile</StyledTitle>
      {avatarSrc && (
        <AvatarWrapper>
          <AvatarImg src={avatarSrc} />
        </AvatarWrapper>
      )}
      <Form<TFormValues> form={form} />
    </FormWrapper>
  );
};
export default ProfileFormContent;
