import React, { useMemo } from 'react';

import { useOrders } from 'lib/apollo/hooks/state/orders';

import { PLACED } from 'config/constants/checkoutStatus';
import { EXECUTION_STATUS } from 'config/constants/executionStatus';

import InfinityList from 'components/shared/organisms/InfinityList';
import OrderDetails from 'components/shared/organisms/OrderDetails';

import OrdersSearchBar from '../OrdersSearchBar';

import { Wrapper, OrdersList } from './styled';

const CompanyOrders = ({ companyId, query, isUserBuyer }) => {
  const { executionStatuses, orderId, productSearchQuery } = query;

  const isSearchWithoutAttributes = !executionStatuses && !orderId && !productSearchQuery;

  const emptyMessageText = isSearchWithoutAttributes
    ? {
        title: 'Ой!',
        description: 'У вас пока нет ни одного заказа.',
      }
    : {
        title: 'По вашему запросу ничего не найдено',
        description: 'Попробуйте изменить формулировку или воспользуйтесь нашими фильтрами',
      };

  const { PAYMENT_PENDING } = EXECUTION_STATUS;

  const executionStatusesQuery = useMemo(() => {
    return !isUserBuyer
      ? executionStatuses?.split(',') ||
          Object.values(EXECUTION_STATUS).filter(status => status !== PAYMENT_PENDING)
      : executionStatuses?.split(',');
  }, [isUserBuyer, executionStatuses]);

  const queryObject = {
    companyId,
    first: 12,
    checkoutStatus: PLACED,
    executionStatuses: executionStatusesQuery,
    orderId,
    productSearchQuery,
  };

  const { loading, loadingMore, pageInfo, orders, fetchMore } = useOrders(queryObject);

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  return (
    <Wrapper data-testid="orders-tab">
      <OrdersSearchBar isUserBuyer={isUserBuyer} query={query} filterBy="executionStatuses" />
      <OrdersList>
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
      </OrdersList>
    </Wrapper>
  );
};

export default CompanyOrders;
