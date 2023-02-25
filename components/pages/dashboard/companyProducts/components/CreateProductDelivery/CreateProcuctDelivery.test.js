import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';

import renderWithApolloClient from '__tests__/helpers/renderWithApolloClient';
import renderWithTheme from '__tests__/helpers/renderWithTheme';

import useNotifier from 'hooks/useNotifier';
import { useDeliveryPoints } from 'lib/apollo/hooks/state/deliveryPoints';
import { useSubmitProductDeliveryConditionStep } from 'lib/apollo/hooks/actions/product';
import { useDellinFreightTypes } from 'lib/apollo/hooks/state/dellinFreightTypes';

import { DELIVERY } from 'config/constants/createProductSteps';

import { mockProductAddress, mockProductDeliveryConditions } from '__tests__/mocks/mockProduct';
import { mockDeliveryPoints } from '__tests__/mocks/mockDeliveryPoints';
import { mockDellinFreightTypes } from '__tests__/mocks/mockDellinFreightTypes';
import { shipmentMethods } from 'config/constants/createProductDelivery';

import CreateProductDelivery from '.';

jest.mock('lib/apollo/hooks/actions/product');
jest.mock('lib/apollo/hooks/state/deliveryPoints');
jest.mock('lib/apollo/hooks/state/dellinFreightTypes');
jest.mock('hooks/useNotifier');
// TODO: временно убрали упаковку товара и скипнули тесты https://www.pivotaltracker.com/n/projects/2496414/stories/181805681
describe('CreateProductDelivery', () => {
  const mockCreateProductDeliveryStep = jest.fn(() => mockProductDeliveryConditions);
  useSubmitProductDeliveryConditionStep.mockImplementation(
    jest.fn(() => [mockCreateProductDeliveryStep]),
  );

  const mockUseDeliveryPoints = jest.fn(() => ({ deliveryPoints: mockDeliveryPoints }));
  useDeliveryPoints.mockImplementation(mockUseDeliveryPoints);

  const mockUseDellinFreightTypes = jest.fn(() => ({ dellinFreightTypes: mockDellinFreightTypes }));
  useDellinFreightTypes.mockImplementation(mockUseDellinFreightTypes);

  const mockSetError = jest.fn();
  useNotifier.mockImplementation(
    jest.fn(() => ({
      setError: mockSetError,
    })),
  );

  describe.skip('should call submitProductDeliveryConditionsStep on submit', () => {
    // Arrange
    const mockOnSubmitStep = jest.fn();
    const { id: expectedProductId } = mockProductAddress;

    const expectedHazardClass = '1.1';
    const expectedDellinFreightType = mockDellinFreightTypes[0];
    const expectedInsuranceRequired = true;
    // TODO: add packaging field handling
    const expectedComment = 'lorem ipsum';

    const expectedDellinFreightTypeValues = { active: true };

    test.skip('courier delivery method with variants', async () => {
      const expectedDeliveryConditionForVariant = true;
      const expectedDeliveryCondition = null;

      const expectedValues = {
        productId: expectedProductId,
        shipmentMethod: shipmentMethods.COURIER,
        sdekCourierAllowed: true,
        dellinCourierAllowed: true,
        sdekDeliveryPointId: null,
        dellinFreightTypeId: expectedDellinFreightType.id,
        dellinDeliveryPointId: null,
        deliveryConditionForVariant: expectedDeliveryConditionForVariant,
        deliveryCondition: expectedDeliveryCondition,
        variants: [
          {
            id: mockProductAddress.variants[0].id,
            deliveryCondition: {
              hazardClass: expectedHazardClass,
              insuranceRequired: expectedInsuranceRequired,
              comment: expectedComment,
            },
          },
        ],
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDelivery product={mockProductAddress} onSubmitStep={mockOnSubmitStep} />,
          ),
        ),
      );

      const deliveryConditionForVariantField = screen.getByTestId(
        `deliveryConditionForVariant_${expectedDeliveryConditionForVariant}`,
      );
      fireEvent.click(deliveryConditionForVariantField);

      const insuranceField = screen.getByTestId('variants.0.insuranceRequired_true');
      const packagingField = screen.getAllByTestId('variants.0.packaging')[0];
      const commentField = screen.getByTestId('variants.0.comment');
      const submitButton = screen.getByTestId('create-delivery-condition-submit-button');

      // Act
      await selectEvent.select(screen.getByText('Характер груза'), expectedDellinFreightType.name);
      await selectEvent.select(screen.getByText('1.0'), expectedHazardClass);
      fireEvent.click(insuranceField);
      fireEvent.click(packagingField);
      fireEvent.change(commentField, { target: { value: expectedComment } });
      fireEvent.click(submitButton);

      // Assert
      expect(mockUseDellinFreightTypes).toHaveBeenCalledWith(expectedDellinFreightTypeValues);
      await waitFor(() => {
        expect(mockCreateProductDeliveryStep).toHaveBeenCalledWith(expectedValues);
        expect(mockOnSubmitStep).toHaveBeenCalledWith(DELIVERY);
      });
    });

    test.skip('courier delivery method with common delivery condition', async () => {
      const expectedDeliveryConditionForVariant = false;

      const expectedDeliveryCondition = {
        hazardClass: expectedHazardClass,
        insuranceRequired: expectedInsuranceRequired,
        comment: expectedComment,
      };

      const expectedValues = {
        productId: expectedProductId,
        shipmentMethod: shipmentMethods.COURIER,
        sdekCourierAllowed: true,
        dellinCourierAllowed: true,
        sdekDeliveryPointId: null,
        dellinFreightTypeId: expectedDellinFreightType.id,
        dellinDeliveryPointId: null,
        deliveryConditionForVariant: expectedDeliveryConditionForVariant,
        deliveryCondition: expectedDeliveryCondition,
        variants: [],
      };

      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDelivery product={mockProductAddress} onSubmitStep={mockOnSubmitStep} />,
          ),
        ),
      );

      // Act
      const deliveryConditionForVariantField = screen.getByTestId(
        `deliveryConditionForVariant_${expectedDeliveryConditionForVariant}`,
      );
      fireEvent.click(deliveryConditionForVariantField);

      const insuranceField = screen.getByTestId('insuranceRequired_true');
      const packagingField = screen.getAllByTestId('packaging')[0];
      const commentField = screen.getByTestId('comment');
      const submitButton = screen.getByTestId('create-delivery-condition-submit-button');

      await selectEvent.select(screen.getByText('Характер груза'), expectedDellinFreightType.name);
      await selectEvent.select(screen.getByText('1.0'), expectedHazardClass);
      fireEvent.click(insuranceField);
      fireEvent.click(packagingField);
      fireEvent.change(commentField, { target: { value: expectedComment } });
      fireEvent.click(submitButton);

      // Assert
      expect(mockUseDellinFreightTypes).toHaveBeenCalledWith(expectedDellinFreightTypeValues);
      await waitFor(() => {
        expect(mockCreateProductDeliveryStep).toHaveBeenCalledWith(expectedValues);
        expect(mockOnSubmitStep).toHaveBeenCalledWith(DELIVERY);
      });
    });

    test('without third party delivery method', async () => {
      // Arrange
      const expectedValues = {
        productId: expectedProductId,
        deliveryCondition: null,
        deliveryConditionForVariant: true,
        dellinFreightTypeId: null,
        dellinCourierAllowed: false,
        dellinDeliveryPointId: null,
        sdekCourierAllowed: false,
        sdekDeliveryPointId: null,
        shipmentMethod: 'NONE',
        variants: [],
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDelivery product={mockProductAddress} onSubmitStep={mockOnSubmitStep} />,
          ),
        ),
      );

      const shipmentMethodField = screen.getByTestId('shipmentMethod_NONE');
      fireEvent.click(shipmentMethodField);

      const submitButton = screen.getByTestId('create-delivery-condition-submit-button');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockCreateProductDeliveryStep).toHaveBeenCalledWith(expectedValues);
        expect(mockOnSubmitStep).toHaveBeenCalledWith(DELIVERY);
      });
    });

    test.skip('deliveryPoint method', async () => {
      // Arrange
      const expectedSdekDeliveryPointId = mockDeliveryPoints[0].id;

      const expectedDeliveryCondition = {
        hazardClass: expectedHazardClass,
        insuranceRequired: expectedInsuranceRequired,
        comment: expectedComment,
      };

      const expectedValues = {
        productId: expectedProductId,
        deliveryCondition: expectedDeliveryCondition,
        deliveryConditionForVariant: false,
        dellinFreightTypeId: null,
        dellinCourierAllowed: false,
        dellinDeliveryPointId: null,
        sdekCourierAllowed: false,
        sdekDeliveryPointId: expectedSdekDeliveryPointId,
        shipmentMethod: 'DELIVERY_POINT',
        variants: [],
      };

      // Act
      render(
        renderWithTheme(
          renderWithApolloClient(
            <CreateProductDelivery product={mockProductAddress} onSubmitStep={mockOnSubmitStep} />,
          ),
        ),
      );

      const shipmentMethodField = screen.getByTestId('shipmentMethod_DELIVERY_POINT');
      fireEvent.click(shipmentMethodField);

      const deliveryConditionForVariantField = screen.getByTestId(
        'deliveryConditionForVariant_false',
      );
      fireEvent.click(deliveryConditionForVariantField);

      const insuranceField = screen.getByTestId('insuranceRequired_true');
      const packagingField = screen.getAllByTestId('packaging')[0];
      const commentField = screen.getByTestId('comment');

      // Act
      await selectEvent.select(screen.getByText('1.0'), expectedHazardClass);
      fireEvent.click(insuranceField);
      fireEvent.click(packagingField);
      fireEvent.change(commentField, { target: { value: expectedComment } });

      const submitButton = screen.getByTestId('create-delivery-condition-submit-button');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockUseDeliveryPoints).toHaveBeenCalled();
        expect(mockCreateProductDeliveryStep).toHaveBeenCalledWith(expectedValues);
        expect(mockOnSubmitStep).toHaveBeenCalledWith(DELIVERY);
      });
    });
  });
});
