import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useFileDownload from 'hooks/useFileDownload';

import { mockOrder, mockOrders } from '__tests__/mocks/mockOrders';

import { actionType } from 'hooks/types';
import DocumentItem from './DocumentItem';

jest.mock('hooks/useFileDownload');

describe('DocumentItem', () => {
  const mockFetchDocument = jest.fn(() => mockOrder);
  const mockUseFileDownload = jest.fn(() => [mockFetchDocument]);
  useFileDownload.mockImplementation(mockUseFileDownload);

  const { url } = mockOrders[0].invoices[0];
  test('should have right title', async () => {
    // Arrange
    const expectedText = 'Электронный договор';

    // Act
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DocumentItem context={{}} url={url} fileName="Имя_файла.pdf" title={expectedText} />,
        ),
      ),
    );
    const documentTitle = await screen.findByTestId('document-item-title');

    // Assert
    expect(documentTitle).toHaveTextContent(expectedText);
  });

  test('should call fetchDocument on download', async () => {
    // Arrange
    const expectedType = actionType.DOWNLOAD;

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DocumentItem context={{}} url={url} fileName="Имя_файла.pdf" title="title" />,
        ),
      ),
    );

    const downloadButton = await screen.findByTestId('download-document-button');
    await user.click(downloadButton);

    // Assert
    await waitFor(() => {
      expect(mockFetchDocument).toHaveBeenCalledWith(expectedType);
    });
  });

  test('should call fetchDocument on open', async () => {
    // Arrange
    const expectedType = actionType.OPEN;

    // Act
    const user = userEvent.setup();
    render(
      renderWithTheme(
        renderWithApolloClient(
          <DocumentItem context={{}} url={url} fileName="Имя_файла.pdf" title="title" />,
        ),
      ),
    );

    const downloadButton = await screen.findByTestId('open-document-button');
    await user.click(downloadButton);

    // Assert
    await waitFor(() => {
      expect(mockFetchDocument).toHaveBeenCalledWith(expectedType);
    });
  });
});
