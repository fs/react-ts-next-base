import React from 'react';
import useRouter from 'hooks/useRouter';

import Tabs from 'components/shared/molecules/Tabs';

export const operations = {
  ALL: 'ALL',
  ORDERS: 'ORDERS',
  HISTORY: 'HISTORY',
};

export const operationsTitles = {
  [operations.ALL]: 'Все',
  [operations.ORDERS]: 'По заказам',
  [operations.HISTORY]: 'История АС',
};

const AnalyticalAccountTabs = ({ query }) => {
  const { pushRoute } = useRouter();

  const onTabClick = tab => {
    pushRoute({
      query: { ...query, operations: tab },
    });
  };

  const TABS = [
    {
      id: operations.ALL,
      name: operationsTitles.ALL,
      action: () => onTabClick(operations.ALL),
    },
    {
      id: operations.ORDERS,
      name: operationsTitles.ORDERS,
      action: () => onTabClick(operations.ORDERS),
    },
    {
      id: operations.HISTORY,
      name: operationsTitles.HISTORY,
      action: () => onTabClick(operations.HISTORY),
    },
  ];

  return <Tabs tabs={TABS} activeId={query.operations || operations.ALL} />;
};

export default AnalyticalAccountTabs;
