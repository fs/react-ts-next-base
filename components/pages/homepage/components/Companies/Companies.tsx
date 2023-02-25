import React from 'react';

import {
  PageTitleWrapper,
  PageContainer,
  ContentWrapper,
  Title,
  ContentTitleWrapper,
} from './styled';
import { TCompanies } from './types';

const Companies: React.FunctionComponent<TCompanies> = ({ title, children }) => {
  return (
    <PageContainer>
      {title && (
        <PageTitleWrapper>
          <ContentTitleWrapper>
            <Title>{title}</Title>
          </ContentTitleWrapper>
        </PageTitleWrapper>
      )}
      <ContentWrapper>{children}</ContentWrapper>
    </PageContainer>
  );
};

export default Companies;
