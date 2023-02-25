import React from 'react';
import useRouter from 'hooks/useRouter';

import Notification from 'components/shared/atoms/Notification';

import CartTabs from '../CartTabs';
import CartHeader from '../CartHeader';
import OrdersList from '../OrdersList';

import { PageContainer, Content, Header } from './styled';

const notificationText = (
  <>
    Товары хранятся в корзине <strong>24 часа</strong>. После Корзина автоматически очищается, если
    вы не перешли к оформлению сделки. Оформить сделку также необходимо в течение{' '}
    <strong>24 часов</strong>.
  </>
);

const CartOrders = ({ orderSellers, mainCompanyId, companyBuyerName }) => {
  const {
    query: { sellerId },
  } = useRouter();

  const sellerIndex = orderSellers.findIndex(({ id }) => id === sellerId);
  const preparedSellerId = sellerIndex !== -1 ? sellerId : orderSellers[0].id;
  const selectedSeller = sellerIndex !== -1 ? sellerIndex : 0;

  return (
    <>
      {orderSellers[selectedSeller] && (
        <CartHeader
          companyId={preparedSellerId}
          sellerCompany={orderSellers[selectedSeller] || {}}
        />
      )}
      <PageContainer>
        <Content>
          <CartTabs companies={orderSellers} selectedSeller={selectedSeller} />

          <Header>Корзина</Header>

          <Notification text={notificationText} isShow />

          <OrdersList
            sellerId={preparedSellerId}
            mainCompanyId={mainCompanyId}
            companyBuyerName={companyBuyerName}
          />
        </Content>
      </PageContainer>
    </>
  );
};

export default CartOrders;
