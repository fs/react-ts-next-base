import { QueryCompaniesArgs } from 'graphql/types';
import { useCompaniesQuery } from 'graphql/queries/__generated__/companies.generated';
import { filterAvailableNodes } from 'helpers/types';
import { getLoadingType } from 'helpers';

export const useCompanies = ({
  companyIds,
  searchQuery,
  statuses,
  directions,
  orderBy,
  first,
  after,
}: QueryCompaniesArgs) => {
  const { data, networkStatus, error, refetch, fetchMore } = useCompaniesQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      companyIds,
      searchQuery,
      statuses,
      directions,
      orderBy,
      first,
      after,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    companies: filterAvailableNodes(data?.companies?.edges?.map(company => company?.node)) || [],
    pageInfo: data?.companies?.pageInfo || {},
    loading,
    error,
    loadingMore,
    refetch,
    fetchMore,
  };
};
