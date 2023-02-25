import { sortByAlphabet } from './sortByAlphabet';

describe('sortByAlphabet', () => {
  test('should sort array by alphabet', () => {
    // Arrange
    const inputArray = ['b', 'c', 'a'];
    const expectedArray = ['a', 'b', 'c'];

    // Act
    const result = sortByAlphabet(inputArray);

    // Assert
    expect(result).toStrictEqual(expectedArray);
  });
});
