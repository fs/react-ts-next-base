import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ReturnedShipmentFragmentDoc } from '../../fragments/__generated__/returnedShipmentInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReturnedShipmentMutationVariables = Types.Exact<{
  input: Types.CreateReturnedShipmentInput;
}>;

export type CreateReturnedShipmentMutation = {
  __typename?: 'Mutation';
  createReturnedShipment?: {
    __typename?: 'ReturnedShipment';
    endDate: any;
    id: string;
    rejectComment?: string | null;
    startDate: any;
    status: Types.ReturnedShipmentStatusEnum;
    attachments: Array<{
      __typename?: 'ReturnedShipmentAttachment';
      attachmentUrl: string;
      originalFilename?: string | null;
      id: string;
    }>;
    canConfirm: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        fullMessages: Array<string>;
        details: string;
      } | null;
    };
    canReject: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canUpdate: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
  } | null;
};

export const CreateReturnedShipmentDocument = gql`
  mutation CreateReturnedShipment($input: CreateReturnedShipmentInput!) {
    createReturnedShipment(input: $input) {
      ...ReturnedShipment
    }
  }
  ${ReturnedShipmentFragmentDoc}
`;
export type CreateReturnedShipmentMutationFn = Apollo.MutationFunction<
  CreateReturnedShipmentMutation,
  CreateReturnedShipmentMutationVariables
>;

/**
 * __useCreateReturnedShipmentMutation__
 *
 * To run a mutation, you first call `useCreateReturnedShipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReturnedShipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReturnedShipmentMutation, { data, loading, error }] = useCreateReturnedShipmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReturnedShipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReturnedShipmentMutation,
    CreateReturnedShipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateReturnedShipmentMutation,
    CreateReturnedShipmentMutationVariables
  >(CreateReturnedShipmentDocument, options);
}
export type CreateReturnedShipmentMutationHookResult = ReturnType<
  typeof useCreateReturnedShipmentMutation
>;
export type CreateReturnedShipmentMutationResult =
  Apollo.MutationResult<CreateReturnedShipmentMutation>;
export type CreateReturnedShipmentMutationOptions = Apollo.BaseMutationOptions<
  CreateReturnedShipmentMutation,
  CreateReturnedShipmentMutationVariables
>;
