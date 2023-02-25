import { useQuery } from '@apollo/client';
import CompanyRatingHistory from 'graphql/queries/companyRatingHistory.graphql';

export const useCompanyRatingHistory = ({ companyId }) => {
  const { data, loading, error, refetch } = useQuery(CompanyRatingHistory, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { companyId },
  });

  return {
    companyRatingHistory: data?.companyRatingHistory.map(history => history) || [],
    loading,
    error,
    refetch,
  };
};
