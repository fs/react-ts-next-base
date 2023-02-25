import React from 'react';
import useRouter from 'hooks/useRouter';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { mockCategories } from '__tests__/mocks/mockCategories';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCategories } from 'lib/apollo/hooks/state/categories';
import { useProductSummary } from 'lib/apollo/hooks/state/productsSummary';

import Filters from './Filters';

jest.mock('lib/apollo/hooks/state/productsSummary');
jest.mock('lib/apollo/hooks/state/categories');
jest.mock('hooks/useCurrentUser');
jest.mock('hooks/useRouter');

const mainCompanyId = '99';
const emptyFn = () => {};
const price = '50';
const query = { category: 'ALL' };
const categories = { categories: mockCategories };
const mockPushRoute = jest.fn();

beforeEach(() => {
  const mockUseRouter = jest.fn(() => ({
    pushRoute: mockPushRoute,
  }));
  useRouter.mockImplementation(mockUseRouter);

  const mockUseProductSummary = jest.fn(() => ({
    loading: undefined,
    pageInfo: { endCursor: 'FF', hasNextPage: true },
    totalCount: 5,
  }));

  useProductSummary.mockImplementation(mockUseProductSummary);

  useCurrentUser.mockImplementation(jest.fn(() => ({ mainCompanyId })));

  useCategories.mockImplementation(jest.fn(() => categories));
});

afterEach(() => {
  jest.resetAllMocks();
});

const initialParams = { textProperties: [], dictionaryProperties: [], integerProperties: [] };

