import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import { useCompanies } from 'lib/apollo/hooks/state/companies';

import { RATING } from 'config/constants/orders';
import { BLACKLISTED } from 'config/constants/status';

import SearchForm from 'components/shared/molecules/SearchForm';
import CompanyCard from 'components/shared/molecules/CompanyCard';
import InfinityList from 'components/shared/organisms/InfinityList';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import {
  CompaniesWrapper,
  Content,
  PageContainer,
  SubHeader,
  Title,
  InfinityContent,
} from './styled';

export const CompaniesBlackListPage = ({ query }) => {
  const { searchQuery } = query;

  const queryObject = {
    searchQuery,
    orderBy: RATING,
    statuses: [BLACKLISTED],
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
    <LayoutTemplate testId="companies-black-list-page">
      <PageContainer>
        <SubHeader>
          <Title>ЧЕРНЫЙ СПИСОК</Title>
        </SubHeader>
        <Content>
          <SearchForm placeholder="Название компании или ИНН" query={query} />
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

export default withGetDataFromTree(withAuth(withRoutesRules(CompaniesBlackListPage)));
