import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyLogoMutationVariables = Types.Exact<{
  input: Types.UpdateCompanyLogoInput;
}>;

export type UpdateCompanyLogoMutation = {
  __typename?: 'Mutation';
  updateCompanyLogo?: {
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

export const UpdateCompanyLogoDocument = gql`
  mutation UpdateCompanyLogo($input: UpdateCompanyLogoInput!) {
    updateCompanyLogo(input: $input) {
      ...CompanyInfo
    }
  }
  ${CompanyInfoFragmentDoc}
`;
export type UpdateCompanyLogoMutationFn = Apollo.MutationFunction<
  UpdateCompanyLogoMutation,
  UpdateCompanyLogoMutationVariables
>;

/**
 * __useUpdateCompanyLogoMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyLogoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyLogoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyLogoMutation, { data, loading, error }] = useUpdateCompanyLogoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyLogoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCompanyLogoMutation,
    UpdateCompanyLogoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCompanyLogoMutation, UpdateCompanyLogoMutationVariables>(
    UpdateCompanyLogoDocument,
    options,
  );
}
export type UpdateCompanyLogoMutationHookResult = ReturnType<typeof useUpdateCompanyLogoMutation>;
export type UpdateCompanyLogoMutationResult = Apollo.MutationResult<UpdateCompanyLogoMutation>;
export type UpdateCompanyLogoMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyLogoMutation,
  UpdateCompanyLogoMutationVariables
>;
