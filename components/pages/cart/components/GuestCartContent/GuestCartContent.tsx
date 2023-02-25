import React from 'react';
import Link from 'next/link';

import { CATALOG } from 'config/routes';
import { OrderCheckoutStatusEnum } from 'graphql/types';

import useCurrentUser from 'hooks/useCurrentUser';

import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';

import GuestCartOrders from '../GuestCartOrders';

import { PageContainer } from './styled';

const GuestCartContent = () => {
  const { user, refetch } = useCurrentUser();

  const orders =
    user?.guestUserOrders?.filter(
      ({ order }) => order.checkoutStatus !== OrderCheckoutStatusEnum.Reserved,
    ) || [];

  return (
    <>
      {orders.length > 0 ? (
        <GuestCartOrders order={orders[0].order} refetchUser={refetch} />
      ) : (
        <PageContainer>
          {/* @ts-ignore */}
          <EmptyListMessage text="Вы еще ничего не положили в корзину">
            <Link passHref href={CATALOG} style={{ marginTop: '1rem' }}>
              Перейти в Каталог товаров
            </Link>
          </EmptyListMessage>
        </PageContainer>
      )}
    </>
  );
};

export default GuestCartContent;
