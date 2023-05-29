import { ChangeEvent } from 'react';
import { FormikHelpers } from 'formik';

import { CurrentUserFragment } from 'graphql/fragments/__generated__/currentUserInfo.generated';

export type TProfileForm = {
  user: CurrentUserFragment;
};

export type TFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  currentPassword: string;
};

export type TProfileFormContent = {
  temporaryUrl: string | null;
  user: CurrentUserFragment;
  onSubmit: (values: TFormValues, formikHelpers: FormikHelpers<TFormValues>) => Promise<void>;
  handleAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
