import { useMeActivitiesQuery } from 'graphql/queries/__generated__/meActivities.generated';

import { Activity, ActivityEvent } from 'graphql/types';
import { filterAvailableNodes } from 'helpers';

import { TActivity } from './types';

export const useMeActivities = ({ before, after, event, pageSize = 5 }: TActivity) => {
  const { loading, error, data } = useMeActivitiesQuery({
    variables: {
      events: event ? [event] : Object.values(ActivityEvent),
      last: before ? pageSize : undefined,
      before,
      first: after || (!after && !before) ? pageSize : undefined,
      after,
    },
  });

  return {
    activities: filterAvailableNodes<Activity>(
      data?.me?.activities?.edges?.map(edge => edge?.node),
    ),
    pageInfo: data?.me?.activities?.pageInfo || { hasNextPage: false, hasPreviousPage: false },
    loading,
    error,
  };
};
