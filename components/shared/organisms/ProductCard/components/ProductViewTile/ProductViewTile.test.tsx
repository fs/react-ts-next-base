import React, { ReactNode } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';

import {
  PRODUCT,
  DASHBOARD_COMPANY_PRODUCT,
  DASHBOARD_COMPANY_CREATE_PRODUCT,
} from 'config/routes';
import useRouter from 'hooks/useRouter';

import renderWithTheme from '__tests__/helpers/renderWithTheme';
import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';

import { mockProduct } from '__tests__/mocks/mockProducts';
import { mockUseRouterData } from '__tests__/mocks/mockUseRouterData';

import ProductViewTile from './ProductViewTile';

const cases = [
  {
    variant: 'company',
    template: false,
    expected: DASHBOARD_COMPANY_PRODUCT,
  },
  {
    variant: 'company',
    template: true,
    expected: DASHBOARD_COMPANY_CREATE_PRODUCT,
  },
  {
    variant: 'catalog',
    template: true,
    expected: PRODUCT,
  },
  {
    variant: 'catalog',
    template: false,
    expected: PRODUCT,
  },
] as const;

type TLinkProps = {
  children: ReactNode;
  href: { pathname: string };
};

jest.mock('hooks/useRouter');
jest.mock('next/link', () => ({ children, href }: TLinkProps) => (
  <a href={href.pathname}>{children}</a>
));
describe('ProductViewTile', () => {
  const mockRefetchProduct = jest.fn();
  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockPushRoute = jest.fn();
  const mockUseRouter = jest.fn(() => ({
    ...mockUseRouterData,
    pushRoute: mockPushRoute,
  }));
  mockedUseRouter.mockImplementation(mockUseRouter);

  test.each(cases)(
    'should have $expected url if variant is $variant and template is $template',
    async ({ variant, template, expected }) => {
      // Arrange
      const preparedMockProduct = {
        ...mockProduct,
        template,
      };
      // Act
      render(
        renderWithApolloClient(
          renderWithTheme(
            <ProductViewTile
              product={preparedMockProduct}
              isUserBuyer={false}
              price="30"
              variant={variant}
              refetchProducts={mockRefetchProduct}
              isFavoriteModalShown={false}
            />,
          ),
        ),
      );
      const productName = screen.getByTestId('product-name');
      const productLink = within(productName).getByRole('link');

      // Assert
      await waitFor(() => {
        expect(productLink).toHaveAttribute('href', expected);
      });
    },
  );
});
