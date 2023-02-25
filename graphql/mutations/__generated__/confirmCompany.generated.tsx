import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmCompanyMutationVariables = Types.Exact<{
  input: Types.ConfirmCompanyInput;
}>;

export type ConfirmCompanyMutation = {
  __typename?: 'Mutation';
  confirmCompany?: {
    __typename?: 'Company';
    id: string;
    officialName: string;
    status: Types.CompanyStatusEnum;
  } | null;
};

export const ConfirmCompanyDocument = gql`
  mutation ConfirmCompany($input: ConfirmCompanyInput!) {
    confirmCompany(input: $input) {
      id
      officialName
      status
    }
  }
`;
export type ConfirmCompanyMutationFn = Apollo.MutationFunction<
  ConfirmCompanyMutation,
  ConfirmCompanyMutationVariables
>;

/**
 * __useConfirmCompanyMutation__
 *
 * To run a mutation, you first call `useConfirmCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmCompanyMutation, { data, loading, error }] = useConfirmCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<ConfirmCompanyMutation, ConfirmCompanyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmCompanyMutation, ConfirmCompanyMutationVariables>(
    ConfirmCompanyDocument,
    options,
  );
}
export type ConfirmCompanyMutationHookResult = ReturnType<typeof useConfirmCompanyMutation>;
export type ConfirmCompanyMutationResult = Apollo.MutationResult<ConfirmCompanyMutation>;
export type ConfirmCompanyMutationOptions = Apollo.BaseMutationOptions<
  ConfirmCompanyMutation,
  ConfirmCompanyMutationVariables
>;
