import {
  useAccountQuery,
  AccountQueryVariables,
} from 'graphql/queries/__generated__/account.generated';

export const useAccount = ({ companyId }: AccountQueryVariables) => {
  const { data, loading, error, refetch } = useAccountQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { companyId },
  });

  return {
    account: data?.account || {},
    loading,
    error,
    refetch,
  };
};
