import { useCurrentUserQuery } from 'graphql/queries/__generated__/currentUser.generated';

import { BUYER } from 'config/constants/directions';
import { isRegisteredUser, isUserAdmin } from 'config/constants/systemRoles';

export const useCurrentUserHook = () => {
  const { data, loading, error, refetch, networkStatus } = useCurrentUserQuery({
    fetchPolicy: 'cache-only',
    notifyOnNetworkStatusChange: true,
  });

  const hasCompany = Boolean(data?.me?.mainCompany);
  const isAdmin = isUserAdmin(data?.me?.systemRole);
  return {
    user: data?.me,
    mainCompanyId: data?.me?.mainCompany?.id,
    isUserBuyer: data?.me?.mainCompany?.direction === BUYER,
    isAdmin,
    isGuest: !isAdmin && !hasCompany,
    isRegisteredUser: isRegisteredUser(data?.me?.systemRole),
    loading,
    error,
    refetch,
    networkStatus,
  };
};
