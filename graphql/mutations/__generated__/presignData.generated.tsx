import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PresignDataMutationVariables = Types.Exact<{
  input: Types.PresignDataInput;
}>;

export type PresignDataMutation = {
  __typename?: 'Mutation';
  presignData?: {
    __typename?: 'Presign';
    presignMethod: Types.PresignMethodEnum;
    url: string;
    fields: Array<{ __typename?: 'PresignField'; key: string; value: string }>;
    headers: Array<{ __typename?: 'PresignHeader'; name: string; value: string }>;
  } | null;
};

export const PresignDataDocument = gql`
  mutation presignData($input: PresignDataInput!) {
    presignData(input: $input) {
      fields {
        key
        value
      }
      headers {
        name
        value
      }
      presignMethod
      url
    }
  }
`;
export type PresignDataMutationFn = Apollo.MutationFunction<
  PresignDataMutation,
  PresignDataMutationVariables
>;

/**
 * __usePresignDataMutation__
 *
 * To run a mutation, you first call `usePresignDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePresignDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [presignDataMutation, { data, loading, error }] = usePresignDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePresignDataMutation(
  baseOptions?: Apollo.MutationHookOptions<PresignDataMutation, PresignDataMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PresignDataMutation, PresignDataMutationVariables>(
    PresignDataDocument,
    options,
  );
}
export type PresignDataMutationHookResult = ReturnType<typeof usePresignDataMutation>;
export type PresignDataMutationResult = Apollo.MutationResult<PresignDataMutation>;
export type PresignDataMutationOptions = Apollo.BaseMutationOptions<
  PresignDataMutation,
  PresignDataMutationVariables
>;
