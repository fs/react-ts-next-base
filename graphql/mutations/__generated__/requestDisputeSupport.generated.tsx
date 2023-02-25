import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestDisputeSupportMutationVariables = Types.Exact<{
  input: Types.RequestDisputeSupportInput;
}>;

export type RequestDisputeSupportMutation = {
  __typename?: 'Mutation';
  requestDisputeSupport?: {
    __typename?: 'RequestDisputeSupportPayload';
    dispute: {
      __typename?: 'Dispute';
      id: string;
      status: Types.DisputeStatusEnum;
      medagregatorResponseDeadlineAt?: any | null;
      canRequestSupport: {
        __typename?: 'AuthorizationResult';
        message?: string | null;
        value: boolean;
        reasons?: {
          __typename?: 'FailureReasons';
          details: string;
          fullMessages: Array<string>;
        } | null;
      };
      canAcceptProposal: {
        __typename?: 'AuthorizationResult';
        message?: string | null;
        value: boolean;
        reasons?: {
          __typename?: 'FailureReasons';
          details: string;
          fullMessages: Array<string>;
        } | null;
      };
      canCreateProposal: {
        __typename?: 'AuthorizationResult';
        message?: string | null;
        value: boolean;
        reasons?: {
          __typename?: 'FailureReasons';
          details: string;
          fullMessages: Array<string>;
        } | null;
      };
    };
  } | null;
};

export const RequestDisputeSupportDocument = gql`
  mutation RequestDisputeSupport($input: RequestDisputeSupportInput!) {
    requestDisputeSupport(input: $input) {
      dispute {
        id
        status
        medagregatorResponseDeadlineAt
        canRequestSupport {
          message
          reasons {
            details
            fullMessages
          }
          value
        }
        canAcceptProposal {
          message
          reasons {
            details
            fullMessages
          }
          value
        }
        canCreateProposal {
          message
          reasons {
            details
            fullMessages
          }
          value
        }
      }
    }
  }
`;
export type RequestDisputeSupportMutationFn = Apollo.MutationFunction<
  RequestDisputeSupportMutation,
  RequestDisputeSupportMutationVariables
>;

/**
 * __useRequestDisputeSupportMutation__
 *
 * To run a mutation, you first call `useRequestDisputeSupportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestDisputeSupportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestDisputeSupportMutation, { data, loading, error }] = useRequestDisputeSupportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestDisputeSupportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestDisputeSupportMutation,
    RequestDisputeSupportMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RequestDisputeSupportMutation, RequestDisputeSupportMutationVariables>(
    RequestDisputeSupportDocument,
    options,
  );
}
export type RequestDisputeSupportMutationHookResult = ReturnType<
  typeof useRequestDisputeSupportMutation
>;
export type RequestDisputeSupportMutationResult =
  Apollo.MutationResult<RequestDisputeSupportMutation>;
export type RequestDisputeSupportMutationOptions = Apollo.BaseMutationOptions<
  RequestDisputeSupportMutation,
  RequestDisputeSupportMutationVariables
>;
