import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyLocationFragmentDoc } from '../../fragments/__generated__/companyLocationInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCompanyLocationsMutationVariables = Types.Exact<{
  input: Types.CreateCompanyLocationsInput;
}>;

export type CreateCompanyLocationsMutation = {
  __typename?: 'Mutation';
  createCompanyLocations?: Array<{
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
  }> | null;
};

export const CreateCompanyLocationsDocument = gql`
  mutation createCompanyLocations($input: CreateCompanyLocationsInput!) {
    createCompanyLocations(input: $input) {
      ...CompanyLocation
    }
  }
  ${CompanyLocationFragmentDoc}
`;
export type CreateCompanyLocationsMutationFn = Apollo.MutationFunction<
  CreateCompanyLocationsMutation,
  CreateCompanyLocationsMutationVariables
>;

/**
 * __useCreateCompanyLocationsMutation__
 *
 * To run a mutation, you first call `useCreateCompanyLocationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyLocationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyLocationsMutation, { data, loading, error }] = useCreateCompanyLocationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyLocationsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCompanyLocationsMutation,
    CreateCompanyLocationsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCompanyLocationsMutation,
    CreateCompanyLocationsMutationVariables
  >(CreateCompanyLocationsDocument, options);
}
export type CreateCompanyLocationsMutationHookResult = ReturnType<
  typeof useCreateCompanyLocationsMutation
>;
export type CreateCompanyLocationsMutationResult =
  Apollo.MutationResult<CreateCompanyLocationsMutation>;
export type CreateCompanyLocationsMutationOptions = Apollo.BaseMutationOptions<
  CreateCompanyLocationsMutation,
  CreateCompanyLocationsMutationVariables
>;
