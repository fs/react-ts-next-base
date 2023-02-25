import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeliveryMethodsQueryVariables = Types.Exact<{
  variantId: Types.Scalars['ID'];
  quantity: Types.Scalars['Int'];
  companyLocationId: Types.Scalars['ID'];
}>;

export type DeliveryMethodsQuery = {
  __typename?: 'Query';
  deliveryMethods: {
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

export const DeliveryMethodsDocument = gql`
  query DeliveryMethods($variantId: ID!, $quantity: Int!, $companyLocationId: ID!) {
    deliveryMethods(
      variantId: $variantId
      quantity: $quantity
      companyLocationId: $companyLocationId
    ) {
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
 * __useDeliveryMethodsQuery__
 *
 * To run a query within a React component, call `useDeliveryMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryMethodsQuery({
 *   variables: {
 *      variantId: // value for 'variantId'
 *      quantity: // value for 'quantity'
 *      companyLocationId: // value for 'companyLocationId'
 *   },
 * });
 */
export function useDeliveryMethodsQuery(
  baseOptions: Apollo.QueryHookOptions<DeliveryMethodsQuery, DeliveryMethodsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DeliveryMethodsQuery, DeliveryMethodsQueryVariables>(
    DeliveryMethodsDocument,
    options,
  );
}
export function useDeliveryMethodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DeliveryMethodsQuery, DeliveryMethodsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DeliveryMethodsQuery, DeliveryMethodsQueryVariables>(
    DeliveryMethodsDocument,
    options,
  );
}
export type DeliveryMethodsQueryHookResult = ReturnType<typeof useDeliveryMethodsQuery>;
export type DeliveryMethodsLazyQueryHookResult = ReturnType<typeof useDeliveryMethodsLazyQuery>;
export type DeliveryMethodsQueryResult = Apollo.QueryResult<
  DeliveryMethodsQuery,
  DeliveryMethodsQueryVariables
>;
