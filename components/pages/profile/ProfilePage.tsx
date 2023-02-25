import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';

import ErrorMessage from 'components/shared/atoms/ErrorMessage';

import useCurrentUser from 'hooks/useCurrentUser';
import parseApolloError from 'lib/apollo/parseApolloError';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import ProfileForm from 'components/shared/organisms/ProfileForm';

const ProfilePage = () => {
  const { loading, error, user } = useCurrentUser();

  const { message: errorMessage } = parseApolloError(error);

  return (
    <>
      {loading && <h3 data-testid="profile-loading">Loading...</h3>}

      {errorMessage && <ErrorMessage testId="profile-error">{errorMessage}</ErrorMessage>}

      {!loading && !error && (
        <DefaultTemplate data-testid="profile-page">
          <ProfileForm profile={user} />
        </DefaultTemplate>
      )}
    </>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(ProfilePage)));
