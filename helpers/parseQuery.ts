export const parseSearchQuery = (searchQuery: string | string[] | undefined) => {
  return searchQuery === undefined || Array.isArray(searchQuery) ? null : searchQuery;
};

export const parseQueryParam = (param: string | string[] | undefined) => {
  return Array.isArray(param) || param === undefined ? '' : param;
};
