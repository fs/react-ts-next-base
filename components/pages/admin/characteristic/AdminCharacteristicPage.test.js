import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { useProperties } from 'lib/apollo/hooks/state/properties';
import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { mockUseCityData } from '__tests__/mocks/mockUseCityData';
import { mockProperties } from '__tests__/mocks/mockProperties';
import { mockDictionaryPropertyOptions } from '__tests__/mocks/mockDictionaryPropertyOptions';

import { AdminCharacteristicPage } from './AdminCharacteristicPage';

jest.mock('lib/apollo/hooks/state/properties');
jest.mock('lib/apollo/hooks/state/dictionaryPropertyOptions');
jest.mock('lib/apollo/hooks/state/clientSideState');

describe('AdminCharacteristicPage', () => {
  const mockQuery = { propertyId: 1 };

  useCity.mockImplementation(jest.fn(() => mockUseCityData));

  test('should return error page for non existing property', () => {
    // Arrange
    const mockUseProperties = jest.fn(() => ({
      properties: [],
      loading: undefined,
    }));
    useProperties.mockImplementation(mockUseProperties);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminCharacteristicPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const errorPage = screen.getByTestId('error-page-text');

    // Assert
    expect(errorPage).toBeInTheDocument();
  });

  test('should call useProperties', () => {
    // Arrange
    const mockUseProperties = jest.fn(() => ({
      properties: mockProperties,
      loading: undefined,
    }));
    useProperties.mockImplementation(mockUseProperties);

    const mockUseDictionaryPropertyOptions = jest.fn(() => ({
      dictionaryPropertyOptions: mockDictionaryPropertyOptions,
    }));
    useDictionaryPropertyOptions.mockImplementation(mockUseDictionaryPropertyOptions);

    const expectedVariables = {
      propertiesIds: [mockQuery.propertyId],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminCharacteristicPage {...pageProps} query={mockQuery} />
        )),
      ),
    );

    // Assert
    expect(mockUseProperties).toHaveBeenCalledWith(expectedVariables);
  });

  test('should show loader on loading', () => {
    // Arrange
    const mockUseProperties = jest.fn(() => ({
      properties: [],
      loading: true,
    }));
    useProperties.mockImplementation(mockUseProperties);

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(pageProps => (
          <AdminCharacteristicPage {...pageProps} query={mockQuery} />
        )),
      ),
    );
    const loader = screen.getByTestId('admin-characteristic-page-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
