import React from 'react';

import LayoutTemplate from 'components/shared/templates/LayoutTemplate';
import Footer from 'components/shared/organisms/Footer';

import { FooterWrapper } from './styled';
import { TAuthTemplate } from './types';

const AuthTemplate: React.FunctionComponent<TAuthTemplate> = ({
  children,
  hasFooter = false,
  testId = 'auth-template',
}) => {
  return (
    <LayoutTemplate testId={testId} isShowScroll={false}>
      {children}
      {hasFooter && (
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )}
    </LayoutTemplate>
  );
};

export default AuthTemplate;
