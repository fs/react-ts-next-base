import {
  useMyCompaniesQuery,
  MyCompaniesQueryVariables,
} from 'graphql/queries/__generated__/myCompanies.generated';
import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';
import { getLoadingType } from 'helpers';

export const useMyCompanies = ({
  companyIds,
  directions,
  statuses,
  first,
}: MyCompaniesQueryVariables) => {
  const { data, error, networkStatus, refetch, fetchMore } = useMyCompaniesQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: { companyIds, directions, statuses, first },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    myCompanies:
      (data?.myCompanies.edges?.map(company => company?.node) as CompanyInfoFragment[]) || [],
    pageInfo: data?.myCompanies?.pageInfo || { endCursor: null, hasNextPage: false },
    noCompanies: !data?.myCompanies.edges?.length,
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
