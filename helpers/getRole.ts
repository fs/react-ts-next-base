import { CompanyUserRoleEnum } from 'rbac/types';
import { SystemRoleEnum } from 'graphql/types';

const getRole = (userRole?: string) => {
  return (
    Object.values({ ...CompanyUserRoleEnum, ...SystemRoleEnum }).find(el => el === userRole) ||
    'UNAUTHORIZED'
  );
};

export default getRole;
