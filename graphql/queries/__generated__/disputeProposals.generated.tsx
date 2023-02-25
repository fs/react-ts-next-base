import * as Types from '../../types';

import { gql } from '@apollo/client';
import { DisputeProposalFragmentDoc } from '../../fragments/__generated__/disputeProposalInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DisputeProposalsQueryVariables = Types.Exact<{
  disputeId: Types.Scalars['ID'];
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type DisputeProposalsQuery = {
  __typename?: 'Query';
  disputeProposals: {
    __typename?: 'DisputeProposalConnection';
    edges?: Array<{
      __typename?: 'DisputeProposalEdge';
      cursor: string;
      node?: {
        __typename?: 'DisputeProposal';
        comment?: string | null;
        createdAt: any;
        deliveryReturnAmount?: number | null;
        id: string;
        originator: Types.DisputeProposalOriginatorEnum;
        productReturnAmount: number;
        returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
        returnQuantity?: number | null;
        returnRequired: boolean;
        status: Types.DisputeProposalStatusEnum;
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const DisputeProposalsDocument = gql`
  query DisputeProposals($disputeId: ID!, $first: Int, $after: String) {
    disputeProposals(disputeId: $disputeId, first: $first, after: $after) {
      edges {
        cursor
        node {
          ...DisputeProposal
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${DisputeProposalFragmentDoc}
`;

/**
 * __useDisputeProposalsQuery__
 *
 * To run a query within a React component, call `useDisputeProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDisputeProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDisputeProposalsQuery({
 *   variables: {
 *      disputeId: // value for 'disputeId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useDisputeProposalsQuery(
  baseOptions: Apollo.QueryHookOptions<DisputeProposalsQuery, DisputeProposalsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DisputeProposalsQuery, DisputeProposalsQueryVariables>(
    DisputeProposalsDocument,
    options,
  );
}
export function useDisputeProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DisputeProposalsQuery, DisputeProposalsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DisputeProposalsQuery, DisputeProposalsQueryVariables>(
    DisputeProposalsDocument,
    options,
  );
}
export type DisputeProposalsQueryHookResult = ReturnType<typeof useDisputeProposalsQuery>;
export type DisputeProposalsLazyQueryHookResult = ReturnType<typeof useDisputeProposalsLazyQuery>;
export type DisputeProposalsQueryResult = Apollo.QueryResult<
  DisputeProposalsQuery,
  DisputeProposalsQueryVariables
>;
