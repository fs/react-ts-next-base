import { differenceInMilliseconds } from 'date-fns';
import omit from 'lodash/omit';
import Cookie from 'universal-cookie';

import UpdateToken from 'graphql/mutations/updateToken.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_MINIMAL_LIFE_TIME, REFRESH_TOKEN_KEY } from 'config/jwt';
import { ApolloPageContext, TApolloClient, TNextPage } from 'lib/apollo/types';

import { parseJWT, setTokensToCookies } from './tokens';

const updateTokensMutation = (apolloClient: TApolloClient) =>
  apolloClient.mutate({
    mutation: UpdateToken,
    fetchPolicy: 'no-cache', // to not leak tokens data in apolloState $ROOT_MUTATION
  });

const updateTokensServerSide = async ({ req, res, apolloClient }: ApolloPageContext) => {
  try {
    const {
      data: {
        updateToken: { me, refreshToken, accessToken },
      },
    } = await updateTokensMutation(apolloClient);

    apolloClient.writeQuery({
      query: CurrentUser,
      data: {
        me,
      },
    });

    if (!res.writableEnded) setTokensToCookies({ refreshToken, accessToken, req, res });
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserQuery = (apolloClient: TApolloClient) =>
  apolloClient.query({
    query: CurrentUser,
    fetchPolicy: 'no-cache', // to not leak tokens data in apolloState $ROOT_MUTATION
  });

const updateCurrentUserServerSide = async ({ apolloClient }: ApolloPageContext) => {
  try {
    const {
      data: { me },
    } = await getCurrentUserQuery(apolloClient);

    apolloClient.writeQuery({
      query: CurrentUser,
      data: {
        me,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const withTokensUpdate = (Page: TNextPage): TNextPage => {
  const WithTokensUpdate: TNextPage = ({ ...pageProps }) => {
    return <Page {...pageProps} />;
  };

  WithTokensUpdate.getInitialProps = async context => {
    const { req, res } = context;
    const ctx = omit(context, ['req', 'res']);
    if (!!req && !!res) {
      const cookie = new Cookie(req.headers.cookie);
      const accessToken = cookie.get(ACCESS_TOKEN_KEY);
      const jwtAccess = parseJWT(accessToken);

      if (
        !accessToken ||
        !jwtAccess.exp ||
        differenceInMilliseconds(jwtAccess.exp * 1000, Date.now()) <= ACCESS_TOKEN_MINIMAL_LIFE_TIME
      ) {
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY);
        if (refreshToken) await updateTokensServerSide(context);
      } else {
        await updateCurrentUserServerSide(context);
      }
    }

    return Page.getInitialProps ? Page.getInitialProps(context) : ctx;
  };

  return WithTokensUpdate;
};

export default withTokensUpdate;
