import { ActivityEvent } from 'graphql/types';

export const ACTIVITY_EVENTS_COLORS = {
  [ActivityEvent.UserLoggedIn]: '#00e676',
  [ActivityEvent.UserRegistered]: '#f50057',
  [ActivityEvent.UserResetPassword]: '#d500f9',
  [ActivityEvent.ResetPasswordRequested]: '#ffea00',
  [ActivityEvent.UserUpdated]: '#2979ff',
};
