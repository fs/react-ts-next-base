import React from 'react';
import Link from 'next/link';

import { CATALOG } from 'config/routes';
import { IN_CART } from 'config/constants/checkoutStatus';

import { useOrderSellers } from 'lib/apollo/hooks/state/orderSellers';

import Loader from 'components/shared/atoms/Loader';
import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';

import CartOrders from '../CartOrders';

import { TUserCartContent } from './types';
import { PageContainer } from './styled';

const UserCartContent = ({ mainCompanyId, user }: TUserCartContent) => {
  const { mainCompany } = user;
  const companyBuyerName = `${mainCompany?.legalForm?.shortName} “${mainCompany?.officialName}”`;

  const { loading, orderSellers } = useOrderSellers({
    companyId: mainCompanyId,
    checkoutStatus: IN_CART,
  });

  return (
    <>
      {loading ? (
        <PageContainer>
          <Loader testId="user-cart-page-loader" />
        </PageContainer>
      ) : orderSellers.length > 0 ? (
        <CartOrders
          orderSellers={orderSellers}
          mainCompanyId={mainCompanyId}
          companyBuyerName={companyBuyerName}
        />
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

export default UserCartContent;
