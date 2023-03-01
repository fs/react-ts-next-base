import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import useCurrentUser from 'hooks/useCurrentUser';

import { TNextPage } from 'lib/apollo/types';

import Loader from 'components/shared/atoms/Loader';
import ProfileForm from 'components/shared/organisms/ProfileForm';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import ErrorPage from 'pages/_error';

export const ProfilePage: TNextPage = () => {
  const { loading, error, user } = useCurrentUser();

  if (!loading && error) return <ErrorPage statusCode={404} />;

  return (
    <DefaultTemplate testId="profile-page">
      {!loading ? <ProfileForm profile={user} /> : <Loader testId="profile-loading" />}
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(ProfilePage)));
