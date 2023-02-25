import { useQuery } from '@apollo/client';

import CompanyLegalForms from 'graphql/queries/companyLegalForms.graphql';

export const useCompanyLegalForms = () => {
  const { data, loading, error, refetch } = useQuery(CompanyLegalForms, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    legalForms: data?.companyLegalForms || [],
    loading,
    error,
    refetch,
  };
};
