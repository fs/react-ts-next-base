import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateRejectedCompanyMutationVariables = Types.Exact<{
  input: Types.UpdateRejectedCompanyInput;
}>;

export type UpdateRejectedCompanyMutation = {
  __typename?: 'Mutation';
  updateRejectedCompany?: {
    __typename?: 'Company';
    id: string;
    inn: string;
    kpp: string;
    officialName: string;
    unofficialName: string;
    deliveredOrdersCount?: number | null;
    directorFullName: string;
    legalAddress: string;
    postcode: string;
    ogrn: string;
    oktmo: string;
    bankName: string;
    checkingAccount: string;
    correspondentAccount: string;
    bic: string;
    email: string;
    phoneNumber: string;
    direction: Types.CompanyDirectionEnum;
    logoUrl: string;
    main: boolean;
    rejectsCount: number;
    sellableProductsCount: number;
    status: Types.CompanyStatusEnum;
    taxationSystem?: Types.CompanyTaxationSystemEnum | null;
    rating?: number | null;
    receivedReviewsCount: number;
    createdAt: any;
    verificationDeadlineAt?: any | null;
    deletedAt?: any | null;
    deletionReason?: Types.CompanyDeletionReasonEnum | null;
    blacklistedAt?: any | null;
    legalForm: { __typename?: 'CompanyLegalForm'; id: string; name: string; shortName: string };
    companyConfirmationRecords: Array<{
      __typename?: 'ConfirmationRecord';
      id: string;
      attachmentUrl: string;
      originalFilename?: string | null;
    }>;
    companyMembers: Array<{
      __typename?: 'CompanyMember';
      id: string;
      user: { __typename?: 'User'; id: string };
      role: { __typename?: 'CompanyRole'; id: string; name: string };
    }>;
    myRole?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
    rejectedFields: Array<{
      __typename?: 'CompanyRejectedField';
      comment: string;
      name: Types.CompanyFieldEnum;
    }>;
    lastEmployeeMembers: Array<{
      __typename?: 'CompanyMember';
      id: string;
      user: { __typename?: 'User'; id: string; email: string };
    }>;
  } | null;
};

export const UpdateRejectedCompanyDocument = gql`
  mutation UpdateRejectedCompany($input: UpdateRejectedCompanyInput!) {
    updateRejectedCompany(input: $input) {
      ...CompanyInfo
    }
  }
  ${CompanyInfoFragmentDoc}
`;
export type UpdateRejectedCompanyMutationFn = Apollo.MutationFunction<
  UpdateRejectedCompanyMutation,
  UpdateRejectedCompanyMutationVariables
>;

/**
 * __useUpdateRejectedCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateRejectedCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRejectedCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRejectedCompanyMutation, { data, loading, error }] = useUpdateRejectedCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRejectedCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRejectedCompanyMutation,
    UpdateRejectedCompanyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRejectedCompanyMutation, UpdateRejectedCompanyMutationVariables>(
    UpdateRejectedCompanyDocument,
    options,
  );
}
export type UpdateRejectedCompanyMutationHookResult = ReturnType<
  typeof useUpdateRejectedCompanyMutation
>;
export type UpdateRejectedCompanyMutationResult =
  Apollo.MutationResult<UpdateRejectedCompanyMutation>;
export type UpdateRejectedCompanyMutationOptions = Apollo.BaseMutationOptions<
  UpdateRejectedCompanyMutation,
  UpdateRejectedCompanyMutationVariables
>;
