import Router from 'next/router';
import omit from 'lodash/omit';

import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';

import { HOME } from 'config/routes';
import { TNextPage } from 'lib/apollo/types';

const withNotAuthSecurity = (Page: TNextPage): TNextPage => {
  const WithNotAuthSecurity: TNextPage = ({ ...pageProps }) => {
    return <Page {...pageProps} />;
  };

  WithNotAuthSecurity.getInitialProps = context => {
    const { req, res, apolloClient } = context;
    const ctx = omit(context, ['req', 'res']);
    const user = getCurrentUser({ apolloClient });

    if (user) {
      !!req && !!res ? res.redirect(302, HOME) : Router.push(HOME);
    }

    return Page.getInitialProps ? Page.getInitialProps(context) : ctx;
  };

  return WithNotAuthSecurity;
};

export default withNotAuthSecurity;
