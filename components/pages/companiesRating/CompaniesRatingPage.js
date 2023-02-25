import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCompanies } from 'lib/apollo/hooks/state/companies';

import { RATING } from 'config/constants/orders';
import { VERIFIED } from 'config/constants/status';
import { SELLER } from 'config/constants/directions';

import SearchForm from 'components/shared/molecules/SearchForm';
import CompanyCard from 'components/shared/molecules/CompanyCard';
import InfinityList from 'components/shared/organisms/InfinityList';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import {
  PageContainer,
  SubHeader,
  Title,
  Content,
  InfinityContent,
  CompaniesWrapper,
} from './styled';

export const CompaniesRatingPage = ({ query }) => {
  const { searchQuery } = query;

  const queryObject = {
    searchQuery,
    orderBy: RATING,
    statuses: [VERIFIED],
    directions: [SELLER],
    first: 12,
  };

  const { companies, loading, loadingMore, pageInfo, fetchMore } = useCompanies(queryObject);
  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  return (
    <LayoutTemplate testId="companies-rating-page">
      <PageContainer>
        <SubHeader>
          <Title>Рейтинг компаний</Title>
        </SubHeader>
        <Content>
          <SearchForm placeholder="Название компании или ИНН" />
          <InfinityList
            dataLength={companies.length}
            scrollableTarget="layout-template-content"
            hasNextPage={hasNextPage}
            loading={loading}
            onLoadMore={onLoadMore}
            titleEmptyMessage="По вашему запросу ничего не найдено"
            descriptionEmptyMessage="Попробуйте изменить формулировку"
          >
            <InfinityContent>
              <CompaniesWrapper>
                {companies.map(company => {
                  return <CompanyCard key={company.id} company={company} />;
                })}
              </CompaniesWrapper>
            </InfinityContent>
          </InfinityList>
        </Content>
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(CompaniesRatingPage)));
