import React from 'react';

import { useOrders } from 'lib/apollo/hooks/state/orders';

import { DisputeStatusEnum, OrderCheckoutStatusEnum } from 'graphql/types';

import InfinityList from 'components/shared/organisms/InfinityList';
import OrderDetails from 'components/shared/organisms/OrderDetails';
import UnavailablePage from 'components/shared/molecules/UnavailablePage';

import OrdersSearchBar from '../OrdersSearchBar';

import { Wrapper, DisputesWrapper } from './styled';

const CompanyDisputes = ({ query, companyId }) => {
  const { orderId, productSearchQuery, disputeStatuses } = query;

  const isSearchWithoutAttributes = !orderId && !productSearchQuery;

  const emptyMessageText = isSearchWithoutAttributes
    ? {
        title: 'Ой!',
        description: 'У вас пока нет ни одного спора.',
      }
    : {
        title: 'По вашему запросу ничего не найдено',
        description: 'Попробуйте изменить формулировку или воспользуйтесь нашими фильтрами',
      };

  const queryObject = {
    companyId,
    first: 12,
    checkoutStatus: OrderCheckoutStatusEnum.Placed,
    disputeStatuses: disputeStatuses
      ? disputeStatuses?.split(',')
      : Object.values(DisputeStatusEnum),
    orderId,
    productSearchQuery,
  };

  const { loading, loadingMore, pageInfo, orders, fetchMore } = useOrders(queryObject);

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (process.env.FEATURE_DISPUTES !== 'true') {
    return (
      <Wrapper data-testid="disputes-tab">
        <UnavailablePage />
      </Wrapper>
    );
  }

  return (
    <Wrapper data-testid="disputes-tab">
      <OrdersSearchBar query={query} filterBy="disputeStatuses" />
      <DisputesWrapper>
        <InfinityList
          dataLength={orders.length}
          loading={loading}
          hasNextPage={pageInfo?.hasNextPage}
          onLoadMore={onLoadMore}
          scrollableTarget="layout-template-content"
          titleEmptyMessage={emptyMessageText.title}
          descriptionEmptyMessage={emptyMessageText.description}
        >
          {orders.map(order => {
            return <OrderDetails order={order} key={order.id} />;
          })}
        </InfinityList>
      </DisputesWrapper>
    </Wrapper>
  );
};

export default CompanyDisputes;
