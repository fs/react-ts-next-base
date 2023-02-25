import React from 'react';
import Rollbar from 'rollbar';
import { NextPage } from 'next';

import { HOME } from 'config/routes';

import Footer from 'components/shared/organisms/Footer';
import ActionLink from 'components/shared/atoms/ActionLink';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { TErrorPage, TInitialProps, TStatusCode } from './types';
import { PageContainer, TitleWrapper, NotFoundHeader, Header, Description, Image } from './styled';

const ErrorPage: NextPage<TErrorPage> = ({ statusCode }) => {
  const is404 = statusCode === 404;

  return (
    <LayoutTemplate testId="error-page">
      <PageContainer>
        <TitleWrapper data-testid="error-page-text">
          {is404 && <NotFoundHeader>404</NotFoundHeader>}
          <Header>Запрашиваемая страница не найдена!</Header>
          <Description>
            <ActionLink size={16} label="Вернуться на главную" href={HOME} $color="blue2F" />
          </Description>
          <Image />
        </TitleWrapper>
        <Footer />
      </PageContainer>
    </LayoutTemplate>
  );
};

const getStatusCode = ({ res, err }: TStatusCode) => {
  if (res) {
    return res.statusCode;
  }

  return err ? err.statusCode : 404;
};

ErrorPage.getInitialProps = ({ res, err, req, statusCode }: TInitialProps) => {
  if (typeof window === 'undefined' && process.env.CLIENT_ROLLBAR_KEY) {
    if (err) {
      const rollbar = new Rollbar({
        accessToken: process.env.CLIENT_ROLLBAR_KEY,
        environment: 'server-side',
      });
      rollbar.error(err, req, res, rollbarError => {
        if (rollbarError) {
          console.error('Rollbar error reporting failed:', rollbarError);
        }
      });
    }
  }
  return {
    statusCode: statusCode || getStatusCode({ res, err }),
  };
};

export default ErrorPage;
