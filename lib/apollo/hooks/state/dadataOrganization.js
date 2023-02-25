import { useLazyQuery } from '@apollo/client';
import DadataOrganization from 'graphql/queries/dadataOrganization.graphql';

export const useDadataOrganization = () => {
  const [loadDadataOrg, { called, loading, error, data }] = useLazyQuery(DadataOrganization, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  return {
    orgInfo: data?.dadataOrganization || null,
    loading,
    error,
    called,
    loadDadataOrg,
  };
};
