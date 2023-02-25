import rules from './rulesMap';
import { TRole } from './types';

/**
 * Checks if the role has access to the action
 *
 * @param {TRole} role User's role.
 * @param {string} action The action that the user wants to perform.
 * @returns {boolean}
 */
const checkAccess = (role: TRole, action: string): boolean => {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  return !!staticPermissions?.includes(action);
};

export default checkAccess;
