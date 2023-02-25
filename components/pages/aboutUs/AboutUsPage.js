import React from 'react';

import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';

import useCurrentUser from 'hooks/useCurrentUser';

import LayoutTemplate from 'components/shared/templates/LayoutTemplate';
import MainInfo from './components/MainInfo';
import Documents from './components/Documents';
import Problems from './components/Problems';
import Advantages from './components/Advantages';
import Actions from '../homepage/components/Actions';

import { PageContainer, ContentWrapper, Title, Scheme } from './styled';

export const AboutUsPage = () => {
  const { isRegisteredUser } = useCurrentUser();

  return (
    <LayoutTemplate testId="about-us-page">
      <PageContainer>
        <ContentWrapper>
          <MainInfo />
          <Title>Схема работы медагрегатора</Title>
          <Scheme alt="scheme" src={`${process.env.ASSET_HOST}/images/scheme-agregator.png`} />
          <Title>Важные файлы и документы</Title>
          <Documents />
          <Title>Проблемы медицинского рынка</Title>
          <Problems />
          <Title>Выгода от агрегатора</Title>
          <Advantages />
        </ContentWrapper>
        {!isRegisteredUser && <Actions />}
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(AboutUsPage)));
