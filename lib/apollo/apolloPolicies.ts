import { KeyArgsFunction } from '@apollo/client/cache/inmemory/policies';
import { keys, omit } from 'lodash';
import { FieldMergeFunction } from '@apollo/client';

import { PageInfo } from './types';

const notMergedQueries: string[] = [];
const mergedQueries: string[] = [];

const keyArgsFunction: KeyArgsFunction = args =>
  keys(omit(args, ['first', 'last', 'after', 'before']));

const mergeFunction: FieldMergeFunction = (
  existing = { edges: [] },
  incoming: { pageInfo: PageInfo; edges: [] },
  options: { args: { after?: string } | null },
) => {
  return {
    ...incoming,
    edges: options.args?.after ? [...existing.edges, ...incoming.edges] : incoming.edges,
    pageInfo: incoming.pageInfo,
  };
};

const mergeFieldOptions = {
  keyArgs: keyArgsFunction,
  merge: mergeFunction,
};

export const apolloPolicies = {
  typePolicies: {
    Query: {
      fields: {
        ...notMergedQueries.reduce(
          (acc: { [key: string]: { merge: boolean } }, curr) => ({
            ...acc,
            [curr]: { merge: false },
          }),
          {},
        ),
        ...mergedQueries.reduce(
          (acc: { [key: string]: typeof mergeFieldOptions }, curr) => ({
            ...acc,
            [curr]: mergeFieldOptions,
          }),
          {},
        ),
      },
    },
  },
};
