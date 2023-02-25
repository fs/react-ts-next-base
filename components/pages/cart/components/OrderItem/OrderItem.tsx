import React, { useState } from 'react';
import plural from 'plural-ru';
import debounce from 'lodash/debounce';
import useRouter from 'hooks/useRouter';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { DASHBOARD_COMPANY_ORDER, DASHBOARD_CREATE_COMPANY } from 'config/routes';
import { yandexMetrikaGoal } from 'helpers';
import { BUYER } from 'config/constants/directions';
import { metrikaProductIds } from 'config/constants/metrikaProducts';

import {
  useReserveOrder,
  useDestroyOrder,
  usePlaceOrder,
  useUpdateOrderQuantity,
  useAddProductToCart,
} from 'lib/apollo/hooks/actions/order';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import useCurrentUser from 'hooks/useCurrentUser';
import OrderItemForm from './OrderItemForm';

import { OrderWrapper, Header } from './styled';
import SignUpFromCartModal from './components/SignUpFromCartModal';
import { TOrderItem } from './types';

const isValidProductIds = (value: string): value is keyof typeof metrikaProductIds => {
  return value in metrikaProductIds;
};

const OrderItem: React.FunctionComponent<TOrderItem> = ({
  order,
  companyBuyerName,
  companyId,
  refetchAfterDestroy = () => {},
}) => {
  const {
    id: orderId,
    quantity,
    product: { id: productId },
  } = order;
  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const { pushRoute, query } = useRouter();
  const { sellerId } = query;

  const onDestroyUserOrder = () => {
    if (sellerId) pushRoute({ query: { ...query, sellerId: null } });
  };

  const [destroyOrder] = useDestroyOrder({ orderId, onSubmit: onDestroyUserOrder });
  const [addOrderToCart] = useAddProductToCart({ companyId: companyId || '' });
  const [placeOrder] = usePlaceOrder({
    orderId,
    onConfirm: () =>
      pushRoute({
        pathname: DASHBOARD_COMPANY_ORDER,
        query: { companyId, orderId, fromOrderPage: true },
      }),
  });
  const [updateOrderQuantity] = useUpdateOrderQuantity();
  const [reserveOrder] = useReserveOrder({ orderId });

  const destroyOrderModal = useModal(SimpleModal);
  const outOfStockModal = useModal(SimpleModal);
  const addOrderToCartModal = useModal(SimpleModal);

  const onUpdateOrderQuantity = async (count: number) => {
    setLoadingQuantity(true);
    await updateOrderQuantity({ quantity: count, orderId });
    setLoadingQuantity(false);
  };

  const onChangeOrderQuantity = debounce(count => {
    onUpdateOrderQuantity(count);
  }, 300);

  const initialValues = {
    summaryCount: quantity,
  };

  const showDestroyOrder = () => {
    destroyOrderModal.show({
      onSubmit: async () => {
        await destroyOrder();
        refetchAfterDestroy();
      },
      title: 'Удаление заказа',
      description: (
        <>
          Вы уверены, что хотите удалить
          <br /> заказ <strong>№{orderId}</strong>
        </>
      ),
    });
  };

  const showOutOfStock = () => {
    outOfStockModal.show({
      showCancel: false,
      onSubmit: refetchAfterDestroy,
      title: 'Оформление заказа',
      description:
        'У Продавца оставалось ограниченное количество товара. Пока товар лежал у вас в корзине и вы не оформили сделку, товар раскупили. К сожалению, ваша корзина будет очищена.',
      acceptText: 'Принять',
    });
  };

  const showPlaceRemainingQuantity = (remainingQuantity: number) => {
    const positionEnding = plural(remainingQuantity, 'позиция', 'позиции', 'позиций');

    addOrderToCartModal.show({
      onSubmit: async () => {
        if (!companyId) return;
        await addOrderToCart({
          variantId: order?.variant?.id,
          quantity: remainingQuantity,
          deliveryPointId: order.deliveryPointId,
          deliveryService: order.deliveryService,
          companyLocationId: order?.companyLocation?.id,
          deliveryMethod: order.deliveryMethod,
          pickupDate: order.pickupDate,
          companyId,
        });
        refetchAfterDestroy();
      },
      onCancel: refetchAfterDestroy,
      title: 'Оформление заказа',
      description: (
        <>
          У Продавца оставалось ограниченное количество товара. Пока товар лежал у вас в корзине и
          вы не оформили сделку у продавца осталось
          <b>{` ${remainingQuantity} ${positionEnding} `}</b>
          товара. Вы можете купить оставшийся товар или очистить корзину
        </>
      ),
      acceptText: 'Принять',
      cancelText: 'Очистить корзину',
    });
  };

  const placeOrderModal = useModal(SimpleModal);
  const { isRegisteredUser, isGuest } = useCurrentUser();

  const showPlaceOrder = () => {
    if (isValidProductIds(productId)) {
      yandexMetrikaGoal(metrikaProductIds[productId].placeOrder);
    }

    placeOrderModal
      .show({
        onSubmit: async () => {
          if (isValidProductIds(productId))
            yandexMetrikaGoal(metrikaProductIds?.[productId]?.placeOrderConfirm);

          const resultPlacedOrder = await placeOrder();
          return resultPlacedOrder;
        },
        title: 'Оформление заказа',
        description:
          'Нажимая на кнопку «Подтвердить» вы соглашаетесь с условиями сделки. С этого момента сделка будет считаться заключённой, а счета необходимо будет оплатить в течение 24 часов.',
      })
      .then(resultPlacedOrder => {
        if (typeof resultPlacedOrder === 'number') {
          if (resultPlacedOrder === 0) {
            showOutOfStock();
          }
          if (resultPlacedOrder > 0) {
            showPlaceRemainingQuantity(resultPlacedOrder);
          }
        }
      });
  };

  const onPlaceGuestOrderSubmit = () => {
    pushRoute({
      pathname: DASHBOARD_CREATE_COMPANY,
      query: { isFirst: true, direction: BUYER },
    });
    reserveOrder();
  };

  const showPlaceGuestOrder = () => {
    placeOrderModal.show({
      onSubmit: onPlaceGuestOrderSubmit,
      title: 'Оформление заказа',
      acceptText: 'Продолжить',
      description:
        'Нажмите на “Продолжить”, чтобы перейти к созданию компании-покупателя и оформить безопасную сделку на сервисе Medagregator. ',
    });
  };

  const showSignUpModal = () => NiceModal.show(SignUpFromCartModal);

  const onSubmit = async () => {
    !isRegisteredUser ? showSignUpModal() : isGuest ? showPlaceGuestOrder() : showPlaceOrder();
  };

  const form = {
    onSubmit,
    initialValues,
  };

  return (
    <OrderWrapper data-testid="order-list-item" data-cy="order-list-item" data-order-id={orderId}>
      <Header>Заказ № {orderId}</Header>

      <OrderItemForm
        form={form}
        order={order}
        showDestroyOrder={showDestroyOrder}
        loadingQuantity={loadingQuantity}
        onChangeOrderQuantity={onChangeOrderQuantity}
        companyBuyerName={companyBuyerName}
      />
    </OrderWrapper>
  );
};

export default OrderItem;
