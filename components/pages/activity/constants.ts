import { ActivityEvent } from 'graphql/types';
import { TActivityOption, TAvtivitySizeOption } from './types';

export const activityPageSizes = [5, 10, 25, 50];

export const activityPageSizeOptions: TAvtivitySizeOption[] = activityPageSizes.map(item => ({
  value: item,
  label: String(item),
}));

export const activityEvents: TActivityOption[] = [
  { value: ActivityEvent.UserLoggedIn, label: 'User logged in' },
  { value: ActivityEvent.UserRegistered, label: 'User registered' },
  { value: ActivityEvent.UserResetPassword, label: 'User reset password' },
  {
    value: ActivityEvent.ResetPasswordRequested,
    label: 'Reset password requested',
  },
  { value: ActivityEvent.UserUpdated, label: 'User updated' },
];
