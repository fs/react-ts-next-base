export const mockUseNotifierData = {
  setSuccess: jest.fn(),
  setError: jest.fn(),
  clearMessage: jest.fn(),
  message: 'notifier message',
  setInfo: jest.fn(),
  type: 'error' as const,
};
