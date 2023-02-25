import { useQuery } from '@apollo/client';
import CustomerCompanies from 'graphql/queries/customerCompanies.graphql';
import { getLoadingType } from 'helpers';

export const useCustomerCompanies = ({
  companyId,
  deleted,
  statuses = [],
  officialName,
  directions,
  urgent,
  first = 16,
  after,
}) => {
  const { data, networkStatus, error, fetchMore } = useQuery(CustomerCompanies, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      companyIds: [companyId],
      deleted,
      statuses,
      officialName,
      directions,
      urgent,
      first,
      after,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    customerCompanies: data?.customerCompanies?.edges.map(company => company.node) || [],
    pageInfo: data?.customerCompanies?.pageInfo,
    loading,
    error,
    loadingMore,
    fetchMore,
  };
};
