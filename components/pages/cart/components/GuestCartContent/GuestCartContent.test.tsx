import React from 'react';

import { render, screen } from '@testing-library/react';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { mockUseCityData } from '__tests__/mocks/mockUseCityData';

import {
  mockUseCurrentUserRegisteredWithGuestOrdersData,
  mockUseCurrentWithoutGuestOrdersData,
} from '__tests__/mocks/mockCurrentUser';

import useRouter from 'hooks/useRouter';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';
import GuestCartContent from './GuestCartContent';

jest.mock('hooks/useRouter');
jest.mock('hooks/useCurrentUser');
jest.mock('lib/apollo/hooks/state/clientSideState');
describe('GuestCartContent', () => {
  const mockedUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;
  const mockedUseCity = useCity as jest.MockedFunction<typeof useCity>;
  mockedUseCity.mockImplementation(jest.fn(() => mockUseCityData));

  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseRouter = jest.fn(() => mockUseRouterData);
  mockedUseRouter.mockImplementation(mockUseRouter);
  test('should render empty page for not registered without order', () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentWithoutGuestOrdersData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(<GuestCartContent />)));
    const emptyMessage = screen.getByTestId('empty-list-message');

    // Assert
    expect(emptyMessage).toHaveTextContent('Вы еще ничего не положили в корзину');
  });

  test('should render guest order correctly', () => {
    // Arrange
    const mockUseCurrentUser = jest.fn(() => mockUseCurrentUserRegisteredWithGuestOrdersData);
    mockedUseCurrentUser.mockImplementation(mockUseCurrentUser);

    // Act
    render(renderWithTheme(renderWithApolloClient(<GuestCartContent />)));
    const guestOrder = screen.getByTestId('order-list-item');

    // Assert
    expect(guestOrder).toBeInTheDocument();
  });
});
