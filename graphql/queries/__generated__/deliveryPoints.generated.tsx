import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeliveryPointsQueryVariables = Types.Exact<{
  service: Types.PointServiceEnum;
  cityId: Types.Scalars['ID'];
  direction?: Types.InputMaybe<Types.DeliveryPointDirectionEnum>;
}>;

export type DeliveryPointsQuery = {
  __typename?: 'Query';
  deliveryPoints: Array<{
    __typename?: 'DeliveryPoint';
    address?: string | null;
    id: string;
    phones?: Array<string> | null;
    openingHours?: Array<{
      __typename?: 'OpeningHours';
      weekday: Types.WeekdayEnum;
      endTime: { __typename?: 'Time'; hour: number; minute: number };
      startTime: { __typename?: 'Time'; hour: number; minute: number };
    }> | null;
  }>;
};

export const DeliveryPointsDocument = gql`
  query DeliveryPoints(
    $service: PointServiceEnum!
    $cityId: ID!
    $direction: DeliveryPointDirectionEnum
  ) {
    deliveryPoints(service: $service, cityId: $cityId, direction: $direction) {
      address
      id
      openingHours {
        endTime {
          hour
          minute
        }
        startTime {
          hour
          minute
        }
        weekday
      }
      phones
    }
  }
`;

/**
 * __useDeliveryPointsQuery__
 *
 * To run a query within a React component, call `useDeliveryPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryPointsQuery({
 *   variables: {
 *      service: // value for 'service'
 *      cityId: // value for 'cityId'
 *      direction: // value for 'direction'
 *   },
 * });
 */
export function useDeliveryPointsQuery(
  baseOptions: Apollo.QueryHookOptions<DeliveryPointsQuery, DeliveryPointsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DeliveryPointsQuery, DeliveryPointsQueryVariables>(
    DeliveryPointsDocument,
    options,
  );
}
export function useDeliveryPointsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DeliveryPointsQuery, DeliveryPointsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DeliveryPointsQuery, DeliveryPointsQueryVariables>(
    DeliveryPointsDocument,
    options,
  );
}
export type DeliveryPointsQueryHookResult = ReturnType<typeof useDeliveryPointsQuery>;
export type DeliveryPointsLazyQueryHookResult = ReturnType<typeof useDeliveryPointsLazyQuery>;
export type DeliveryPointsQueryResult = Apollo.QueryResult<
  DeliveryPointsQuery,
  DeliveryPointsQueryVariables
>;
