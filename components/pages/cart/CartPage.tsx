import React from 'react';
import Router from 'next/router';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import useCurrentUser from 'hooks/useCurrentUser';
import { TNextPage } from 'lib/apollo/types';
import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';
import { BUYER } from 'config/constants/directions';
import { HOME } from 'config/routes';

import { isRegisteredUser } from 'config/constants/systemRoles';

import Loader from 'components/shared/atoms/Loader';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import UserCartContent from './components/UserCartContent';
import GuestCartContent from './components/GuestCartContent';
import { PageContainer } from './styled';

export const CartPage: TNextPage = (): React.ReactElement => {
  const { user, loading, mainCompanyId } = useCurrentUser();

  return (
    <LayoutTemplate testId="cart-page">
      {loading ? (
        <PageContainer>
          <Loader testId="cart-page-loader" />
        </PageContainer>
      ) : (
        <>
          {user && mainCompanyId ? (
            <UserCartContent mainCompanyId={mainCompanyId} user={user} />
          ) : (
            <GuestCartContent />
          )}
        </>
      )}
    </LayoutTemplate>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
CartPage.getInitialProps = ({ req, res, ...ctx }) => {
  const { apolloClient } = ctx;
  const user = getCurrentUser({ apolloClient });

  if (
    isRegisteredUser(user?.systemRole) &&
    user?.mainCompany &&
    user?.mainCompany?.direction !== BUYER
  ) {
    res ? res.redirect(302, HOME) : Router.push(HOME);
  }

  return ctx;
};

export default withGetDataFromTree(withAuth(CartPage));
