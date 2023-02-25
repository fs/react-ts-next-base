import React from 'react';
import omit from 'lodash/omit';
import Router from 'next/router';

import { AUTH } from 'config/routes';

import { isRegisteredUser } from 'config/constants/systemRoles';
import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';
import { TNextPage } from 'lib/apollo/types';

const withAuthSecurity = (Page: TNextPage): TNextPage => {
  const WithAuthSecurity: TNextPage = ({ ...pageProps }) => {
    return <Page {...pageProps} />;
  };

  WithAuthSecurity.getInitialProps = context => {
    const { req, res, apolloClient } = context;
    const ctx = omit(context, ['req', 'res']);
    const user = getCurrentUser({ apolloClient });

    if (!isRegisteredUser(user?.systemRole)) {
      !!req && !!res ? res.redirect(302, AUTH) : Router.push(AUTH);
    }

    return Page.getInitialProps ? Page.getInitialProps(context) : ctx;
  };

  return WithAuthSecurity;
};

export default withAuthSecurity;
