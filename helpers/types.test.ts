import { filterAvailableNodes, findAvailableValue, findAvailableValues } from './types';

describe('types', () => {
  const target = ['apple', 'pen', 'orange'];
  describe('findAvailableValue', () => {
    test('should return value if it exist ', () => {
      // Arrange
      const inputValue = target[0];
      const expectedResult = inputValue;
      // Act
      const result = findAvailableValue(inputValue, target);

      // Assert
      expect(result).toBe(expectedResult);
    });
    test('should return null if value is not exist ', () => {
      // Arrange
      const inputValue = 'test';
      // Act
      const result = findAvailableValue(inputValue, target);

      // Assert
      expect(result).toBe(null);
    });
    test('should return null if value is array ', () => {
      // Arrange
      const inputValue = ['test'];
      // Act
      const result = findAvailableValue(inputValue, target);

      // Assert
      expect(result).toBe(null);
    });
  });

  describe('findAvailableValues', () => {
    test('should return array for values in target', () => {
      // Arrange
      const inputValue = `${target[0]},${target[2]},test`;
      const expectedResult = [target[0], target[2]];

      // Act
      const result = findAvailableValues(inputValue, target);

      // Assert
      expect(result).toStrictEqual(expectedResult);
    });

    test('should return null for array', () => {
      // Arrange
      const inputValue = ['test'];

      // Act
      const result = findAvailableValues(inputValue, target);

      // Assert
      expect(result).toStrictEqual(null);
    });
  });
  describe('filterAvailableNodes', () => {
    test('should return only true nodes', () => {
      // Arrange
      const inputValue = ['test', null, undefined, 'test2'];

      // Act
      const result = filterAvailableNodes(inputValue);

      // Assert
      expect(result).not.toContain(null);
      expect(result).not.toContain(undefined);
    });
  });
});
