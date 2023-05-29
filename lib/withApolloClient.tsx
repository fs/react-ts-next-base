import App from 'next/app';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'isomorphic-unfetch';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

import { withAccessTokenManager } from 'lib/auth/withAccessTokenManager';
import {
  createAuthHeaderLink,
  createConsoleLink,
  createErrorLink,
  createUpdateTokenLink,
} from 'lib/apollo/apolloLinks';
import { apolloPolicies } from 'lib/apollo/apolloPolicies';

import { GRAPHQL_APP_URL, PORT } from 'config/vars';
import { ApolloPageContext, TApolloClient, TAppPage } from 'lib/apollo/types';

const GRAPHQL_URI =
  typeof window === 'undefined' ? `http://127.0.0.1:${PORT}${GRAPHQL_APP_URL}` : GRAPHQL_APP_URL;

// Creates and configures the ApolloClient
const createApolloClient = (apolloState = {}, ctx?: Partial<ApolloPageContext>) => {
  const fetchOptions: { agent: HttpsProxyAgent | null } = { agent: null };
  const cookie = ctx && 'req' in ctx ? ctx.req?.headers.cookie : undefined;

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new HttpsProxyAgent(process.env.https_proxy);
    }
  }
  const consoleLink = createConsoleLink();
  const errorLink = createErrorLink();

  const authHeaderLink = createAuthHeaderLink({
    // passing a function to get accessToken value from memory
    getAccessToken: () => ctx?.accessTokenManager?.get?.(),
    cookie,
  });

  const updateTokenLink = createUpdateTokenLink({
    // passing a function to set accessToken to memory
    setAccessToken: (token: string) => ctx?.accessTokenManager?.set?.(token),
    deleteAccessToken: () => ctx?.accessTokenManager?.delete?.(),
  });

  // create an HttpLink
  const httpLink = new HttpLink({
    uri: GRAPHQL_URI, // Server URL (must be absolute)
    credentials: 'same-origin',
    fetch,
    fetchOptions,
  });
  // Combined Link
  const link = ApolloLink.from([
    ...(process.env.PRINT_HTTP_REQUEST_LOGS === 'true' ? [consoleLink] : []),
    errorLink,
    authHeaderLink,
    updateTokenLink,
    httpLink,
  ]);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ...(typeof window === 'undefined'
      ? {
          // Disables forceFetch on the server (so queries are only run once)
          ssrMode: true,
        }
      : { ssrForceFetchDelay: 100 }),
    link,
    cache: new InMemoryCache(apolloPolicies).restore(apolloState),
  });
};

let apolloClientGlobal: TApolloClient | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (apolloState = {}, ctx: Partial<ApolloPageContext>) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(apolloState, ctx);
  }

  // Reuse client on the client-side
  if (!apolloClientGlobal) {
    apolloClientGlobal = createApolloClient(apolloState, ctx);
  }

  return apolloClientGlobal;
};

const initOnContext = (ctx: ApolloPageContext) => {
  // Initialize ApolloClient if not already done
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const apolloClient = ctx.apolloClient || initApolloClient(ctx.apolloState || {}, ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  (apolloClient as { toJSON?: () => void }).toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;

  return ctx;
};

const withApollo = (PageComponent: TAppPage) => {
  const WithApolloClient: TAppPage = pageProps => {
    const { apolloClient, apolloState, accessTokenManager } = pageProps;
    const client = apolloClient || initApolloClient(apolloState, { accessTokenManager });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} apolloClient={client} />
      </ApolloProvider>
    );
  };

  WithApolloClient.getInitialProps = async context => {
    const { apolloClient, accessTokenManager } = initOnContext(context.ctx);

    // Run wrapped getInitialProps methods
    const pageProps = await App.getInitialProps(context);

    return {
      ...pageProps,
      accessTokenManager,
      apolloState: apolloClient.cache.extract(),
      apolloClient,
    };
  };

  return WithApolloClient;
};

export const withApolloClient = (Page: TAppPage) => withAccessTokenManager(withApollo(Page));
