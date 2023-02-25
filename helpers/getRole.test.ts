import { CompanyUserRoleEnum } from '../rbac/types';
import getRole from './getRole';

describe('getRole', () => {
  test('should return user role', () => {
    // Arrange
    const inputRole = CompanyUserRoleEnum.owner;
    const expectedRole = inputRole;

    // Act
    const resultRole = getRole(inputRole);

    // Assert
    expect(resultRole).toBe(expectedRole);
  });

  test('should return UNAUTHORIZED role', () => {
    // Arrange
    const inputRole = 'non-existent-role';
    const expectedRole = 'UNAUTHORIZED';

    // Act
    const resultRole = getRole(inputRole);

    // Assert
    expect(resultRole).toBe(expectedRole);
  });
});
