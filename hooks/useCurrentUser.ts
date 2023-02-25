import { useContext } from 'react';
import CurrentUserContext from 'contexts/CurrentUserContext';

import { useCurrentUserHook } from 'lib/apollo/hooks/state/currentUser';

const useCurrentUser = () => {
  return useContext(CurrentUserContext) as ReturnType<typeof useCurrentUserHook>;
};

export default useCurrentUser;
