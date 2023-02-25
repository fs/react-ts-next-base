import React, { useMemo } from 'react';

import { useCurrentUserHook } from 'lib/apollo/hooks/state/currentUser';

import CurrentUserContext from './CurrentUserContext';

const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    mainCompanyId,
    isUserBuyer,
    isAdmin,
    isGuest,
    isRegisteredUser,
    loading,
    error,
    refetch,
    networkStatus,
  } = useCurrentUserHook();

  const context: ReturnType<typeof useCurrentUserHook> = useMemo(
    () => ({
      user,
      mainCompanyId,
      isUserBuyer,
      isAdmin,
      isGuest,
      isRegisteredUser,
      loading,
      error,
      refetch,
      networkStatus,
    }),
    [
      user,
      mainCompanyId,
      isUserBuyer,
      isAdmin,
      isGuest,
      isRegisteredUser,
      loading,
      error,
      refetch,
      networkStatus,
    ],
  );

  return <CurrentUserContext.Provider value={context}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
