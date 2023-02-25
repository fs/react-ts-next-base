import useNotifier from 'hooks/useNotifier';
import ErrorDecorator from 'decorators/ErrorDecorator';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';

import OrdersSummary from 'graphql/queries/ordersSummary.graphql';

import { useDestroyOrderMutation } from 'graphql/mutations/__generated__/destroyOrder.generated';
import { usePlaceOrderMutation } from 'graphql/mutations/__generated__/placeOrder.generated';
import { useAddProductToCartMutation } from 'graphql/mutations/__generated__/addProductToCart.generated';
import { useAddProductToGuestCartMutation } from 'graphql/mutations/__generated__/addProductToGuestCart.generated';
import { useUpdateOrderDeliveryMutation } from 'graphql/mutations/__generated__/updateOrderDelivery.generated';
import { useFinishOrderDeliveryMutation } from 'graphql/mutations/__generated__/finishOrderDelivery.generated';
import { useUpdateOrderQuantityMutation } from 'graphql/mutations/__generated__/updateOrderQuantity.generated';
import { useCancelReservedOrderMutation } from 'graphql/mutations/__generated__/cancelReservedOrder.generated';
import { useConfirmOrderPaymentMutation } from 'graphql/mutations/__generated__/confirmOrderPayment.generated';
import { useCreateReviewMutation } from 'graphql/mutations/__generated__/createReview.generated';
import { useConfirmReservedOrderMutation } from 'graphql/mutations/__generated__/ConfirmReservedOrder.generated';
import { useReserveOrderMutation } from 'graphql/mutations/__generated__/reserveOrder.generated';

import {
  AddProductToCartInput,
  AddProductToGuestCartInput,
  CreateReviewInput,
  OrderCheckoutStatusEnum,
  ReserveOrderInput,
  UpdateOrderDeliveryInput,
  UpdateOrderQuantityInput,
} from 'graphql/types';

import {
  TAddProductToCart,
  TAddProductToGuestCart,
  TConfirmOrderPayment,
  TDestroyOrder,
  TExisting,
  TFinishOrderDelivery,
  TOrderInfoEdge,
  TPlaceOrder,
  TUpdateOrderDelivery,
} from './types';

