import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import AdminTemplate from 'components/shared/templates/AdminTemplate';
import SearchForm from 'components/shared/molecules/SearchForm';

import OperationsTab from './components/OperationsTab';
import WithdrawalTab from './components/WithdrawalTab';
import HistoryTab from './components/HistoryTab';

import { OperationsWrapper } from './styled';

const config = {
  operations: 'operations',
  withdrawal: 'withdrawal',
  history: 'history',
};

export const AdminAnalyticalAccountPage = () => {
  const { pushRoute, query } = useRouter();

  const TABS = [
    {
      id: config.operations,
      name: 'Новые операции',
      action: () =>
        pushRoute({
          query: {
            tab: config.operations,
          },
        }),
    },
    {
      id: config.withdrawal,
      name: 'Вывод средств',
      action: () =>
        pushRoute({
          query: {
            tab: config.withdrawal,
          },
        }),
    },
    {
      id: config.history,
      name: 'История',
      action: () =>
        pushRoute({
          query: {
            tab: config.history,
          },
        }),
    },
  ];

  const currentTab = useMemo(() => {
    switch (query.tab || config.operations) {
      case config.operations:
        return <OperationsTab query={query} />;
      case config.withdrawal:
        return <WithdrawalTab query={query} />;
      default:
        return <HistoryTab query={query} />;
    }
  }, [query]);

  return (
    <AdminTemplate
      title="Аналитический счет"
      tabs={TABS}
      activeId={query.tab || config.operations}
      testId="admin-analytical-acc-page"
    >
      <SearchForm $width="43rem" $mb={24} rounded />
      <OperationsWrapper>{currentTab}</OperationsWrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminAnalyticalAccountPage))),
);
