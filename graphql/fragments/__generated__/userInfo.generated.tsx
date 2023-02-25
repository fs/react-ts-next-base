import * as Types from '../../types';

import { gql } from '@apollo/client';
export type UserInfoFragment = {
  __typename?: 'User';
  id: string;
  avatarUrl?: string | null;
  blockedAt?: any | null;
  createdAt: any;
  email: string;
  firstName?: string | null;
  fullName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  systemRole?: Types.SystemRoleEnum | null;
  companyMembers: Array<{
    __typename?: 'CompanyMember';
    id: string;
    user: { __typename?: 'User'; id: string };
    role: { __typename?: 'CompanyRole'; id: string; name: string };
    company: { __typename?: 'Company'; id: string; unofficialName: string; officialName: string };
  }>;
  role?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
};

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    avatarUrl
    blockedAt
    companyMembers {
      id
      user {
        id
      }
      role {
        id
        name
      }
      company {
        id
        unofficialName
        officialName
      }
    }
    createdAt
    email
    firstName
    fullName
    lastName
    middleName
    phoneNumber
    role {
      id
      name
    }
    systemRole
  }
`;
