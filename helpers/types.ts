export function findAvailableValue<T extends string>(
  search: string | string[] | undefined,
  target: T[],
): T | null {
  if (typeof search === 'string') {
    return target.includes(search as T) ? (search as T) : null;
  }
  return null;
}

export const findAvailableValues = <T extends string>(
  search: string | string[] | undefined,
  availableStatuses: T[],
): T[] | null => {
  if (typeof search === 'string') {
    const filters = search.split(',') as T[];
    const filterFiltered = filters.reduce<T[]>((acc, value) => {
      if (availableStatuses.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, []);
    return filterFiltered.length <= 0 ? null : filterFiltered;
  }
  return null;
};

export const filterAvailableNodes = <T>(nodes?: (T | null | undefined)[]): T[] => {
  if (nodes) {
    const availableNodes: T[] = [];
    nodes.forEach(node => {
      if (node) availableNodes.push(node);
    });
    return availableNodes;
  }
  return [];
};
