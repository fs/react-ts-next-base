import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import useCurrentUser from 'hooks/useCurrentUser';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import OrderCartDetails from 'components/shared/organisms/OrderCartDetails';

import TotalPrice from './components/TotalPrice';
import OrderDelivery from './components/OrderDelivery';

import {
  Details,
  GuestNotice,
  OrderConfirmation,
  OrderNotice,
  OrderRegistration,
  OrderRegistrationActions,
} from './styled';
import { TOrderItemForm } from './types';

const OrderItemForm = ({
  form,
  order,
  companyBuyerName,
  showDestroyOrder,
  loadingQuantity,
  onChangeOrderQuantity,
}: TOrderItemForm) => {
  const { initialValues, onSubmit } = form;
  const { id: orderId, deliveryPrice, itemPrice } = order;

  const { isRegisteredUser, isGuest } = useCurrentUser();

  const buttonLabel = !isRegisteredUser
    ? 'Присоединиться'
    : isGuest
    ? 'Продолжить'
    : 'Оформить заказ';

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <FormikForm>
          <Details>
            <OrderCartDetails
              order={order}
              onChangeOrderQuantity={onChangeOrderQuantity}
              loadingQuantity={loadingQuantity}
              summaryCount={values.summaryCount}
            />

            <OrderDelivery order={order} loadingQuantity={loadingQuantity} />
          </Details>

          <OrderConfirmation>
            {companyBuyerName ? (
              <OrderNotice>
                <Icon name="exclamation-square" $size={26} $color="orange" />
                <p>
                  Обратите внимание что вы покупаете товар от имени компании{' '}
                  <strong>{companyBuyerName}</strong>.
                  <br />
                  Если вы хотите купить этот товар от другой компании, удалите товар из корзины,
                  смените <br />
                  компанию и заново сформируйте заказ.
                </p>
              </OrderNotice>
            ) : (
              <GuestNotice>
                Отлично! Вы собрали свой первый заказ.{' '}
                {isRegisteredUser
                  ? 'Нажмите на “Продолжить”, чтобы создать компанию-покупателя и оформить безопасную сделку на нашем сервисе.'
                  : 'Чтобы оформить безопасную сделку,зарегистрируйтесь на нашем сервисе.'}{' '}
                Если вам нужна будет наша помощь, звоните по номеру +7 843 50 00 310
              </GuestNotice>
            )}
            <OrderRegistration>
              <TotalPrice
                loading={loadingQuantity}
                price={
                  itemPrice ? (values.summaryCount * itemPrice || itemPrice) + deliveryPrice : 0
                }
              />
              <OrderRegistrationActions>
                <Button
                  label="Удалить заказ"
                  variant="hollow"
                  iconType="leading"
                  $width="10rem"
                  icon={<Icon name="trash-bin" $color="grey" />}
                  onClick={showDestroyOrder}
                  testId={`delete-order-${orderId}`}
                />

                <Button
                  label={buttonLabel}
                  size="small"
                  $width="12rem"
                  type="submit"
                  testId="order-item-submit-button"
                />
              </OrderRegistrationActions>
            </OrderRegistration>
          </OrderConfirmation>
        </FormikForm>
      )}
    </Formik>
  );
};

export default OrderItemForm;
