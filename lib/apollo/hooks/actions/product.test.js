import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { CreateProductDraftDocument } from 'graphql/mutations/__generated__/createProductDraft.generated';
import { DestroyProductDocument } from 'graphql/mutations/__generated__/destroyProduct.generated';
import { RenewProductDocument } from 'graphql/mutations/__generated__/renewProduct.generated';
import { DestroyCustomerProductDocument } from 'graphql/mutations/__generated__/destroyCustomerProduct.generated';
import { RestoreCustomerProductDocument } from 'graphql/mutations/__generated__/restoreCustomerProduct.generated';
import { SubmitProductBasicStepDocument } from 'graphql/mutations/__generated__/submitProductBasicStep.generated';
import { SubmitProductPropertiesStepDocument } from 'graphql/mutations/__generated__/submitProductPropertiesStep.generated';
import { SubmitProductAddressStepDocument } from 'graphql/mutations/__generated__/submitProductAddressStep.generated';
import { SubmitProductDeliveryStepDocument } from 'graphql/mutations/__generated__/submitProductDeliveryStep.generated';
import { SubmitProductDeliveryConditionStepDocument } from 'graphql/mutations/__generated__/submitProductDeliveryConditionStep.generated';
import { SubmitProductPricesStepDocument } from 'graphql/mutations/__generated__/submitProductPricesStep.generated';
import { SubmitProductDiscountsStepDocument } from 'graphql/mutations/__generated__/submitProductDiscountsStep.generated';
import { CreateProductTemplateDocument } from 'graphql/mutations/__generated__/createProductTemplate.generated';
import { AddProductToFavoritesDocument } from 'graphql/mutations/__generated__/addProductToFavorites.generated';
import { RemoveProductFromFavoritesDocument } from 'graphql/mutations/__generated__/removeProductFromFavorites.generated';
import { AddProductToPriorityListDocument } from 'graphql/mutations/__generated__/addProductToPriorityList.generated';
import { RemoveProductFromPriorityListDocument } from 'graphql/mutations/__generated__/removeProductFromPriorityList.generated';

import CustomerProducts from 'graphql/queries/customerProducts.graphql';
import { mockProducts } from '__tests__/mocks/mockProducts';

import useNotifier from 'hooks/useNotifier';

import {
  mockProductDraft,
  mockProductBasic,
  mockProductProperties,
  mockProductAddress,
  mockProductDelivery,
  mockProductDeliveryConditions,
  mockProductPrices,
  mockProductDiscounts,
} from '__tests__/mocks/mockProduct';

import { InMemoryCache } from '@apollo/client';
import {
  useCreateProductDraft,
  useDestroyProduct,
  useSubmitProductBasicStep,
  useSubmitProductPropertiesStep,
  useSubmitProductAddressStep,
  useSubmitProductDeliveryStep,
  useSubmitProductDeliveryConditionStep,
  useSubmitProductPricesStep,
  useSubmitProductDiscountsStep,
  useCreateProductTemplate,
  useAddProductToFavorites,
  useRemoveProductFromFavorites,
  useDestroyCustomerProduct,
  useRestoreCustomerProduct,
  useRenewProduct,
  useAddProductToPriorityList,
  useRemoveProductFromPriorityList,
} from './product';

jest.mock('hooks/useNotifier');

