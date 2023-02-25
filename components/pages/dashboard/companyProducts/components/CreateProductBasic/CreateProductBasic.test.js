import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithNiceModal from '__tests__/helpers/renderWithNiceModal';

import { useCreateProductDraft, useSubmitProductBasicStep } from 'lib/apollo/hooks/actions/product';
import { useCategories } from 'lib/apollo/hooks/state/categories';
import { useCountries } from 'lib/apollo/hooks/state/countries';
import useNotifier from 'hooks/useNotifier';

import { mockProductDraft, mockProductBasic } from '__tests__/mocks/mockProduct';
import { mockCategories } from '__tests__/mocks/mockCategories';
import { mockCountries } from '__tests__/mocks/mockCountries';

import CreateProductBasic from '.';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('lib/apollo/hooks/state/categories');
jest.mock('lib/apollo/hooks/state/countries');
jest.mock('hooks/useNotifier');

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('CreateProductBasic', () => {
  const {
    id: productId,
    name,
    description,
    condition,
    category,
    country,
    manufacturer,
  } = mockProductBasic;

  const mockOnSubmitStep = jest.fn();

  const mockSubmitProductBasicStep = jest.fn(() => mockProductBasic);
  const mockUseSubmitProductBasicStep = jest.fn(() => [mockSubmitProductBasicStep]);
  useSubmitProductBasicStep.mockImplementation(mockUseSubmitProductBasicStep);

  const mockCreateProductDraft = jest.fn();
  const mockUseCreateProductDraft = jest.fn(() => [mockCreateProductDraft]);
  useCreateProductDraft.mockImplementation(mockUseCreateProductDraft);

  const mockUseCategories = jest.fn(() => ({ categories: mockCategories, loading: undefined }));
  useCategories.mockImplementation(mockUseCategories);
  const mockUseCountries = jest.fn(() => ({ countries: mockCountries }));
  useCountries.mockImplementation(mockUseCountries);

  const mockSetSuccess = jest.fn();
  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess: mockSetSuccess,
      setError: mockSetError,
    })),
  );

  test('should call useSubmitProductBasicStep on submit', async () => {
    // Arrange
    const mockQuery = { companyId: '1' };
    const expectedValues = {
      productId,
      name,
      description,
      condition,
      categoryId: category.id,
      countryId: country.id,
      manufacturer,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          renderWithNiceModal(
            <CreateProductBasic
              product={mockProductDraft}
              onSubmitStep={mockOnSubmitStep}
              query={mockQuery}
            />,
          ),
        ),
      ),
    );

    const conditionField = screen.getByTestId('condition_USED');
    const nameField = screen.getByTestId('name');
    const manufacturerField = screen.getByTestId('manufacturer');
    const descriptionField = screen.getByTestId('description');
    const submitButton = screen.getByTestId('create-product-basic-submit-button');

    await selectEvent.select(screen.getAllByText('Категория товара')[1], category.name);
    fireEvent.click(conditionField);
    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.change(manufacturerField, { target: { value: manufacturer } });
    fireEvent.change(descriptionField, { target: { value: description } });

    fireEvent.click(submitButton);

    const confirmModalButton = await screen.findByTestId('confirm-modal-button');
    fireEvent.click(confirmModalButton);
    // Assert
    expect(mockUseCategories).toHaveBeenCalled();
    expect(mockUseCountries).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockSubmitProductBasicStep).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call useCreateProductDraft on submit create draft', async () => {
    // Arrange
    const mockQuery = { companyId: '1' };
    const expectedValues = {
      companyId: mockQuery.companyId,
      name,
      description,
      condition,
      categoryId: category.id,
      countryId: country.id,
      manufacturer,
    };

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <CreateProductBasic
            product={mockProductDraft}
            onSubmitStep={mockOnSubmitStep}
            query={mockQuery}
            isDraft={false}
          />,
        ),
      ),
    );

    const conditionField = screen.getByTestId('condition_USED');
    const nameField = screen.getByTestId('name');
    const manufacturerField = screen.getByTestId('manufacturer');
    const descriptionField = screen.getByTestId('description');
    const submitButton = screen.getByTestId('create-product-basic-submit-button');

    await selectEvent.select(screen.getAllByText('Категория товара')[1], category.name);
    fireEvent.click(conditionField);
    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.change(manufacturerField, { target: { value: manufacturer } });
    fireEvent.change(descriptionField, { target: { value: description } });

    fireEvent.click(submitButton);

    // Assert
    expect(mockUseCategories).toHaveBeenCalled();
    expect(mockUseCountries).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockCreateProductDraft).toHaveBeenCalledWith(expectedValues);
    });
  });
});
