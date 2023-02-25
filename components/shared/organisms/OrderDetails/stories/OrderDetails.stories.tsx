import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { OrderExecutionStatusEnum } from 'graphql/types';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

import { mockOrder } from '__tests__/mocks/mockOrders';
import { mockDispute } from '__tests__/mocks/mockDispute';
import { mockReturnedShipment } from '__tests__/mocks/mockReturnedShipment';
import { mockAuthorizationResultSuccess } from '__tests__/mocks/mockAuthorizationResult';

import { EVariant } from '../types';
import OrderDetails from '../index';

export default {
  title: 'organisms/OrderDetails',
  component: OrderDetails,
  argTypes: {},
  args: {
    isDetailed: false,
    variant: 'default',
    order: mockOrder,
  },
} as ComponentMeta<typeof OrderDetails>;

export const Demo: ComponentStory<typeof OrderDetails> = args => {
  return <OrderDetails {...args} />;
};

const adminOperationMockOrder = {
  ...mockOrder,
  executionStatus: OrderExecutionStatusEnum.PaymentPending,
};

const variantsList = [
  {
    variant: 'default',
    order: mockOrder,
  },
  {
    variant: 'admin_operation',
    order: adminOperationMockOrder,
  },
  {
    variant: 'admin_disputes',
    order: adminOperationMockOrder,
  },
  {
    variant: 'documents',
    order: adminOperationMockOrder,
  },
] as const;

type TVariantsListItem = {
  order: OrderInfoFragment;
  variant?: `${EVariant}`;
};

export const Variants: ComponentStory<typeof OrderDetails> = args => {
  return (
    <>
      {variantsList.map(({ variant, order }: TVariantsListItem) => (
        <OrderDetails {...args} variant={variant} order={order} />
      ))}
    </>
  );
};

export const VariantsExecutionStatus: ComponentStory<typeof OrderDetails> = args => {
  return (
    <>
      {Object.values(OrderExecutionStatusEnum).map(status => {
        const mockOrderWithStatus = {
          ...mockOrder,
          executionStatus: status,
          dispute: {
            ...mockDispute,
            returnedShipment: {
              ...mockReturnedShipment,
              canUpdate: mockAuthorizationResultSuccess,
            },
            canCancel: mockAuthorizationResultSuccess,
            canReceiveReturnedShipment: mockAuthorizationResultSuccess,
            canCreateReturnedShipment: mockAuthorizationResultSuccess,
          },
        };
        return (
          <>
            <div>
              <b> {status}:</b>
            </div>
            <OrderDetails {...args} variant="default" order={mockOrderWithStatus} />
          </>
        );
      })}
    </>
  );
};
