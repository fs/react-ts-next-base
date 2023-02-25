import { SystemRoleEnum } from 'graphql/types';
import checkAccess from 'rbac/checkAccess';
import { TRole } from './types';

/**
 * Checks if the user role has access to the action
 */
const userHasAccess = (role: TRole, action: string) => {
  if (!role || !action) return true;

  return checkAccess(role || SystemRoleEnum.Guest, action);
};

export default userHasAccess;
