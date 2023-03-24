import { useCurrentUserQuery } from 'graphql/queries/__generated__/currentUser.generated';

export const useCurrentUserHook = () => {
  const { data, loading, error, refetch, networkStatus } = useCurrentUserQuery({
    fetchPolicy: 'cache-only',
    notifyOnNetworkStatusChange: true,
  });

  return {
    user: data?.me,
    loading,
    error,
    refetch,
    networkStatus,
  };
};
