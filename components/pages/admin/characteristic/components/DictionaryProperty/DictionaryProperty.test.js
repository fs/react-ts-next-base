import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import { Formik } from 'formik';
import { mockDictionaryPropertyOptions } from '__tests__/mocks/mockDictionaryPropertyOptions';
import { useDictionaryPropertyOptions } from 'lib/apollo/hooks/state/dictionaryPropertyOptions';

import DictionaryProperty from './DictionaryProperty';

jest.mock('lib/apollo/hooks/state/dictionaryPropertyOptions');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('DictionaryProperty', () => {
  const mockPropertyId = 1;
  const mockUseDictionaryPropertyOptions = jest.fn(() => ({
    dictionaryPropertyOptions: mockDictionaryPropertyOptions,
  }));
  useDictionaryPropertyOptions.mockImplementation(mockUseDictionaryPropertyOptions);

  test('should render correctly', async () => {
    // Arrange
    const expectedLength = mockDictionaryPropertyOptions.length;
    render(
      renderWithTheme(
        renderWithApolloClient(
          <Formik>
            <DictionaryProperty propertyId={mockPropertyId} />
          </Formik>,
        ),
      ),
    );

    // Act
    const options = screen.getAllByTestId('existed-property-option');

    // Assert
    expect(options.length).toBe(expectedLength);
    await waitFor(() => {
      expect(mockUseDictionaryPropertyOptions).toHaveBeenCalledWith({ propertyId: mockPropertyId });
    });
  });
  test('should add new input on plus click', async () => {
    // Arrange
    const user = userEvent.setup();
    const initialFormikValue = {
      dictionaryPropertyOptions: [{ name: '' }],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <Formik initialValues={initialFormikValue}>
            <DictionaryProperty propertyId={mockPropertyId} />
          </Formik>,
        ),
      ),
    );
    const beforeInputs = screen.getAllByTestId('property-option-input');
    const addOptionButton = screen.getByTestId('add-option-button');

    await user.click(addOptionButton);

    const afterInputs = screen.getAllByTestId('property-option-input');

    // Assert
    expect(afterInputs.length).toBe(beforeInputs.length + 1);
  });

  test('should delete input on close icon click', async () => {
    const user = userEvent.setup();
    const initialFormikValue = {
      dictionaryPropertyOptions: [{ name: '' }],
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <Formik initialValues={initialFormikValue}>
            <DictionaryProperty propertyId={mockPropertyId} />
          </Formik>,
        ),
      ),
    );
    const beforeInputs = screen.getAllByTestId('property-option-input');
    const addOptionButton = screen.getByTestId('add-option-button');

    await user.click(addOptionButton);

    const removeOptionButton = screen.getAllByTestId('remove-option-button');

    await user.click(removeOptionButton[0]);

    const afterInputs = screen.getAllByTestId('property-option-input');

    // Assert
    expect(afterInputs.length).toBe(beforeInputs.length);
  });
});
