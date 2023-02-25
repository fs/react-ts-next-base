import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import { getVerificationDeadline } from './getVerificationDeadline';

describe('getVerificationDeadline', () => {
  test('should return right hours count', () => {
    // Arrange
    const today = new Date();
    const hoursDifference = 5;
    const inputString = addHours(addMinutes(today, 1), hoursDifference).toString();
    const expectedString = `Осталось ${hoursDifference} часов`;

    // Act
    const result = getVerificationDeadline(inputString);

    // Assert
    expect(result).toBe(expectedString);
  });

  test('should return 0 hours after deadline', () => {
    // Arrange
    const inputString = new Date().toString();
    const expectedString = 'Осталось 0 часов';

    // Act
    const result = getVerificationDeadline(inputString);

    // Assert
    expect(result).toBe(expectedString);
  });
});