describe('Product actions', () => {
  const setSuccess = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setSuccess,
      setError: jest.fn(),
    })),
  );

  describe('useCreateProductDraft', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const data = {
        companyId: '1',
        name: 'test',
        description: 'test',
        condition: null,
        categoryId: '1',
        countryId: '1',
        manufacturer: 'test',
      };
      const mocks = [
        {
          request: {
            query: CreateProductDraftDocument,
            variables: { input: data },
          },
          result: {
            data: { createProductDraft: mockProductDraft },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateProductDraft({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createProductDraft).toEqual(mockProductDraft);
      });
    });
  });

  describe('useSubmitProductBasicStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const data = {
        productId: '1',
        name: 'test',
        description: 'test',
        condition: null,
        categoryId: '1',
        countryId: '1',
        manufacturer: 'test',
      };
      const mocks = [
        {
          request: {
            query: SubmitProductBasicStepDocument,
            variables: { input: data },
          },
          result: {
            data: { submitProductBasicStep: mockProductBasic },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductBasicStep({ onSibmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductBasicStep).toEqual(mockProductBasic);
      });
    });
  });

  describe('useSubmitProductPropertiesStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const { id: productId, variants } = mockProductProperties;

      const data = {
        productId,
        variants,
      };
      const mocks = [
        {
          request: {
            query: SubmitProductPropertiesStepDocument,
            variables: { input: data },
          },
          result: {
            data: { submitProductPropertiesStep: mockProductProperties },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductPropertiesStep(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductPropertiesStep).toEqual(mockProductProperties);
      });
    });
  });

  describe('useSubmitProductAddressStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const {
        id: productId,
        variants,
        companyLocation: { id: companyLocationId },
      } = mockProductAddress;

      const data = {
        productId,
        companyLocationId,
        variants,
      };
      const mocks = [
        {
          request: {
            query: SubmitProductAddressStepDocument,
            variables: { input: data },
          },
          result: {
            data: { submitProductAddressStep: mockProductAddress },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductAddressStep(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductAddressStep).toEqual(mockProductAddress);
      });
    });
  });

  describe('useSubmitProductDeliveryStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const { id: productId, productFreeDeliveries, productPaidDeliveries } = mockProductDelivery;

      const data = {
        productId,
        productFreeDeliveries,
        productPaidDeliveries,
      };
      const mocks = [
        {
          request: {
            query: SubmitProductDeliveryStepDocument,
            variables: { input: data },
          },
          result: {
            data: { submitProductDeliveryStep: mockProductDelivery },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductDeliveryStep(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductDeliveryStep).toEqual(mockProductDelivery);
      });
    });
  });

  describe('useSubmitProductDeliveryConditionStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const {
        id: productId,
        shipmentMethod,
        deliveryConditionForVariant,
        deliveryCondition,
      } = mockProductDeliveryConditions;

      const data = {
        variants: [],
        productId,
        shipmentMethod,
        deliveryConditionForVariant,
        deliveryCondition,
      };
      const mocks = [
        {
          request: {
            query: SubmitProductDeliveryConditionStepDocument,
            variables: { input: data },
          },
          result: {
            data: {
              submitProductDeliveryConditionsStep: { mockProductDeliveryConditions, variants: [] },
            },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductDeliveryConditionStep(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductDeliveryConditionsStep).toEqual({
          mockProductDeliveryConditions,
          variants: [],
        });
      });
    });
  });

  describe('useSubmitProductPricesStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const {
        id: productId,
        productConfirmationRecords,
        vat,
        wholesaleLot,
        variants: { id, price, stock, wholesalePrice },
      } = mockProductPrices;
      const mockVariants = [{ id, price, stock, wholesalePrice }];

      const data = {
        productId,
        productConfirmationRecords,
        vat,
        wholesaleLot,
        variants: mockVariants,
      };

      const mocks = [
        {
          request: {
            query: SubmitProductPricesStepDocument,
            variables: { input: data },
          },
          result: {
            data: { submitProductPricesStep: mockProductPrices },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductPricesStep(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductPricesStep).toEqual(mockProductPrices);
      });
    });
  });

  describe('useSubmitProductDiscountsStep', () => {
    test('should mutate state', async () => {
      // Arrange
      const {
        id: productId,
        weeklyDiscounts,
        periodDiscounts,
        variants: {
          id,
          weeklyDiscounts: variantsWeeklyDiscounts,
          periodDiscounts: variantsPeriodDiscounts,
        },
      } = mockProductDiscounts;
      const mockVariants = [
        { id, weeklyDiscounts: variantsWeeklyDiscounts, periodDiscounts: variantsPeriodDiscounts },
      ];

      const data = {
        productId,
        discountsForVariant: true,
        weeklyDiscounts,
        periodDiscounts,
        variants: mockVariants,
      };

      const mocks = [
        {
          request: {
            query: SubmitProductDiscountsStepDocument,
            variables: { input: data },
          },
          result: {
            data: { submitProductDiscountsStep: mockProductDiscounts },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useSubmitProductDiscountsStep(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.submitProductDiscountsStep).toEqual(mockProductDiscounts);
      });
    });
  });

  describe('useCreateProductTemplate', () => {
    test('should mutate state', async () => {
      // Arrange
      const {
        id: productId,
        weeklyDiscounts,
        periodDiscounts,
        variants: {
          id,
          weeklyDiscounts: variantsWeeklyDiscounts,
          periodDiscounts: variantsPeriodDiscounts,
        },
      } = mockProductDiscounts;
      const mockVariants = [
        { id, weeklyDiscounts: variantsWeeklyDiscounts, periodDiscounts: variantsPeriodDiscounts },
      ];

      const data = {
        productId,
        discountsForVariant: true,
        weeklyDiscounts,
        periodDiscounts,
        variants: mockVariants,
      };

      const mocks = [
        {
          request: {
            query: CreateProductTemplateDocument,
            variables: { input: data },
          },
          result: {
            data: { createProductTemplate: mockProductDiscounts },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useCreateProductTemplate(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.createProductTemplate).toEqual(mockProductDiscounts);
      });
    });
  });

  describe('useDestroyProduct', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const idMock = '1';
      const messageMock = 'error';
      const mocks = [
        {
          request: {
            query: DestroyProductDocument,
            variables: { input: { productId: idMock } },
          },
          result: {
            data: { destroyProduct: { message: messageMock } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useDestroyProduct({ onSubmit: mockOnSubmit }), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(idMock));

      // Assert
      await waitFor(() => {
        expect(result.current[1]).toEqual(messageMock);
      });
    });
  });

  describe('useRenewProduct', () => {
    test('should mutate state', async () => {
      // Arrange
      const idMock = '1';
      const mocks = [
        {
          request: {
            query: RenewProductDocument,
            variables: { input: { productId: idMock } },
          },
          result: {
            data: { renewProduct: { ...mockProductBasic } },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRenewProduct({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(idMock));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.renewProduct).toEqual(mockProductBasic);
      });
    });
  });

  describe('useAddProductToFavorites', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockProductId = '1';
      const data = {
        productId: mockProductId,
      };

      const expectedProductMock = {
        ...mockProductBasic,
        favorite: true,
        favoritesCount: 12,
      };
      const mocks = [
        {
          request: {
            query: AddProductToFavoritesDocument,
            variables: { input: data },
          },
          result: {
            data: { addProductToFavorites: expectedProductMock },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useAddProductToFavorites({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(mockProductId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.addProductToFavorites).toEqual(expectedProductMock);
      });
    });
  });

  describe('useRemoveProductFromFavorites', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockProductId = '1';
      const data = {
        productId: mockProductId,
      };

      const expectedProductMock = {
        ...mockProductBasic,
        favorite: false,
        favoritesCount: 11,
      };
      const mocks = [
        {
          request: {
            query: RemoveProductFromFavoritesDocument,
            variables: { input: data },
          },
          result: {
            data: { removeProductFromFavorites: expectedProductMock },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRemoveProductFromFavorites({}), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(mockProductId));

      // Assert
      await waitFor(() => {
        expect(result.current[1].data.removeProductFromFavorites).toEqual(expectedProductMock);
      });
    });
  });

  describe('useDestroyCustomerProduct', () => {
    test('should mutate state', async () => {
      // Arrange
      const productIds = ['1', '6', '8', '65'];
      const mocks = productIds.map(productId => ({
        request: {
          query: DestroyCustomerProductDocument,
          variables: { input: { productId } },
        },
        result: {
          data: { destroyCustomerProduct: { id: productId } },
        },
      }));

      const cache = new InMemoryCache().restore({});
      const edges = mockProducts.map(product => ({ cursor: product.id, node: product }));
      cache.writeQuery({
        query: CustomerProducts,
        data: {
          customerProducts: {
            edges,
            pageInfo: {
              endCursor: '',
              hasNextPage: null,
            },
          },
        },
      });

      const { result } = renderHook(() => useDestroyCustomerProduct({}), {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks} cache={cache}>
            {children}
          </MockedProvider>
        ),
      });
      // eslint-disable-next-line no-restricted-syntax
      for await (const productId of productIds) {
        const removedEdge = edges.find(({ node }) => node.id === productId);
        const { customerProducts } = cache.readQuery({ query: CustomerProducts });
        expect(customerProducts.edges.map(({ node }) => node.id)).toContain(removedEdge.node.id);

        const execute = result.current[0];
        setTimeout(() => execute(productId));

        // Assert
        await waitFor(() => {
          expect(result.current[1].data.destroyCustomerProduct.id).toEqual(productId);
        });
        const { customerProducts: changedCustomerProducts } = cache.readQuery({
          query: CustomerProducts,
        });
        expect(changedCustomerProducts.edges).not.toContainEqual(removedEdge);
        expect(setSuccess).toHaveBeenLastCalledWith(`Продукт № ${productId} успешно удален`);
      }
    });
  });

  describe('useRestoreCustomerProduct', () => {
    test('should mutate state', async () => {
      // Arrange
      const productIds = ['1', '6', '8', '65'];
      const mocks = productIds.map(productId => ({
        request: {
          query: RestoreCustomerProductDocument,
          variables: { input: { productId } },
        },
        result: {
          data: { restoreCustomerProduct: { id: productId } },
        },
      }));

      const cache = new InMemoryCache().restore({});
      const edges = mockProducts.map(product => ({ cursor: product.id, node: product }));
      cache.writeQuery({
        query: CustomerProducts,
        data: {
          customerProducts: {
            edges,
            pageInfo: {
              endCursor: '',
              hasNextPage: null,
            },
          },
        },
      });

      const { result } = renderHook(() => useRestoreCustomerProduct({}), {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks} cache={cache}>
            {children}
          </MockedProvider>
        ),
      });
      // eslint-disable-next-line no-restricted-syntax
      for await (const productId of productIds) {
        const removedEdge = edges.find(({ node }) => node.id === productId);
        const { customerProducts } = cache.readQuery({ query: CustomerProducts });
        expect(customerProducts.edges.map(({ node }) => node.id)).toContain(removedEdge.node.id);

        const execute = result.current[0];
        setTimeout(() => execute(productId));

        // Assert
        await waitFor(() => {
          expect(result.current[1].data.restoreCustomerProduct.id).toEqual(productId);
        });

        const { customerProducts: changedCustomerProducts } = cache.readQuery({
          query: CustomerProducts,
        });
        expect(changedCustomerProducts.edges).not.toContainEqual(removedEdge);
        expect(setSuccess).toHaveBeenLastCalledWith(`Продукт № ${productId} успешно восстановлен`);
      }
    });
  });

  describe('useAddProductToPriorityList', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockProductId = '1';
      const data = {
        productId: mockProductId,
      };

      const expectedProductMock = {
        product: {
          id: mockProductId,
          canAddToPriorityList: false,
          canRemoveFromPriorityList: true,
          prioritized: true,
        },
      };
      const mocks = [
        {
          request: {
            query: AddProductToPriorityListDocument,
            variables: { input: data },
          },
          result: {
            data: { addProductToPriorityList: expectedProductMock },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useAddProductToPriorityList(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(
        () => {
          expect(result.current[1].data.addProductToPriorityList).toEqual(expectedProductMock);
        },
        { interval: 1 },
      );
    });
  });

  describe('useRemoveProductFromPriorityList', () => {
    test('should mutate state', async () => {
      // Arrange
      const mockProductId = '1';
      const data = {
        productId: mockProductId,
      };

      const expectedProductMock = {
        product: {
          id: mockProductId,
          canAddToPriorityList: true,
          canRemoveFromPriorityList: false,
          prioritized: false,
        },
      };
      const mocks = [
        {
          request: {
            query: RemoveProductFromPriorityListDocument,
            variables: { input: data },
          },
          result: {
            data: { removeProductFromPriorityList: expectedProductMock },
          },
        },
      ];

      // Act
      const { result } = renderHook(() => useRemoveProductFromPriorityList(), {
        wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
      });

      const execute = result.current[0];
      setTimeout(() => execute(data));

      // Assert
      await waitFor(
        () => {
          expect(result.current[1].data.removeProductFromPriorityList).toEqual(expectedProductMock);
        },
        { interval: 1 },
      );
    });
  });
});
