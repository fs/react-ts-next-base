import {
  CompanyLocationsQueryVariables,
  useCompanyLocationsQuery,
} from 'graphql/queries/__generated__/companyLocations.generated';
import {
  CustomerCompanyLocationsQueryVariables,
  useCustomerCompanyLocationsQuery,
} from 'graphql/queries/__generated__/customerCompanyLocations.generated';
import { CompanyLocationFragment } from 'graphql/fragments/__generated__/companyLocationInfo.generated';
import { getLoadingType } from 'helpers';

type TCompanyLocations = CompanyLocationsQueryVariables & {
  skip?: boolean;
};
export const useCompanyLocations = ({ companyId, statuses, skip = false }: TCompanyLocations) => {
  const { data, loading, error, refetch } = useCompanyLocationsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { companyId, statuses },
    skip,
  });

  return {
    locations: (data?.companyLocations as CompanyLocationFragment[]) || [],
    loading,
    error,
    refetch,
  };
};

export const useCustomerCompanyLocations = ({
  companyName,
  statuses,
  first,
  after,
  ids,
}: CustomerCompanyLocationsQueryVariables) => {
  const { data, networkStatus, error, fetchMore } = useCustomerCompanyLocationsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { companyName, statuses, first, after, ids },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    locations:
      (data?.customerCompanyLocations.edges?.map(
        location => location?.node,
      ) as CompanyLocationFragment[]) || [],
    pageInfo: data?.customerCompanyLocations?.pageInfo || {},
    loading,
    error,
    loadingMore,
    fetchMore,
  };
};
