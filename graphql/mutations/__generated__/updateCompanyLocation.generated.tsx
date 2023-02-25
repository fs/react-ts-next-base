import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyLocationFragmentDoc } from '../../fragments/__generated__/companyLocationInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyLocationMutationVariables = Types.Exact<{
  input: Types.UpdateCompanyLocationInput;
}>;

export type UpdateCompanyLocationMutation = {
  __typename?: 'Mutation';
  updateCompanyLocation?: {
    __typename?: 'CompanyLocation';
    status: Types.CompanyLocationStatusEnum;
    address?: string | null;
    comment?: string | null;
    id: string;
    canBeDestroyed: boolean;
    canBeUpdated: boolean;
    main: boolean;
    phoneNumber?: string | null;
    postcode?: string | null;
    rejectionReason?: string | null;
    verificationDeadlineAt?: any | null;
    city: {
      __typename?: 'City';
      cityType: string;
      fiasId: string;
      id: string;
      kladrId: string;
      name: string;
      region: string;
    };
    companyLicenses: Array<{
      __typename?: 'CompanyLocationLicense';
      id: string;
      number: string;
      companyLicensePhotos?: Array<{
        __typename?: 'CompanyLicensePhoto';
        id: string;
        imageUrl: string;
      }> | null;
    }>;
    company: {
      __typename?: 'Company';
      id: string;
      officialName: string;
      unofficialName: string;
      legalForm: { __typename?: 'CompanyLegalForm'; id: string; name: string; shortName: string };
    };
  } | null;
};

export const UpdateCompanyLocationDocument = gql`
  mutation updateCompanyLocation($input: UpdateCompanyLocationInput!) {
    updateCompanyLocation(input: $input) {
      ...CompanyLocation
    }
  }
  ${CompanyLocationFragmentDoc}
`;
export type UpdateCompanyLocationMutationFn = Apollo.MutationFunction<
  UpdateCompanyLocationMutation,
  UpdateCompanyLocationMutationVariables
>;

/**
 * __useUpdateCompanyLocationMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyLocationMutation, { data, loading, error }] = useUpdateCompanyLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCompanyLocationMutation,
    UpdateCompanyLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCompanyLocationMutation, UpdateCompanyLocationMutationVariables>(
    UpdateCompanyLocationDocument,
    options,
  );
}
export type UpdateCompanyLocationMutationHookResult = ReturnType<
  typeof useUpdateCompanyLocationMutation
>;
export type UpdateCompanyLocationMutationResult =
  Apollo.MutationResult<UpdateCompanyLocationMutation>;
export type UpdateCompanyLocationMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyLocationMutation,
  UpdateCompanyLocationMutationVariables
>;
