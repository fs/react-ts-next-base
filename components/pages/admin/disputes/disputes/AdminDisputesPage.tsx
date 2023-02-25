import React from 'react';
import useRouter from 'hooks/useRouter';
import { ParsedUrlQuery } from 'querystring';
import { parseSearchQuery } from 'helpers';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { TNextPage } from 'lib/apollo/types';
import { DisputeStatusEnum } from 'graphql/types';
import { findAvailableValues } from 'helpers/types';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import UnavailablePage from 'components/shared/molecules/UnavailablePage';

import DisputesList from '../components/DisputesList';
import DisputesFilter from '../components/DisputesFilter';

import { SearchWrapper } from './styled';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    searchQuery: parseSearchQuery(query.searchQuery),
    filterBy: findAvailableValues(query.filterBy, Object.values(DisputeStatusEnum)) || [],
  };
};

export const AdminDisputesPage: TNextPage = () => {
  if (process.env.FEATURE_ADMIN_DISPUTES_PAGE !== 'true') {
    return (
      <AdminTemplate testId="admin-disputes-unavailable-page">
        <UnavailablePage />
      </AdminTemplate>
    );
  }

  const { pushRoute, query } = useRouter();
  const { searchQuery, filterBy } = parseQuery(query);

  const onChangeFilter = (params?: string) => {
    pushRoute({
      query: {
        ...query,
        filterBy: params,
      },
    });
  };

  return (
    <AdminTemplate title="Споры по заказам" testId="admin-disputes-page">
      <SearchWrapper>
        <SearchForm
          $width="43rem"
          placeholder="Введите название компании или номер заказа"
          rounded
        />
        <DisputesFilter disputeStatuses={filterBy} onChangeFilter={onChangeFilter} />
      </SearchWrapper>

      <DisputesList searchQuery={searchQuery} disputeStatuses={filterBy} />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminDisputesPage))));
