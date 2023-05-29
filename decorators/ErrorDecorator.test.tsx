import { GraphQLError } from 'graphql';
import { ApolloError } from '@apollo/client';

import ErrorDecorator from './ErrorDecorator';

describe('Error Decorator', () => {
  const errorMessage = 'Invalid email';
  const graphqlError: GraphQLError = {
    message: errorMessage,
    path: ['signup'],
    locations: [{ line: 2, column: 3 }],
    nodes: [],
    source: undefined,
    positions: undefined,
    originalError: undefined,
    extensions: {},
    toJSON: () => ({
      message: errorMessage,
    }),
    name: '',
    [Symbol.toStringTag]: '',
  };

  describe('parse method', () => {
    test('should parse Apollo Error', () => {
      // Arrange
      const mockApolloError = new ApolloError({
        graphQLErrors: [graphqlError],
      });

      const expectedError = new Error(errorMessage);

      // Act
      const actualError = new ErrorDecorator(mockApolloError);

      // Assert
      expect(actualError.errors[0].message).toEqual(expectedError.message);
    });

    test('should not change if JS Error object', () => {
      // Arrange
      const mockJsError = new Error(errorMessage);
      const expectedError = mockJsError;

      // Act
      const actualError = new ErrorDecorator(mockJsError);

      // Assert
      expect(actualError.errors[0]).toEqual(expectedError);
    });

    test('should create Error object', () => {
      // Arrange
      const expectedError = new Error(errorMessage);

      // Act
      const actualError = new ErrorDecorator(errorMessage);

      // Assert
      expect(actualError.errors[0].message).toEqual(expectedError.message);
    });

    test('should return Something went wrong message', () => {
      // Arrange
      const mockErrorObject = { someKey: 'Wrong file path' };
      const expectedError = new Error('Something went wrong');

      // Act
      const actualError = new ErrorDecorator(mockErrorObject);

      // Assert
      expect(actualError.errors[0].message).toEqual(expectedError.message);
    });
  });

  describe('getMessages method', () => {
    test('should return messages array for one error', () => {
      // Arrange
      const error = new ErrorDecorator('Error message');
      const expectedMessages = ['Error message'];

      // Act
      const actualMessages = error.getMessages();

      // Assert
      expect(actualMessages).toEqual(expectedMessages);
    });

    test('should return messages array for a few errors', () => {
      // Arrange
      const otherErrorMessage = 'Your password invalid or expired';

      const mockApolloErrors = new ApolloError({
        graphQLErrors: [
          {
            ...graphqlError,
            message: errorMessage,
            toJSON: () => ({
              message: errorMessage,
            }),
            [Symbol.toStringTag]: '',
          },
          {
            ...graphqlError,
            message: otherErrorMessage,
            toJSON: () => ({
              message: otherErrorMessage,
            }),
            [Symbol.toStringTag]: '',
          },
        ],
      });

      const error = new ErrorDecorator(mockApolloErrors);
      const expectedMessages = [errorMessage, otherErrorMessage];

      // Act
      const actualMessages = error.getMessages();

      // Assert
      actualMessages.forEach(([errorText], index) => {
        expect(errorText).toEqual(expectedMessages[index]);
      });
    });
  });
});