describe('Filters', () => {
  test('correct fetch minPrice with category USED', async () => {
    const usedQuery = { category: 'USED' };
    render(
      renderWithTheme(
        renderWithApolloClient(<Filters query={usedQuery} setSpecialFiltersQuery={emptyFn} />),
      ),
    );
    const usedParams = { ...initialParams, condition: 'USED' };
    await waitFor(() => expect(useProductSummary).lastCalledWith(usedParams));
    const fieldName = 'minPrice';

    expect(screen.getByTestId(fieldName)).toHaveValue('');

    fireEvent.change(screen.getByTestId(fieldName), { target: { value: price } });

    await waitFor(() => {
      expect(screen.getByTestId(fieldName)).toHaveValue(price);
      expect(useProductSummary).lastCalledWith({ ...usedParams, [fieldName]: Number(price) });
    });

    fireEvent.click(screen.getByRole('button', { name: /Показать/i }));

    expect(mockPushRoute).lastCalledWith({
      query: {
        ...usedQuery,
        [fieldName]: Number(price),
      },
    });

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).toHaveValue('');
    expect(mockPushRoute).lastCalledWith({ query: { ...usedQuery } });
  });

  test('correct fetch minPrice with category SALE', async () => {
    const saleQuery = { category: 'SALE' };

    render(
      renderWithTheme(
        renderWithApolloClient(<Filters query={saleQuery} setSpecialFiltersQuery={emptyFn} />),
      ),
    );

    const saleParams = { ...initialParams, discounted: true };
    await waitFor(() => expect(useProductSummary).lastCalledWith(saleParams));
    const fieldName = 'minPrice';

    expect(screen.getByTestId(fieldName)).toHaveValue('');

    fireEvent.change(screen.getByTestId(fieldName), { target: { value: price } });

    await waitFor(() => {
      expect(screen.getByTestId(fieldName)).toHaveValue(price);
      expect(useProductSummary).lastCalledWith({ ...saleParams, [fieldName]: Number(price) });
    });

    fireEvent.click(screen.getByRole('button', { name: /Показать/i }));

    expect(mockPushRoute).lastCalledWith({
      query: {
        ...saleQuery,
        [fieldName]: Number(price),
      },
    });

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).toHaveValue('');
    expect(mockPushRoute).lastCalledWith({ query: { ...saleQuery } });
  });

  test('correct fetch filter minPrice with searchQuery', async () => {
    const queryWithSearch = { ...query, searchQuery: 'search value' };
    render(
      renderWithTheme(
        renderWithApolloClient(
          <Filters query={queryWithSearch} setSpecialFiltersQuery={emptyFn} />,
        ),
      ),
    );

    const fieldName = 'minPrice';

    expect(screen.getByTestId(fieldName)).toHaveValue('');

    fireEvent.change(screen.getByTestId(fieldName), { target: { value: price } });

    await waitFor(() => {
      expect(screen.getByTestId(fieldName)).toHaveValue(price);
      expect(useProductSummary).lastCalledWith({
        ...initialParams,
        searchQuery: 'search value',
        [fieldName]: Number(price),
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /Показать/i }));

    expect(mockPushRoute).lastCalledWith({
      query: {
        ...queryWithSearch,
        [fieldName]: Number(price),
      },
    });

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).toHaveValue('');
    expect(mockPushRoute).lastCalledWith({ query: queryWithSearch });
  });

  test('correct fetch filter minPrice', async () => {
    render(
      renderWithTheme(
        renderWithApolloClient(<Filters query={query} setSpecialFiltersQuery={emptyFn} />),
      ),
    );
    await waitFor(() => expect(useProductSummary).lastCalledWith(initialParams));
    const fieldName = 'minPrice';

    expect(screen.getByTestId(fieldName)).toHaveValue('');

    fireEvent.change(screen.getByTestId(fieldName), { target: { value: price } });

    await waitFor(() => {
      expect(screen.getByTestId(fieldName)).toHaveValue(price);
      expect(useProductSummary).lastCalledWith({ ...initialParams, [fieldName]: Number(price) });
    });

    fireEvent.click(screen.getByRole('button', { name: /Показать/i }));

    await waitFor(() =>
      expect(mockPushRoute).lastCalledWith({
        query: {
          ...query,
          [fieldName]: Number(price),
        },
      }),
    );

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).toHaveValue('');
    expect(mockPushRoute).lastCalledWith({ query: { ...query } });
  });

  test('correct fetch filter maxPrice', async () => {
    render(
      renderWithTheme(
        renderWithApolloClient(<Filters query={query} setSpecialFiltersQuery={emptyFn} />),
      ),
    );

    await waitFor(() => expect(useProductSummary).lastCalledWith(initialParams));

    const fieldName = 'maxPrice';

    expect(screen.getByTestId(fieldName)).toHaveValue('');

    fireEvent.change(screen.getByTestId(fieldName), { target: { value: price } });

    expect(await screen.findByTestId(fieldName)).toHaveValue(price);

    await waitFor(() =>
      expect(useProductSummary).lastCalledWith({ ...initialParams, [fieldName]: Number(price) }),
    );

    fireEvent.click(screen.getByRole('button', { name: /Показать/i }));

    await waitFor(() =>
      expect(mockPushRoute).lastCalledWith({
        query: {
          ...query,
          [fieldName]: Number(price),
        },
      }),
    );

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).toHaveValue('');
    expect(mockPushRoute).lastCalledWith({ query: { ...query } });
  });

  test('correct fetch filter newest', async () => {
    render(
      renderWithTheme(
        renderWithApolloClient(<Filters query={query} setSpecialFiltersQuery={emptyFn} />),
      ),
    );

    await waitFor(() => expect(useProductSummary).lastCalledWith(initialParams));

    const fieldName = 'newest';

    expect(screen.getByTestId(fieldName)).not.toBeChecked();

    fireEvent.click(screen.getByTestId(fieldName));

    expect(await screen.findByTestId(fieldName)).toBeChecked();

    await waitFor(() =>
      expect(useProductSummary).lastCalledWith({ ...initialParams, [fieldName]: true }),
    );

    fireEvent.click(await screen.findByRole('button', { name: /Показать/i }));

    expect(mockPushRoute).lastCalledWith({
      query: { ...query, [fieldName]: true },
    });

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).not.toBeChecked();
    expect(mockPushRoute).lastCalledWith({ query: { ...query } });
  });

  test('correct fetch filter freeDelivery', async () => {
    render(
      renderWithTheme(
        renderWithApolloClient(<Filters query={query} setSpecialFiltersQuery={emptyFn} />),
      ),
    );

    await waitFor(() => expect(useProductSummary).lastCalledWith(initialParams));

    const fieldName = 'freeDelivery';

    expect(screen.getByTestId(fieldName)).not.toBeChecked();

    fireEvent.click(screen.getByTestId(fieldName));

    expect(await screen.findByTestId(fieldName)).toBeChecked();
    expect(useProductSummary).lastCalledWith({
      ...initialParams,
      freeDeliveryCompanyId: mainCompanyId,
    });

    fireEvent.click(screen.getByRole('button', { name: /Показать/i }));

    expect(mockPushRoute).lastCalledWith({
      query: {
        ...query,
        freeDeliveryCompanyId: mainCompanyId,
      },
    });

    const resetButton = screen.getByRole('button', {
      name: /сбросить все фильтры/i,
    });
    fireEvent.click(resetButton);

    expect(await screen.findByTestId(fieldName)).not.toBeChecked();
    expect(mockPushRoute).lastCalledWith({ query: { ...query } });
  });
});
