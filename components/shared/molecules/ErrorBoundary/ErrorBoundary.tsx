import React, { ReactNode } from 'react';
import { ErrorBoundary as ErrorBoundaryRollbar, LEVEL_ERROR } from '@rollbar/react';
import { HOME } from 'config/routes';

import Footer from 'components/shared/organisms/Footer';

import ActionLink from 'components/shared/atoms/ActionLink';
import {
  Description,
  Header,
  Image,
  PageContainer,
  PageMessageTitle,
  TitleWrapper,
} from './styled';

type TErrorBoundaryProps = {
  children?: ReactNode;
};

const ErrorBoundary = ({ children }: TErrorBoundaryProps) => {
  const FallbackUI = () => (
    <PageContainer>
      <TitleWrapper data-testid="error-page-text">
        <PageMessageTitle>Ой</PageMessageTitle>
        <Header>Извините. Что то пошло не так!</Header>
        <Description>
          <ActionLink label="Вернуться на главную" href={HOME} $color="blue2F" />
        </Description>
        <Image />
      </TitleWrapper>
      <Footer />
    </PageContainer>
  );

  return (
    <ErrorBoundaryRollbar
      level={LEVEL_ERROR}
      // @ts-ignore:next-line
      fallbackUI={FallbackUI}
    >
      {children}
    </ErrorBoundaryRollbar>
  );
};

export default ErrorBoundary;
