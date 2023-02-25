import React from 'react';

import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

import Notification from 'components/shared/atoms/Notification';
import { dateDiff } from 'helpers';
import CartHeader from '../CartHeader';
import OrderItem from '../OrderItem';

import { PageContainer, Content, Header } from './styled';

type TGuestCartOrder = {
  order: OrderInfoFragment;
  refetchUser: () => void;
};

const GuestCartOrder = ({ order, refetchUser }: TGuestCartOrder) => {
  const sellerCompany = order.seller;

  const notificationText = (
    <>
      Осталось{' '}
      <strong>
        {dateDiff({
          start: new Date(),
          end: new Date(order.expiredAt),
        })}
      </strong>
      . После Корзина автоматически очищается, если вы не перешли к оформлению сделки. Оформить
      сделку необходимо в течение <strong>24 часов</strong>.
    </>
  );

  return (
    <>
      <CartHeader sellerCompany={sellerCompany} companyId={sellerCompany.id} />

      <PageContainer data-testid="guest-cart-page-container">
        <Content>
          <Header>Корзина</Header>
          <Notification text={notificationText} isShow />
          <OrderItem order={order} refetchAfterDestroy={refetchUser} />
        </Content>
      </PageContainer>
    </>
  );
};

export default GuestCartOrder;
