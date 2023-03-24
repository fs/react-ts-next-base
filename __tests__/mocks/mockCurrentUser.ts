export const mockCurrentUser = {
  __typename: 'CurrentUser' as const,
  avatarUrl: '',
  id: '160',
  email: 'test.test@test.com',
  firstName: 'Test',
  lastName: 'Test',
};

export const mockCurrentUserData = {
  user: mockCurrentUser,
  loading: false,
  error: undefined,
  refetch: jest.fn(),
  networkStatus: 2,
};

export default mockCurrentUser;
