import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateWithdrawalMutationVariables = Types.Exact<{
  input: Types.CreateWithdrawalInput;
}>;

export type CreateWithdrawalMutation = {
  __typename?: 'Mutation';
  createWithdrawal?: {
    __typename?: 'Transfer';
    amount: number;
    id: string;
    transferType: Types.TransferTypeEnum;
    vat: number;
    vatType: Types.TransferVatTypeEnum;
  } | null;
};

export const CreateWithdrawalDocument = gql`
  mutation CreateWithdrawal($input: CreateWithdrawalInput!) {
    createWithdrawal(input: $input) {
      amount
      id
      transferType
      vat
      vatType
    }
  }
`;
export type CreateWithdrawalMutationFn = Apollo.MutationFunction<
  CreateWithdrawalMutation,
  CreateWithdrawalMutationVariables
>;

/**
 * __useCreateWithdrawalMutation__
 *
 * To run a mutation, you first call `useCreateWithdrawalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWithdrawalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWithdrawalMutation, { data, loading, error }] = useCreateWithdrawalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWithdrawalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWithdrawalMutation,
    CreateWithdrawalMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateWithdrawalMutation, CreateWithdrawalMutationVariables>(
    CreateWithdrawalDocument,
    options,
  );
}
export type CreateWithdrawalMutationHookResult = ReturnType<typeof useCreateWithdrawalMutation>;
export type CreateWithdrawalMutationResult = Apollo.MutationResult<CreateWithdrawalMutation>;
export type CreateWithdrawalMutationOptions = Apollo.BaseMutationOptions<
  CreateWithdrawalMutation,
  CreateWithdrawalMutationVariables
>;
