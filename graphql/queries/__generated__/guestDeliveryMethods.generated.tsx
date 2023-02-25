import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GuestDeliveryMethodsQueryVariables = Types.Exact<{
  variantId: Types.Scalars['ID'];
  quantity: Types.Scalars['Int'];
  cityId: Types.Scalars['ID'];
}>;

export type GuestDeliveryMethodsQuery = {
  __typename?: 'Query';
  guestDeliveryMethods: {
    __typename?: 'DeliveryMethods';
    courier: Array<{
      __typename?: 'CourierDeliveryMethod';
      available: boolean;
      endDate?: any | null;
      price?: number | null;
      service: Types.CourierServiceEnum;
      startDate?: any | null;
      error?: {
        __typename?: 'ExternalError';
        details?: string | null;
        message?: string | null;
      } | null;
    }>;
    deliveryPoint: Array<{
      __typename?: 'PointDeliveryMethod';
      available: boolean;
      endDate?: any | null;
      price?: number | null;
      service: Types.PointServiceEnum;
      startDate?: any | null;
      deliveryPoints?: Array<{
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
      }> | null;
      error?: {
        __typename?: 'ExternalError';
        details?: string | null;
        message?: string | null;
      } | null;
    }>;
    pickup: { __typename?: 'PickupDeliveryMethod'; available: boolean };
  };
};

export const GuestDeliveryMethodsDocument = gql`
  query GuestDeliveryMethods($variantId: ID!, $quantity: Int!, $cityId: ID!) {
    guestDeliveryMethods(variantId: $variantId, quantity: $quantity, cityId: $cityId) {
      courier {
        available
        endDate
        error {
          details
          message
        }
        price
        service
        startDate
      }
      deliveryPoint {
        available
        deliveryPoints {
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
        endDate
        error {
          details
          message
        }
        price
        service
        startDate
      }
      pickup {
        available
      }
    }
  }
`;

/**
 * __useGuestDeliveryMethodsQuery__
 *
 * To run a query within a React component, call `useGuestDeliveryMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuestDeliveryMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuestDeliveryMethodsQuery({
 *   variables: {
 *      variantId: // value for 'variantId'
 *      quantity: // value for 'quantity'
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGuestDeliveryMethodsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GuestDeliveryMethodsQuery,
    GuestDeliveryMethodsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GuestDeliveryMethodsQuery, GuestDeliveryMethodsQueryVariables>(
    GuestDeliveryMethodsDocument,
    options,
  );
}
export function useGuestDeliveryMethodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GuestDeliveryMethodsQuery,
    GuestDeliveryMethodsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GuestDeliveryMethodsQuery, GuestDeliveryMethodsQueryVariables>(
    GuestDeliveryMethodsDocument,
    options,
  );
}
export type GuestDeliveryMethodsQueryHookResult = ReturnType<typeof useGuestDeliveryMethodsQuery>;
export type GuestDeliveryMethodsLazyQueryHookResult = ReturnType<
  typeof useGuestDeliveryMethodsLazyQuery
>;
export type GuestDeliveryMethodsQueryResult = Apollo.QueryResult<
  GuestDeliveryMethodsQuery,
  GuestDeliveryMethodsQueryVariables
>;
