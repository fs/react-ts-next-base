import { GraphQLError } from 'graphql';

export class TGraphQLError extends GraphQLError {
  extensions: {
    status?: string;
    detail?: object;
  };

  constructor() {
    super('');
    this.extensions = {};
  }
}
