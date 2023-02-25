export const mockAuthorizationResultReject = {
  __typename: 'AuthorizationResult' as const,
  message: 'У вас нет прав для выполнения этого действия',
  reasons: {
    details: '{}',
    fullMessages: [],
  },
  value: false,
};

export const mockAuthorizationResultSuccess = {
  __typename: 'AuthorizationResult' as const,
  message: null,
  reasons: {
    details: '{}',
    fullMessages: [],
  },
  value: true,
};
