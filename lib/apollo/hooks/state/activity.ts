import { ActivityEvent } from 'graphql/types';
import { filterAvailableNodes } from 'helpers';
import { useActivitiesQuery } from 'graphql/queries/__generated__/activities.generated';
import { ActivityFragment } from 'graphql/fragments/__generated__/activityInfo.generated';

type TActivity = {
  before?: string;
  after?: string;
  event?: ActivityEvent;
  pageSize: number;
};

export const useActivities = ({ before, after, event, pageSize = 5 }: TActivity) => {
  const { loading, error, data } = useActivitiesQuery({
    variables: {
      events: event ? [event] : Object.values(ActivityEvent),
      last: before ? pageSize : undefined,
      before,
      first: after || (!after && !before) ? pageSize : undefined,
      after,
    },
  });

  return {
    activities: filterAvailableNodes<ActivityFragment>(
      data?.activities?.edges?.map(edge => edge?.node),
    ),
    pageInfo: data?.activities?.pageInfo || { hasNextPage: false, hasPreviousPage: false },
    loading,
    error,
  };
};
