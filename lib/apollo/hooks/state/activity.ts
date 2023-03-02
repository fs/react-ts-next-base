import { ActivityEvent } from 'graphql/types';
import { filterAvailableNodes } from 'helpers/types';
import { activityEvents, activityPageSizes } from 'config/constants/activity';
import { useActivitiesQuery } from 'graphql/queries/__generated__/activities.generated';
import { ActivityFragment } from 'graphql/fragments/__generated__/activityInfo.generated';

type TActivity = {
  before?: string;
  after?: string;
  event?: ActivityEvent;
  pageSize: number;
};

// const getFormattedActivity = (nodes: ActivityFragment[]): Activity[] => {
//   return nodes.map(
//     ({ id, title, body, createdAt, event, user: { firstName, lastName, email, avatarUrl } }) => ({
//       id,
//       title,
//       description: body,
//       date: new Date(createdAt).toLocaleString(),
//       color: activityEvents.find(e => e.value === event)?.color,
//       name: `${firstName} ${lastName}`,
//       email,
//       avatarUrl,
//     }),
//   );
// };

export const useActivity = ({
  before,
  after,
  event,
  pageSize = activityPageSizes[0],
}: TActivity) => {
  const { loading, error, data } = useActivitiesQuery({
    variables: {
      events: event ? [event] : activityEvents.map(({ value }) => value),
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
    pageInfo: data?.activities?.pageInfo || {},
    loading,
    error,
  };
};
