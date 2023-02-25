import { phoneFormatter } from './phoneFormatter';

describe('phoneFormatter', () => {
  test('should return form in +7 (***) ** ** format', () => {
    // Arrange
    const inputString = '9822765562';
    const expectedString = '+7 (982) 276 55 62';

    // Act
    const resultString = phoneFormatter(inputString);

    // Assert
    expect(resultString).toBe(expectedString);
  });
});
