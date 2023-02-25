import { ParsedUrlQuery } from 'querystring';
import querystring from 'query-string';

export const stringifyQuery = (query: ParsedUrlQuery) => {
  return querystring.stringify(query, { skipNull: true });
};
