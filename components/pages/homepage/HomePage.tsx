import React, { useRef } from 'react';
import Router from 'next/router';
import omit from 'lodash/omit';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import useCurrentUser from 'hooks/useCurrentUser';

import { TNextPage } from 'lib/apollo/types';
import { ADMIN_ACCOUNT } from 'config/routes';
import { isUserAdmin } from 'config/constants/systemRoles';

import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';
import UserHomeContent from './components/UserHomeContent';
import VisitorHomeContent from './components/VisitorHomeContent';

export const HomePage: TNextPage = ({ query }) => {
  const { loading, isRegisteredUser } = useCurrentUser();
  const contentRef = useRef(null);

  return (
    <>
      {!loading && (
        <>
          {isRegisteredUser ? (
            <UserHomeContent testId="homepage-for-user" query={query} contentRef={contentRef} />
          ) : (
            // @ts-ignore
            <VisitorHomeContent testId="homepage-for-guest" query={query} contentRef={contentRef} />
          )}
        </>
      )}
    </>
  );
};

HomePage.getInitialProps = context => {
  const { res, apolloClient } = context;
  const ctx = omit(context, ['req', 'res']);
  const user = getCurrentUser({ apolloClient });

  if (isUserAdmin(user?.systemRole)) {
    res ? res.redirect(302, ADMIN_ACCOUNT) : Router.push(ADMIN_ACCOUNT);
  }
  return ctx;
};

export default withGetDataFromTree(withAuth(HomePage));
