import React from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import AdminTemplate from 'components/shared/templates/AdminTemplate';
import CreateCharacteristicForm from './components/CreateCharacteristicForm';
import ExistedCharacteristics from './components/ExistedCharacteristics';

export const CHARACTERISTICS_TYPE = {
  NEW: 'NEW',
  EXISTED: 'EXISTED',
};

const AdminCharacteristicsPage = ({ query }) => {
  const { tab = CHARACTERISTICS_TYPE.NEW } = query;
  const { pushRoute } = useRouter();

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        tab: selectedTab,
      },
    });
  };

  const TABS = [
    {
      id: CHARACTERISTICS_TYPE.NEW,
      name: 'Создание новой',
      action: () => onChangeTab(CHARACTERISTICS_TYPE.NEW),
      content: <CreateCharacteristicForm />,
    },
    {
      id: CHARACTERISTICS_TYPE.EXISTED,
      name: 'Каталог существующих',
      action: () => onChangeTab(CHARACTERISTICS_TYPE.EXISTED),
      content: <ExistedCharacteristics query={query} />,
    },
  ];

  return <AdminTemplate title="Характеристики" tabs={TABS} activeId={tab} />;
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminCharacteristicsPage))),
);
