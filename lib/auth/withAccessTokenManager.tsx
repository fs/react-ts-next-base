import omit from 'lodash/omit';

import { ApolloPageContext, TAppPage, TExpires, TToken } from 'lib/apollo/types';

import { parseJWT } from './tokens';

export class AccessTokenManager {
  accessToken: TToken;

  expires: TExpires;

  constructor() {
    this.accessToken = null;
    this.expires = null;
  }

  delete() {
    this.accessToken = null;
    this.expires = null;
  }

  get() {
    const { accessToken, expires } = this;

    return {
      accessToken,
      expires,
    };
  }

  set(token: TToken) {
    const { exp } = parseJWT(token);

    this.accessToken = token;
    this.expires = Number(exp) * 1000;
  }
}

let accessTokenManager: AccessTokenManager | null = null;

const initAccessTokenManager = () => {
  // Make sure to create a new manager for every server-side request so access token
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return new AccessTokenManager();
  }

  // Reuse client on the client-side
  if (!accessTokenManager) {
    accessTokenManager = new AccessTokenManager();
  }

  return accessTokenManager;
};

const initOnContext = (ctx: ApolloPageContext) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const accessTokenManager = ctx.accessTokenManager || initAccessTokenManager();

  (accessTokenManager as { toJSON?: () => void }).toJSON = () => null;

  // Add accessTokenManager to NextPageContext & NextAppContext.
  // This allows us to consume the accessTokenManager inside our
  // custom `getInitialProps({ accessTokenManager })`.
  ctx.accessTokenManager = accessTokenManager;

  return ctx;
};

export const withAccessTokenManager = (Page: TAppPage) => {
  const WithAccessTokenManager: TAppPage = ({
    accessTokenManager: _accessTokenManager,
    ...pageProps
  }) => {
    const manager = _accessTokenManager || initAccessTokenManager();

    return <Page accessTokenManager={manager} {...pageProps} />;
  };

  WithAccessTokenManager.getInitialProps = context => {
    const ctx = omit(context, ['req', 'res', 'ctx']);
    const { accessTokenManager: _accessTokenManager } = initOnContext(context.ctx);

    return Page.getInitialProps
      ? Page.getInitialProps({
          ...context,
          accessTokenManager: _accessTokenManager,
        })
      : {
          ...ctx,
          accessTokenManager: _accessTokenManager,
        };
  };

  return WithAccessTokenManager;
};
