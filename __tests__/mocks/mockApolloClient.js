const mockApolloClient = jest.genMockFromModule('@apollo/client');
mockApolloClient.mutate = jest.fn();
mockApolloClient.query = jest.fn();
mockApolloClient.writeData = jest.fn();

export default mockApolloClient;
