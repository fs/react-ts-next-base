import React from 'react';
import useRouter from 'hooks/useRouter';

import theme from 'public/styles/theme';
import Tabs from 'components/shared/molecules/Tabs';
import { catalogCategories, catalogTitles } from '../../constants';

import { CatalogTabWrapper } from './styled';

const CatalogTabs = ({ query }) => {
  const { pushRoute } = useRouter();

  const onTabClick = category => {
    pushRoute({ query: { ...query, category } });
  };

  const TABS = [
    {
      id: catalogCategories.ALL,
      name: catalogTitles.ALL,
      action: () => onTabClick(catalogCategories.ALL),
    },
    {
      id: catalogCategories.USED,
      name: catalogTitles.USED,
      action: () => onTabClick(catalogCategories.USED),
    },
    {
      id: catalogCategories.SALE,
      name: catalogTitles.SALE,
      action: () => onTabClick(catalogCategories.SALE),
      color: theme.colors.orange,
    },
  ];

  return (
    <CatalogTabWrapper>
      <Tabs tabs={TABS} activeId={query.category || catalogCategories.ALL} />
    </CatalogTabWrapper>
  );
};

export default CatalogTabs;
