import { ApolloError, GraphQLErrors } from '@apollo/client/errors';

import { TGraphQLError } from './types';

const getDetails = (error: TGraphQLError) => {
  const { message, extensions } = error;

  const details = extensions?.detail ? Object.values(extensions?.detail).join('\n') : '';

  return [message, details];
};

const getMessage = (errors: GraphQLErrors | Error[]) => {
  return errors.map(error => {
    if ('extensions' in error) {
      return getDetails(error);
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unknown error';
  });
};

const getStatus = (error: TGraphQLError | Error) => {
  if ('extensions' in error) {
    return error?.extensions?.status ?? null;
  }
  return null;
};

export default class ErrorDecorator extends Error {
  errors: GraphQLErrors | Error[] = [];

  constructor(error: unknown) {
    const errors = ErrorDecorator.parse(error);
    super(typeof error === 'string' ? error : undefined);
    this.errors = errors;
  }

  getMessages() {
    return getMessage(this.errors);
  }

  hasStatus(status: string) {
    return this.errors.some(error => getStatus(error) === status);
  }

  static parse(error: unknown) {
    if (error instanceof ApolloError) {
      return error.graphQLErrors;
    }
    if (error instanceof Error && 'message' in error) {
      return [error];
    }
    if (error && typeof error === 'string') {
      return [new Error(error)];
    }
    return [new Error('Something went wrong')];
  }
}
