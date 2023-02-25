import React from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import useCurrentUser from 'hooks/useCurrentUser';

import { HOME } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import JoinUserForm from 'components/shared/organisms/JoinUserForm';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import LeftCol from './components/LeftCol';
import RightCol from './components/RightCol';

import { EditContainer, Wrapper, ExitPageButton } from './styled';

const EditProfilePage = () => {
  const { pushRoute } = useRouter();
  const { user, loading } = useCurrentUser();
  const { phoneNumber, firstName } = user || {};

  const onExitPage = () => {
    pushRoute(HOME);
  };

  return (
    <>
      {!loading && user && (
        <>
          {!phoneNumber && !firstName ? (
            <LayoutTemplate isShowScroll={false}>
              <JoinUserForm />
            </LayoutTemplate>
          ) : (
            <Wrapper>
              <EditContainer>
                <LeftCol user={user} />
                <RightCol user={user} />
                <ExitPageButton>
                  <Button
                    variant="hollow"
                    size="small"
                    iconType="only"
                    icon={<Icon name="close" $size={22} $color="blue" />}
                    onClick={onExitPage}
                  />
                </ExitPageButton>
              </EditContainer>
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(EditProfilePage))));
