import { SystemRoleEnum } from 'graphql/types';
import { TApolloClient } from 'lib/apollo/types';

export enum CompanyUserRoleEnum {
  owner = 'owner',
  employee = 'employee',
}

export type TRole = `${CompanyUserRoleEnum}` | `${SystemRoleEnum}` | 'UNAUTHORIZED';

export type TCheckCanVisitPage = {
  pathname: string;
  apolloClient: TApolloClient;
};
