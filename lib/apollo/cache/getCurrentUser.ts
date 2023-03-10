import { TApolloClient } from 'lib/apollo/types';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import { CurrentUserQuery } from 'graphql/queries/__generated__/currentUser.generated';

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
