import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useCurrentUser from 'hooks/useCurrentUser';

import { mockCurrentUserData } from '__tests__/mocks/mockCurrentUser';

import { TPageProps } from 'lib/apollo/types';
import { HomePage } from './HomePage';

jest.mock('hooks/useCurrentUser');

const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;

describe('HomePage', () => {
  const mockUseCurrentUser = jest.fn(() => mockCurrentUserData);
  mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

  test('should render correctly', async () => {
    // Arrange
    render(
      renderWithTheme(
        renderWithApolloClient((pageProps: TPageProps) => <HomePage {...pageProps} />),
      ),
    );

    // Act
    const pageContent = screen.getByTestId('page-content');

    // Assert
    expect(pageContent).toBeInTheDocument();
    expect(mockUseCurrentUser).toHaveBeenCalled();
  });
});
