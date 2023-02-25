import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendSmsCodeMutationVariables = Types.Exact<{
  input: Types.SendSmsInput;
}>;

export type SendSmsCodeMutation = {
  __typename?: 'Mutation';
  sendSmsCode?: {
    __typename?: 'SmsCode';
    id: string;
    resendingAvailableAfter: any;
    validUntil: any;
  } | null;
};

export const SendSmsCodeDocument = gql`
  mutation sendSmsCode($input: SendSmsInput!) {
    sendSmsCode(input: $input) {
      id
      resendingAvailableAfter
      validUntil
    }
  }
`;
export type SendSmsCodeMutationFn = Apollo.MutationFunction<
  SendSmsCodeMutation,
  SendSmsCodeMutationVariables
>;

/**
 * __useSendSmsCodeMutation__
 *
 * To run a mutation, you first call `useSendSmsCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSmsCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSmsCodeMutation, { data, loading, error }] = useSendSmsCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendSmsCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<SendSmsCodeMutation, SendSmsCodeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendSmsCodeMutation, SendSmsCodeMutationVariables>(
    SendSmsCodeDocument,
    options,
  );
}
export type SendSmsCodeMutationHookResult = ReturnType<typeof useSendSmsCodeMutation>;
export type SendSmsCodeMutationResult = Apollo.MutationResult<SendSmsCodeMutation>;
export type SendSmsCodeMutationOptions = Apollo.BaseMutationOptions<
  SendSmsCodeMutation,
  SendSmsCodeMutationVariables
>;
