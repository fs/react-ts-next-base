import { UserInfoFragment } from 'graphql/fragments/__generated__/userInfo.generated';
import { useUsersQuery, UsersQueryVariables } from 'graphql/queries/__generated__/users.generated';
import { getLoadingType } from 'helpers';
import { filterAvailableNodes } from 'helpers/types';

type TUsers = UsersQueryVariables & {
  skip: boolean;
};

export const useUsers = ({
  ids,
  orderBy,
  searchQuery,
  blocked,
  first,
  after,
  skip = false,
}: TUsers) => {
  const { data, error, networkStatus, refetch, fetchMore } = useUsersQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      ids,
      orderBy,
      searchQuery,
      blocked,
      first,
      after,
    },
    skip,
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    users: filterAvailableNodes<UserInfoFragment>(data?.users.edges?.map(order => order?.node)),
    loading,
    pageInfo: data?.users?.pageInfo || {},
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
