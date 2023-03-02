import { ActivityEvent } from 'graphql/types';

export const activityPageSizes = [5, 10, 25, 50];

export const activityEvents = [
  { value: ActivityEvent.UserLoggedIn, name: 'User logged in', color: '#00e676' },
  { value: ActivityEvent.UserRegistered, name: 'User registered', color: '#f50057' },
  { value: ActivityEvent.UserResetPassword, name: 'User reset password', color: '#d500f9' },
  {
    value: ActivityEvent.ResetPasswordRequested,
    name: 'Reset password requested',
    color: '#ffea00',
  },
  { value: ActivityEvent.UserUpdated, name: 'User updated', color: '#2979ff' },
];
