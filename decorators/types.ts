import { GraphQLError } from 'graphql';

export class TGraphQLError extends GraphQLError {
  extensions: {
    extra?: {
      remainingQuantity: number;
    };
    status?: string;
    detail?: object;
  };

  constructor() {
    super('');
    this.extensions = {};
  }
}
