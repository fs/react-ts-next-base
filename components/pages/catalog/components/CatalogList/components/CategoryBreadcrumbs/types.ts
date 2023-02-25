import { parseQueryParam } from 'helpers';
import { ParsedUrlQuery } from 'querystring';

export const parseQuery = (query: ParsedUrlQuery) => {
  return {
    currentCategory: parseQueryParam(query.currentCategory),
    subcategory: parseQueryParam(query.subcategory),
    section: parseQueryParam(query.section),
    subsection: parseQueryParam(query.subsection),
  };
};
