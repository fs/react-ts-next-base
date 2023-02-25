import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BlockUserMutationVariables = Types.Exact<{
  input: Types.BlockUserInput;
}>;

export type BlockUserMutation = {
  __typename?: 'Mutation';
  blockUser?: { __typename?: 'User'; id: string; fullName?: string | null } | null;
};

export const BlockUserDocument = gql`
  mutation BlockUser($input: BlockUserInput!) {
    blockUser(input: $input) {
      id
      fullName
    }
  }
`;
export type BlockUserMutationFn = Apollo.MutationFunction<
  BlockUserMutation,
  BlockUserMutationVariables
>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBlockUserMutation(
  baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(
    BlockUserDocument,
    options,
  );
}
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<
  BlockUserMutation,
  BlockUserMutationVariables
>;
