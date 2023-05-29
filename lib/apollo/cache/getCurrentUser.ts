import { CurrentUserQuery } from 'graphql/queries/__generated__/currentUser.generated';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import { TApolloClient } from 'lib/apollo/types';

export const getCurrentUser = ({ apolloClient }: { apolloClient: TApolloClient }) => {
  try {
    const user = apolloClient.readQuery<CurrentUserQuery>({
      query: CurrentUser,
    });

    return user?.me || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