export const useAddProductToCart = ({ companyId }: TAddProductToCart) => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useAddProductToCartMutation({
    refetchQueries: [
      {
        query: OrdersSummary,
        variables: {
          companyId,
          checkoutStatus: OrderCheckoutStatusEnum.InCart,
          deleted: false,
        },
      },
    ],
  });

  const mutate = async ({
    variantId,
    quantity,
    deliveryMethod,
    deliveryService,
    companyLocationId,
    deliveryPointId,
    pickupDate,
  }: AddProductToCartInput) => {
    const addProductToCartInput = {
      companyId,
      variantId,
      quantity,
      deliveryMethod,
      deliveryService,
      companyLocationId,
      deliveryPointId,
      pickupDate,
    };

    try {
      const { data } = await mutation({ variables: { input: addProductToCartInput } });
      return data?.addProductToCart;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useAddProductToGuestCart = ({ onCompleted }: TAddProductToGuestCart) => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useAddProductToGuestCartMutation({ onCompleted });

  const mutate = async ({
    variantId,
    quantity,
    deliveryMethod,
    deliveryService,
    cityId,
    deliveryPointId,
    pickupDate,
  }: AddProductToGuestCartInput) => {
    const addProductToCartInput = {
      cityId,
      variantId,
      quantity,
      deliveryMethod,
      deliveryService,
      deliveryPointId,
      pickupDate,
    };

    try {
      const { data } = await mutation({ variables: { input: addProductToCartInput } });
      return data?.addProductToGuestCart;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useDestroyOrder = ({ orderId, onSubmit = () => {} }: TDestroyOrder) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useDestroyOrderMutation({
    onCompleted: () => {
      onSubmit();
      setSuccess(`Заказ №${orderId} был успешно удален`);
    },
    update(cache) {
      const removeNode = (existing: TExisting, readField: ReadFieldFunction) => {
        return {
          ...existing,
          edges: existing.edges.filter(
            (edge: TOrderInfoEdge) => orderId !== readField('id', edge.node),
          ),
        };
      };
      cache.modify({
        fields: {
          orders(existing, { readField }) {
            return removeNode(existing, readField);
          },
          customerOrders(existing, { readField }) {
            return removeNode(existing, readField);
          },
        },
      });
    },
  });

  const mutate = async () => {
    const destroyOrderInput = {
      orderId,
    };

    try {
      await mutation({ variables: { input: destroyOrderInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useUpdateOrderDelivery = ({ orderId }: TUpdateOrderDelivery) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useUpdateOrderDeliveryMutation({
    onCompleted: () => {
      setSuccess(`Условия доставки для заказа №${orderId} были успешно обновлены`);
    },
  });

  const mutate = async ({
    deliveryMethod,
    deliveryService,
    companyLocationId,
    deliveryPointId,
    pickupDate,
  }: UpdateOrderDeliveryInput) => {
    const updateOrderDeliveryInput = {
      orderId,
      deliveryMethod,
      deliveryService,
      companyLocationId,
      deliveryPointId,
      pickupDate,
    };

    try {
      await mutation({ variables: { input: updateOrderDeliveryInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const usePlaceOrder = ({ orderId, onConfirm = () => {} }: TPlaceOrder) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = usePlaceOrderMutation({
    onCompleted: () => {
      onConfirm();
      setSuccess(`Заказ №${orderId} оформлен`);
    },
  });

  const mutate = async () => {
    const placeOrderInput = {
      orderId,
    };

    try {
      const order = await mutation({ variables: { input: placeOrderInput } });

      return order;
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
      return errorMessage.getExtra()[0]?.remainingQuantity || null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useUpdateOrderQuantity = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useUpdateOrderQuantityMutation();

  const mutate = async ({ quantity, orderId }: UpdateOrderQuantityInput) => {
    const updateOrderQuantityInput = {
      orderId,
      quantity,
    };

    try {
      await mutation({ variables: { input: updateOrderQuantityInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };

  return [mutate, mutationState] as const;
};

export const useCreateReview = () => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useCreateReviewMutation({
    onCompleted: ({ createReview }) => {
      setSuccess(`Отзыв на заказ №${createReview?.id} оставлен`);
    },
  });

  const mutate = async ({
    orderId,
    productBody,
    productRating,
    companyBody,
    companyRating,
  }: CreateReviewInput) => {
    const createReviewInput = {
      orderId,
      productBody,
      productRating,
      companyBody,
      companyRating,
    };

    try {
      await mutation({ variables: { input: createReviewInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };

  return [mutate, mutationState] as const;
};

export const useFinishOrderDelivery = ({ orderId }: TFinishOrderDelivery) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useFinishOrderDeliveryMutation({
    onCompleted: () => setSuccess(`Доставка заказа №${orderId} подтверждена`),
  });

  const mutate = async () => {
    const finishOrderDeliveryInput = {
      orderId,
    };

    try {
      await mutation({ variables: { input: finishOrderDeliveryInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };

  return [mutate, mutationState] as const;
};

export const useCancelReservedOrder = ({
  orderId,
  onSubmit = () => {},
}: {
  orderId: string;
  onSubmit?: () => void;
}) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useCancelReservedOrderMutation({
    onCompleted: () => {
      setSuccess(`Заказ №${orderId} отменен`);
      onSubmit();
    },
  });

  const mutate = async () => {
    const cancelReservedOrderInput = {
      orderId,
    };

    try {
      await mutation({ variables: { input: cancelReservedOrderInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };

  return [mutate, mutationState] as const;
};

export const useConfirmReservedOrder = ({
  orderId,
  onSubmit = () => {},
}: {
  orderId: string;
  onSubmit?: () => void;
}) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useConfirmReservedOrderMutation({
    onCompleted: () => {
      setSuccess(`Заказ №${orderId} подтвержден`);
      onSubmit();
    },
  });

  const mutate = async () => {
    const confirmReservedOrderInput = {
      orderId,
    };

    try {
      await mutation({ variables: { input: confirmReservedOrderInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };

  return [mutate, mutationState] as const;
};

export const useReserveOrder = ({ orderId }: ReserveOrderInput) => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useReserveOrderMutation({
    onCompleted: ({ reserveOrder }) => {
      const message = reserveOrder?.message;
      if (message) setError(message);
    },
  });

  const mutate = async () => {
    const reserveOrderInput = {
      orderId,
    };

    try {
      await mutation({ variables: { input: reserveOrderInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };

  return [mutate, mutationState] as const;
};

export const useConfirmOrderPayment = ({
  orderId,
  onSubmit = () => {},
  deleteFromCache = false,
}: TConfirmOrderPayment) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useConfirmOrderPaymentMutation({
    onCompleted: () => {
      onSubmit();
      setSuccess(`Оплата заказа №${orderId} подтверждена`);
    },
    update(cache) {
      deleteFromCache &&
        cache.modify({
          fields: {
            customerOrders(existing: TExisting, { readField }) {
              return {
                ...existing,
                edges: existing.edges.filter(
                  (edge: TOrderInfoEdge) => orderId !== readField('id', edge.node),
                ),
              };
            },
          },
        });
    },
  });

  const mutate = async () => {
    const confirmOrderPaymentInput = {
      orderId,
    };

    try {
      await mutation({ variables: { input: confirmOrderPaymentInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
