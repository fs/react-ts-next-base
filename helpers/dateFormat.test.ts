import { dateAndTimeFormat, dateFormat, timeFormat } from './dateFormat';

describe('dateFormat', () => {
  test('should return date in dd.mm.yyyy format', () => {
    // Arrange
    const inputString = '2000-12-30T12:07:35Z';
    const expectedString = '30.12.2000';

    // Act
    const resultString = dateFormat(inputString);

    // Assert
    expect(resultString).toBe(expectedString);
  });

  test('should return date in dd.mm.yyyy, hh:mm format', () => {
    // Arrange
    const inputString = '2021-12-27T12:07:35Z';
    const expectedString = '27.12.2021, 12:07';

    // Act
    const resultString = dateAndTimeFormat(inputString);

    // Assert
    expect(resultString).toBe(expectedString);
  });

  test('should return time in hh:mm format', () => {
    // Arrange
    const inputString = '2021-12-27T12:07:35Z';
    const expectedString = '12:07';

    // Act
    const resultString = timeFormat(inputString);

    // Assert
    expect(resultString).toBe(expectedString);
  });
});
