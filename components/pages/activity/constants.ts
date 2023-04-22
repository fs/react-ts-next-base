import { ActivityEvent } from 'graphql/types';
import { TActivityOption, TAvtivitySizeOption } from './types';

export const ACTIVITY_PAGE_SIZES = [5, 10, 25, 50];

export const ACTIVITY_PAGE_SIZE_OPTIONS: TAvtivitySizeOption[] = ACTIVITY_PAGE_SIZES.map(item => ({
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
