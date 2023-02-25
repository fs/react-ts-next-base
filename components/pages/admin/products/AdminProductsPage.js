import React from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import { useCustomerProducts } from 'lib/apollo/hooks/state/customerProducts';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { NOT_VERIFIED, VERIFIED, OUT_OF_STOCK, REJECTED } from 'config/constants/status';
import { PRODUCT_TYPE } from 'config/constants/product';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';
import Products from './components/Products';

const getCustomerProductsQuery = tab => {
  switch (tab) {
    case PRODUCT_TYPE.NEW:
      return { deleted: false, draft: false, template: false, statuses: [NOT_VERIFIED] };
    case PRODUCT_TYPE.REJECTED:
      return { deleted: false, draft: false, template: false, statuses: [REJECTED] };
    case PRODUCT_TYPE.EXISTED:
      return { deleted: false, draft: false, template: false, statuses: [VERIFIED, OUT_OF_STOCK] };
    case PRODUCT_TYPE.DELETED:
      return { deleted: true, draft: false, template: false, statuses: [] };
    default:
      console.error(`Unknown tab : '${tab}'!`);
      return { deleted: false, draft: false, template: false, statuses: [] };
  }
};

const AdminProductsPage = ({ query }) => {
  const { tab = PRODUCT_TYPE.NEW, searchQuery } = query;
  const { pushRoute } = useRouter();

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        tab: selectedTab,
      },
    });
  };

  const customerProductsQuery = getCustomerProductsQuery(tab);

  const { customerProducts, loading, error, pageInfo, fetchMore, loadingMore } =
    useCustomerProducts({
      ...customerProductsQuery,
      searchQuery,
      first: 12,
    });

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (!loading && error) return <ErrorPage statusCode={404} />;

  const TABS = [
    {
      id: PRODUCT_TYPE.NEW,
      name: 'Новые',
      action: () => onChangeTab(PRODUCT_TYPE.NEW),
    },
    {
      id: PRODUCT_TYPE.REJECTED,
      name: 'В редакции',
      action: () => onChangeTab(PRODUCT_TYPE.REJECTED),
    },
    {
      id: PRODUCT_TYPE.EXISTED,
      name: 'Каталог существующих',
      action: () => onChangeTab(PRODUCT_TYPE.EXISTED),
    },
    {
      id: PRODUCT_TYPE.DELETED,
      name: 'Удаленные',
      action: () => onChangeTab(PRODUCT_TYPE.DELETED),
    },
  ];

  return (
    <AdminTemplate title="Товары" tabs={TABS} activeId={tab || PRODUCT_TYPE.NEW}>
      <SearchForm $width="43rem" $mb={32} rounded />
      <Products
        customerProducts={customerProducts}
        loading={loading}
        pageInfo={pageInfo}
        onLoadMore={onLoadMore}
      />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminProductsPage))));
