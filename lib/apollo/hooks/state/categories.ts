import { QueryCategoriesArgs } from 'graphql/types';
import { useCategoriesQuery } from 'graphql/queries/__generated__/categories.generated';
import { useDeepCategoriesQuery } from 'graphql/queries/__generated__/deepCategories.generated';

export const useCategories = ({
  parentId,
  ids,
  skip = false,
  isDeep = false,
}: QueryCategoriesArgs & { skip?: boolean; isDeep?: boolean }) => {
  const query = isDeep ? useDeepCategoriesQuery : useCategoriesQuery;
  const { data, loading, error, refetch } = query({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { parentId, ids },
    skip,
  });

  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
};
