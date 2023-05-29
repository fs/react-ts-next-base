import { ActivityEvent } from 'graphql/types';

import { TActivityOption, TActivitySizeOption } from './types';

export const ACTIVITY_PAGE_SIZES = [3, 6, 9, 12];

export const ACTIVITY_PAGE_SIZE_OPTIONS: TActivitySizeOption[] = ACTIVITY_PAGE_SIZES.map(item => ({
  value: item,
  label: String(item),
}));

export const ACTIVITY_EVENTS: TActivityOption[] = [
  { value: ActivityEvent.UserLoggedIn, label: 'User logged in' },
  { value: ActivityEvent.UserRegistered, label: 'User registered' },
  { value: ActivityEvent.UserResetPassword, label: 'User reset password' },
  {
    value: ActivityEvent.ResetPasswordRequested,
    label: 'Reset password requested',
  },
  { value: ActivityEvent.UserUpdated, label: 'User updated' },
];
