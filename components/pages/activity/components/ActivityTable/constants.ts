import { ActivityEvent } from 'graphql/types';

export const activityEventColors = {
  [ActivityEvent.UserLoggedIn]: '#00e676',
  [ActivityEvent.UserRegistered]: '#f50057',
  [ActivityEvent.UserResetPassword]: '#d500f9',
  [ActivityEvent.ResetPasswordRequested]: '#ffea00',
  [ActivityEvent.UserUpdated]: '#2979ff',
};
