import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useMyProducts } from 'lib/apollo/hooks/state/myProducts';
import { getStatus } from 'config/constants/status';

import ErrorPage from 'pages/_error';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import Loader from 'components/shared/atoms/Loader';
import ProductsFilter from '../components/ProductsFilter';
import ProductsList from '../components/ProductsList';
import ProductsSearchBar from '../components/ProductsSearchBar';
import { productTypes } from '../constants';

export const ProductsPage = ({ query }) => {
  const { companyId, type, productStatuses, searchQuery, sortOrder } = query;
  const statuses = productStatuses ? productStatuses?.split(',') : undefined;

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  const isCompanyFullFilled = !!company?.companyConfirmationRecords.length;
  const isCompanyVerified = getStatus(company?.status);

  const activeType = query.type || productTypes.ACTIVE;
  const preparedQuery = { ...query, type: activeType };

  let productType;

  switch (type) {
    case productTypes.DRAFT:
      productType = { draft: true, template: false };
      break;
    case productTypes.DELETED:
      productType = { deleted: true };
      break;
    case productTypes.TEMPLATE:
      productType = { template: true };
      break;
    default:
      productType = { deleted: false, template: false, draft: false };
  }

  const queryObject = {
    companyIds: [companyId],
    searchQuery,
    orderBy: sortOrder,
    first: [productTypes.ACTIVE, productTypes.DRAFT].includes(type) || !type ? 11 : 12,
    statuses,
    ...productType,
  };

  const {
    products,
    loading: loadingProducts,
    pageInfo,
    fetchMore,
    loadingMore,
    refetch,
  } = useMyProducts(queryObject);

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor, first: 12 } });
  };

  if (!company && !loading && !loadingProducts) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-products-page" company={company}>
      {company ? (
        isCompanyVerified ? (
          <>
            <ProductsFilter query={preparedQuery} />
            <ProductsSearchBar query={query} statuses={statuses} />
            <ProductsList
              products={products}
              refetchProducts={refetch}
              companyId={companyId}
              isCompanyFullFilled={isCompanyFullFilled}
              query={preparedQuery}
              searchQuery={searchQuery}
              loading={loading || loadingProducts}
              pageInfo={pageInfo}
              onLoadMore={onLoadMore}
            />
          </>
        ) : (
          <EmptyMessageCheckingCompany />
        )
      ) : (
        <Loader />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(ProductsPage))));
