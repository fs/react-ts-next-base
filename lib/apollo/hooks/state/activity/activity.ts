import { filterAvailableNodes } from 'helpers';
import { useActivitiesQuery } from 'graphql/queries/__generated__/activities.generated';
import { PublicActivity } from 'graphql/types';
import { TActivity } from './types';

export const useActivities = ({ before, after, pageSize = 5 }: TActivity) => {
  const { loading, error, data } = useActivitiesQuery({
    variables: {
      last: before ? pageSize : undefined,
      before,
      first: after || (!after && !before) ? pageSize : undefined,
      after,
    },
  });

  return {
    activities: filterAvailableNodes<PublicActivity>(
      data?.activities?.edges?.map(edge => edge?.node),
    ),
    pageInfo: data?.activities?.pageInfo || { hasNextPage: false, hasPreviousPage: false },
    loading,
    error,
  };
};
