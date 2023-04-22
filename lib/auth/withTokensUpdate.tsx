import { useEffect, useReducer } from 'react';
import Cookie from 'universal-cookie';
import omit from 'lodash/omit';

import UpdateToken from 'graphql/mutations/updateToken.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import jwt from 'config/jwt.json';

import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';
import { ApolloPageContext, TApolloClient, TNextPage } from 'lib/apollo/types';

import { setRefreshToken } from './tokens';

const { REFRESH_TOKEN_KEY, ACCESS_TOKEN_CHECK_INTERVAL, ACCESS_TOKEN_MINIMAL_LIFE_TIME } = jwt;

const updateTokensMutation = (apolloClient: TApolloClient) =>
  apolloClient.mutate({
    mutation: UpdateToken,
    fetchPolicy: 'no-cache', // to not leak tokens data in apolloState $ROOT_MUTATION
  });

const updateTokensServerSide = async ({ req, res, apolloClient }: ApolloPageContext) => {
  try {
    const {
      data: {
        updateToken: { me, refreshToken },
      },
    } = await updateTokensMutation(apolloClient);

    apolloClient.writeQuery({
      query: CurrentUser,
      data: {
        me,
      },
    });

    if (!res.writableEnded) setRefreshToken({ refreshToken, req, res });
  } catch (error) {
    console.error(error);
  }
};

const withTokensUpdate = (Page: TNextPage): TNextPage => {
  const WithTokensUpdate: TNextPage = ({ ...pageProps }) => {
    const [_, forceUpdate] = useReducer((x: number) => x + 1, 0);

    const { apolloClient, accessTokenManager } = pageProps;

    const tick = async () => {
      const user = getCurrentUser({ apolloClient });
      if (!user) return;
      const { accessToken, expires } = accessTokenManager?.get() || {};
      if (!accessToken || !expires || expires - Date.now() <= ACCESS_TOKEN_MINIMAL_LIFE_TIME) {
        try {
          await updateTokensMutation(apolloClient);
          // update page data after mutate accessTokenManager
          forceUpdate();
        } catch (error) {
          console.error(error);
        }
      }
    };

    useEffect(() => {
      tick();
      let timeoutId: NodeJS.Timeout;
      let timeoutId2: NodeJS.Timeout;
      (async function poll() {
        await new Promise(resolve => {
          timeoutId2 = setTimeout(async () => {
            await tick();
            resolve(null);
          }, ACCESS_TOKEN_CHECK_INTERVAL);
        });

        timeoutId = setTimeout(poll, ACCESS_TOKEN_CHECK_INTERVAL);
      })();

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(timeoutId2);
      };
    }, []);

    return <Page {...pageProps} />;
  };

  WithTokensUpdate.getInitialProps = async context => {
    const { req, res } = context;
    const ctx = omit(context, ['req', 'res']);
    if (!!req && !!res) {
      const cookie = new Cookie(req.headers.cookie);
      const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

      if (refreshToken) await updateTokensServerSide(context);
    }

    return Page.getInitialProps ? Page.getInitialProps(context) : ctx;
  };

  return WithTokensUpdate;
};

export default withTokensUpdate;
