import { TFetchFn } from '../types';

export const loadOptions = async <T>(
  search: string,
  fetchFn: TFetchFn<T>,
): Promise<{
  options: { value: T; label: string }[];
  hasMore: boolean;
}> => {
  const { nodes } = await fetchFn({ name: search.toLowerCase() });
  const options =
    nodes && !!search ? [...nodes.map(node => ({ value: node?.id, label: node?.name }))] : [];
  return {
    options,
    hasMore: false,
  };
};
