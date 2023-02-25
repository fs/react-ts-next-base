import {
  DeliveryMethodsQueryVariables,
  useDeliveryMethodsQuery,
} from 'graphql/queries/__generated__/deliveryMethods.generated';
import {
  GuestDeliveryMethodsQueryVariables,
  useGuestDeliveryMethodsQuery,
} from 'graphql/queries/__generated__/guestDeliveryMethods.generated';

type TDeliveryMethods = DeliveryMethodsQueryVariables & {
  skip?: boolean;
};
export const useDeliveryMethods = ({
  variantId,
  quantity,
  companyLocationId,
  skip = false,
}: TDeliveryMethods) => {
  const { data, loading, error, refetch } = useDeliveryMethodsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip,
    variables: { variantId, quantity, companyLocationId },
  });

  return {
    deliveryMethods: data?.deliveryMethods || {},
    loading,
    error,
    refetch,
  };
};

type TGuestDeliveryMethods = GuestDeliveryMethodsQueryVariables & {
  skip?: boolean;
};
export const useGuestDeliveryMethods = ({
  variantId,
  quantity,
  cityId,
  skip = false,
}: TGuestDeliveryMethods) => {
  const { data, loading, error, refetch } = useGuestDeliveryMethodsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip,
    variables: { variantId, quantity, cityId },
  });

  return {
    guestDeliveryMethods: data?.guestDeliveryMethods || {},
    loading,
    error,
    refetch,
  };
};

type TUserDeliveryMethods = {
  deliveryMethodsQuery: DeliveryMethodsQueryVariables & GuestDeliveryMethodsQueryVariables;
  isGuestUser: boolean;
};

export const useUserDeliveryMethods = ({
  deliveryMethodsQuery,
  isGuestUser,
}: TUserDeliveryMethods) => {
  const emptyDeliveryMethodsQuery = Object.values(deliveryMethodsQuery).length === 0;
  const { deliveryMethods, loading: loadingDeliveryMethods } = useDeliveryMethods({
    ...deliveryMethodsQuery,
    skip: isGuestUser || emptyDeliveryMethodsQuery,
  });

  const { guestDeliveryMethods, loading: loadingGuestDeliveryMethods } = useGuestDeliveryMethods({
    ...deliveryMethodsQuery,
    skip: !isGuestUser || emptyDeliveryMethodsQuery,
  });

  const userDeliveryMethods = isGuestUser ? guestDeliveryMethods : deliveryMethods;

  return {
    userDeliveryMethods,
    loadingUserDeliveryMethods: loadingDeliveryMethods || loadingGuestDeliveryMethods,
  };
};
