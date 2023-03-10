import { numberFormat } from './numberFormat';

describe('numberFormat', () => {
  test('should return number in 1 000 000 format', () => {
    // Arrange
    const inputNumber = 100000;
    const space = String.fromCharCode(160);
    const expectedString = `100${space}000`;

    // Act
    const resultString = numberFormat(inputNumber);

    // Assert
    expect(resultString).toBe(expectedString);
  });

  test('should return 0 for null value', () => {
    // Arrange
    const inputNumber = null;
    const expectedString = '0';

    // Act
    const resultString = numberFormat(inputNumber);

    // Assert
    expect(resultString).toBe(expectedString);
  });
});
